/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 * Based on: https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
 */

import HttpMethodValue from "./HttpMethodValue";

namespace HttpMethod
{
	export const
		OPTIONS:HttpMethodValue.Options = 'OPTIONS',
		HEAD:HttpMethodValue.Head       = 'HEAD',
		GET:HttpMethodValue.Get         = 'GET',
		PUT:HttpMethodValue.Put         = 'PUT',
		POST:HttpMethodValue.Post       = 'POST',
		DELETE:HttpMethodValue.Delete   = 'DELETE',
		TRACE:HttpMethodValue.Trace     = 'TRACE',
		CONNECT:HttpMethodValue.Connect = 'CONNECT';
}

export default HttpMethod;