/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 * Based on code from: https://github.com/kriskowal/q
 */

import Type from "typescript-dotnet-core/Types";
import LinkedNodeList from "typescript-dotnet-core/Collections/LinkedNodeList";
import Queue from "typescript-dotnet-core/Collections/Queue";
import {Closure} from "typescript-dotnet-core/FunctionTypes";
import {ILinkedNode} from "typescript-dotnet-core/Collections/ILinkedListNode";
import ICancellable from "./ICancellable";
import ObjectPool from "typescript-dotnet-core/Disposable/ObjectPool";
import {isNodeJS} from "typescript-dotnet-core/Environment";

declare module process
{
	export function nextTick(callback:Closure):void;

	export function toString():string;
}

interface IDomain
{
	enter():void;
	exit():void;
}

interface ITaskQueueEntry extends ILinkedNode<ITaskQueueEntry>
{
	task:Function;
	domain?:IDomain;
	context?:any;
	args?:any[];
	canceller:()=>boolean;
}


let requestTick:()=>void;
let flushing:boolean = false;

// Use the fastest possible means to execute a task in a future turn
// of the event loop.


function flush():void
{
	/* jshint loopfunc: true */
	let entry:ITaskQueueEntry|null;
	while((entry = immediateQueue.first))
	{
		let {task, domain, context, args} = entry;
		entry.canceller();
		if(domain) domain.enter();
		runSingle(task, domain, context, args);
	}

	while(laterQueue.tryDequeue(task=>{
		runSingle(task);
	})){}


	flushing = false;
}


// linked list of tasks.  Using a real linked list to allow for removal.
const immediateQueue = new LinkedNodeList<ITaskQueueEntry>();

// queue for late tasks, used by unhandled rejection tracking
const laterQueue = new Queue<Closure>();

const entryPool = new ObjectPool<ITaskQueueEntry>(
	() => <any>{},
	(o:any) =>
	{
		o.task = null;
		o.domain = null;
		o.context = null;
		if(o.args) o.args.length = 0;
		o.args = null;
		o.canceller = null;
	},
	40);

function runSingle(task:Function, domain?:IDomain, context?:any, params?:any[]):void
{
	try
	{
		task.apply(context, params);
	}
	catch(e)
	{
		if(isNodeJS)
		{
			// In node, uncaught exceptions are considered fatal errors.
			// Re-throw them synchronously to interrupt flushing!

			// Ensure continuation if the uncaught exception is suppressed
			// listening "uncaughtException" events (as domains does).
			// Continue in next event to avoid tick recursion.
			if(domain)
			{
				domain.exit();
			}
			setTimeout(flush, 0);
			if(domain)
			{
				domain.enter();
			}

			throw e;

		}
		else
		{
			// In browsers, uncaught exceptions are not fatal.
			// Re-throw them asynchronously to avoid slow-downs.
			setTimeout(()=>
			{
				throw e;
			}, 0);
		}
	}

	if(domain)
	{
		domain.exit();
	}
}

function requestFlush():void
{
	if(!flushing)
	{
		flushing = true;
		requestTick();
	}
}



export function deferImmediate(task:Closure, context?:any):ICancellable
export function deferImmediate(task:Function, context?:any, args?:any[]):ICancellable
//noinspection JSValidateJSDoc
/**
 *
 * @param task
 * @param context
 * @param args
 * @returns ICancellable
 */
export function deferImmediate(task:Closure|Function, context?:any, args?:any[]):ICancellable
{
	let entry:ITaskQueueEntry = entryPool.take();
	entry.task = task;
	entry.domain = isNodeJS && (<any>process)['domain'];
	entry.context = context;
	entry.args = args && args.slice();
	entry.canceller = ()=>
	{
		if(!entry) return false;
		let r = Boolean(immediateQueue.removeNode(entry));
		entryPool.give(entry);
		return r;
	};

	immediateQueue.addNode(entry);

	requestFlush();

	return {
		cancel: entry.canceller,
		dispose: ()=> { entry && entry.canceller(); }
	}
}


// runs a task after all other tasks have been run
// this is useful for unhandled rejection tracking that needs to happen
// after all `then`d tasks have been run.
export function runAfterDeferred(task:Closure):void
{
	laterQueue.enqueue(task);
	requestFlush();
}

if(isNodeJS)
{
	requestTick = ()=>
	{
		process.nextTick(flush);
	};

}
else if(typeof setImmediate===Type.FUNCTION)
{
	// In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
	if(typeof window!==Type.UNDEFINED)
	{
		requestTick = setImmediate.bind(window, flush);
	}
	else
	{
		requestTick = ()=>
		{
			setImmediate(flush);
		};
	}

}
else if(typeof MessageChannel!==Type.UNDEFINED)
{
	// modern browsers
	// http://www.nonblocking.io/2011/06/windownexttick.html
	const channel = new MessageChannel();
	// At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
	// working message ports the first time a page loads.
	channel.port1.onmessage = function()
	{
		requestTick = requestPortTick;
		channel.port1.onmessage = flush;
		flush();
	};
	let requestPortTick = ()=>
	{
		// Opera requires us to provide a message payload, regardless of
		// whether we use it.
		channel.port2.postMessage(0);
	};
	requestTick = ()=>
	{
		setTimeout(flush, 0);
		requestPortTick();
	};

}
else
{
	// old browsers
	requestTick = ()=>
	{
		setTimeout(flush, 0);
	};
}

export default deferImmediate;