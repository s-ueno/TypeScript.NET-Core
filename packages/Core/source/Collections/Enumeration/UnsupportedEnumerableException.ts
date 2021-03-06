/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

import {SystemException, Error} from "../../Exceptions/SystemException";

const NAME:string = 'UnsupportedEnumerableException';


export {Error};

export class UnsupportedEnumerableException extends SystemException
{

	constructor(message?:string)
	{
		super(message || "Unsupported enumerable.");
	}

	protected getName():string
	{
		return NAME;
	}
}

export default UnsupportedEnumerableException;