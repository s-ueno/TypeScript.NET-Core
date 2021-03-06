﻿/*!
 * @author electricessence / https://github.com/electricessence/
 * Based upon .NET source.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 * Source: http://referencesource.microsoft.com/#mscorlib/system/IEquatable.cs
 */

export default interface IEquatable<T>
{
	equals(other:T):boolean;
}
