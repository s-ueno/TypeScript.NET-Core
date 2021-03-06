/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import Type from "typescript-dotnet-core/Types";
import DisposableBase from "typescript-dotnet-core/Disposable/DisposableBase";
import ArgumentNullException from "typescript-dotnet-core/Exceptions/ArgumentNullException";
import ArgumentException from "typescript-dotnet-core/Exceptions/ArgumentException";
import {areEquivalent} from "typescript-dotnet-core/Compare";
import IEventListener from "./IEventListener";
import IEquatable from "typescript-dotnet-core/IEquatable";
import {Closure} from "typescript-dotnet-core/FunctionTypes";

const NAME = "EventDispatcherEntry";
export class EventDispatcherEntry<TParams>
extends DisposableBase implements IEquatable<EventDispatcherEntry<TParams>>
{

	constructor(
		public type:string,
		public listener:IEventListener,
		public params?:TParams,
		finalizer?:Closure)//, useWeakReference: boolean = false)
	{
		super(NAME, finalizer);

		if(!listener)
			throw new ArgumentNullException('listener');
		if(Type.isObject(listener) && !Type.hasMemberOfType(listener, "handleEvent", Type.FUNCTION))
			throw new ArgumentException('listener', "is invalid type.  Must be a function or an object with 'handleEvent'.");

		const _ = this;
		_.type = type;
		_.listener = listener;
		_.params = params;
	}

	protected _onDispose():void
	{
		super._onDispose();
		this.listener = <any>null;
	}

	/**
	 * Safely dispatches an event if entry is not disposed and type matches.
	 * @param e
	 * @returns {IEventListener|boolean}
	 */
	dispatch(e:Event):boolean
	{
		const _ = this;
		if(_.wasDisposed) return false;

		const l = _.listener, d = l && e.type==_.type;
		if(d)
		{
			if(Type.isFunction(l))
				(<any>_).listener(e); // Use 'this' to ensure call reference.
			else
				(<EventListenerObject>l).handleEvent(e);
		}
		return d;
	}

	/**
	 * Compares type and listener object only.
	 * @param type
	 * @param listener
	 * @returns {boolean}
	 */
	matches(type:string, listener:IEventListener):boolean
	{
		const _ = this;
		return _.type==type
			&& _.listener==listener;
	}

	/**
	 * Compares type, listener, and priority.
	 * @param other
	 * @returns {boolean}
	 */
	equals(other:EventDispatcherEntry<TParams>):boolean
	{
		const _ = this;
		return _.matches(other.type, other.listener)
			&& areEquivalent(_.params, other.params, false);
	}
}

export default EventDispatcherEntry;