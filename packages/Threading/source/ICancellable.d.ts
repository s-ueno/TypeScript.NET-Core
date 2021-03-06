/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

import IDisposable from "typescript-dotnet-core/Disposable/IDisposable";

export default interface ICancellable extends IDisposable
{

	/**
	 * Returns true if cancelled.
	 * Returns false if already run or already cancelled or unable to cancel.
	 */
	cancel():boolean;
}