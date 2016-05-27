/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 * Although most of the following code is written from scratch, it is
 * heavily influenced by Q (https://github.com/kriskowal/q) and uses some of Q's spec.
 */
var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};!function(t){if("object"==typeof module&&"object"==typeof module.exports){var e=t(require,exports);void 0!==e&&(module.exports=e)}else"function"==typeof define&&define.amd&&define(["require","exports","../Types","../Threading/deferImmediate","../Disposable/DisposableBase","../Exceptions/InvalidOperationException","../Exceptions/ArgumentException","../Exceptions/ArgumentNullException","../Disposable/ObjectPool","../Collections/Set","../Threading/defer"],t)}(function(t,e){"use strict";function n(t){return l["default"].hasMemberOfType(t,y,l["default"].FUNCTION)}function r(t,e,r){var i=e?e(t):t;return i&&n(i)?D.wrap(i):r(i)}function i(t,e,n){try{var r=n?n(e):e;t&&t.resolve(r)}catch(i){t.reject(i)}}function o(t,e,n,r){try{var i=r?r(n):n;t&&t(i)}catch(o){e&&e(o)}}function s(t,e,n){t instanceof x?t.thenThis(e,n):t.then(e,n)}var l=t("../Types"),a=t("../Threading/deferImmediate"),u=t("../Disposable/DisposableBase"),c=t("../Exceptions/InvalidOperationException"),f=t("../Exceptions/ArgumentException"),h=t("../Exceptions/ArgumentNullException"),p=t("../Disposable/ObjectPool"),d=t("../Collections/Set"),v=t("../Threading/defer"),_=void 0,g="Promise",w=g+"State",y="then",m="target",b=function(t){function e(e,n,r){t.call(this),this._state=e,this._result=n,this._error=r,this._disposableObjectName=w}return __extends(e,t),e.prototype._onDispose=function(){this._state=_,this._result=_,this._error=_},e.prototype.getState=function(){return this._state},Object.defineProperty(e.prototype,"state",{get:function(){return this._state},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isPending",{get:function(){return this.getState()===D.State.Pending},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isSettled",{get:function(){return this.getState()!=D.State.Pending},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isFulfilled",{get:function(){return this.getState()===D.State.Fulfilled},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isRejected",{get:function(){return this.getState()===D.State.Rejected},enumerable:!0,configurable:!0}),e.prototype.getResult=function(){return this._result},Object.defineProperty(e.prototype,"result",{get:function(){return this.throwIfDisposed(),this.getResult()},enumerable:!0,configurable:!0}),e.prototype.getError=function(){return this._error},Object.defineProperty(e.prototype,"error",{get:function(){return this.throwIfDisposed(),this.getError()},enumerable:!0,configurable:!0}),e}(u.DisposableBase);e.PromiseState=b;var x=function(t){function e(){t.call(this,D.State.Pending),this._disposableObjectName=g}return __extends(e,t),e.prototype.then=function(t,e){var n=this;return new D(function(r,i){n.thenThis(function(e){return o(r,i,e,t)},function(t){return e?o(r,null,t,e):i(t)})})},e.prototype.delayFromNow=function(t){var e=this;return void 0===t&&(t=0),this.throwIfDisposed(),new D(function(n,r){v.defer(function(){e.thenThis(function(t){return n(t)},function(t){return r(t)})},t)},!0)},e.prototype.delayAfterResolve=function(t){var e=this;return void 0===t&&(t=0),this.throwIfDisposed(),this.isSettled?this.delayFromNow(t):new D(function(n,r){e.thenThis(function(e){return v.defer(function(){return n(e)},t)},function(e){return v.defer(function(){return r(e)},t)})},!0)},e.prototype["catch"]=function(t){return this.throwIfDisposed(),this.then(_,t)},e.prototype["finally"]=function(t){return this.throwIfDisposed(),this.then(t,t)},e.prototype.finallyThis=function(t){this.throwIfDisposed();var e=function(){return a.deferImmediate(t)};return this.thenThis(e,e),this},e}(b);e.PromiseBase=x;var j=function(t){function e(){t.apply(this,arguments)}return __extends(e,t),e.prototype.thenSynchronous=function(t,e){this.throwIfDisposed();try{switch(this.state){case D.State.Fulfilled:return t?r(this._result,t,D.resolve):this;case D.State.Rejected:return e?r(this._error,e,D.resolve):this}}catch(n){return new E(n)}throw new Error("Invalid state for a resolved promise.")},e.prototype.thenThis=function(t,e){switch(this.throwIfDisposed(),this.state){case D.State.Fulfilled:t&&t(this._result);break;case D.State.Rejected:e&&e(this._error)}return this},e}(x);e.Resolvable=j;var S=function(t){function e(e,n,r){t.call(this),this._result=n,this._error=r,this._state=e}return __extends(e,t),e}(j);e.Resolved=S;var I=function(t){function e(e){t.call(this,D.State.Fulfilled,e)}return __extends(e,t),e}(S),E=function(t){function e(e){t.call(this,D.State.Rejected,_,e)}return __extends(e,t),e}(S),P=function(t){function e(e){var r=this;if(t.call(this),this._target=e,!e)throw new h.ArgumentNullException(m);if(!n(e))throw new f.ArgumentException(m,"Must be a promise-like object.");e.then(function(t){r._state=D.State.Fulfilled,r._result=t,r._error=_,r._target=_},function(t){r._state=D.State.Rejected,r._error=t,r._target=_})}return __extends(e,t),e.prototype.thenSynchronous=function(e,n){this.throwIfDisposed();var r=this._target;return r?new D(function(t,i){s(r,function(n){return o(t,i,n,e)},function(e){return n?o(t,null,e,n):i(e)})},!0):t.prototype.thenSynchronous.call(this,e,n)},e.prototype.thenThis=function(e,n){this.throwIfDisposed();var r=this._target;return r?(s(r,e,n),this):t.prototype.thenThis.call(this,e,n)},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._target=_},e}(j),D=function(t){function e(e,n){void 0===n&&(n=!1),t.call(this),e&&this.resolveUsing(e,n)}return __extends(e,t),e.prototype.thenSynchronous=function(n,r){if(this.throwIfDisposed(),this._state)return t.prototype.thenSynchronous.call(this,n,r);var i=new e;return(this._waiting||(this._waiting=[])).push(O.PromiseCallbacks.init(n,r,i)),i},e.prototype.thenThis=function(e,n){return this.throwIfDisposed(),this._state?t.prototype.thenThis.call(this,e,n):((this._waiting||(this._waiting=[])).push(O.PromiseCallbacks.init(e,n)),this)},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._resolvedCalled=_},e.prototype.resolveUsing=function(t,r,i){var o=this;if(void 0===r&&(r=!1),void 0===i&&(i=!1),!t)throw new h.ArgumentNullException("resolver");if(this._resolvedCalled)throw new c.InvalidOperationException(".resolve() already called.");if(this.state)throw new c.InvalidOperationException("Already resolved: "+e.State[this.state]);this._resolvedCalled=!0;var l=0,u=function(t){l?console.warn(-1==l?"Rejection called multiple times":"Rejection called after fulfilled."):(l=-1,o._resolvedCalled=!1,o.reject(t))},f=function(t){l?console.warn(1==l?"Fulfill called multiple times":"Fulfill called after rejection."):(l=1,o._resolvedCalled=!1,o.resolve(t))},p=function(){return t(function(t){if(t==o)throw new c.InvalidOperationException("Cannot resolve a promise as itself.");n(t)?s(t,f,u):f(t)},u)};r?p():a.deferImmediate(p)},e.prototype.resolve=function(t,n){if(void 0===n&&(n=!1),this.throwIfDisposed(),t==this)throw new c.InvalidOperationException("Cannot resolve a promise as itself.");if(this._state){if(!n||this._state==e.State.Fulfilled&&this._result===t)return;throw new c.InvalidOperationException("Changing the fulfilled state/value of a promise is not supported.")}if(this._resolvedCalled){if(n)throw new c.InvalidOperationException(".resolve() already called.")}else{this._state=e.State.Fulfilled,this._result=t,this._error=_;var r=this._waiting;if(r){this._waiting=_;for(var o=0,s=r;o<s.length;o++){var l=s[o],a=l.onFulfilled,u=l.promise,f=u;O.PromiseCallbacks.recycle(l),i(f,t,a)}r.length=0}}},e.prototype.reject=function(t,n){if(void 0===n&&(n=!1),this.throwIfDisposed(),this._state){if(!n||this._state==e.State.Rejected&&this._error===t)return;throw new c.InvalidOperationException("Changing the rejected state/value of a promise is not supported.")}if(this._resolvedCalled){if(n)throw new c.InvalidOperationException(".resolve() already called.")}else{this._state=e.State.Rejected,this._error=t;var r=this._waiting;if(r){this._waiting=null;for(var o=0,s=r;o<s.length;o++){var l=s[o],a=l.onRejected,u=l.promise,f=u;O.PromiseCallbacks.recycle(l),a?i(f,t,a):f.reject(t)}r.length=0}}},e}(j);e.Promise=D;var O;!function(t){var e;!function(t){function e(){return o||(o=new p.ObjectPool(40,n,function(t){t.onFulfilled=null,t.onRejected=null,t.promise=null}))}function n(){return{onFulfilled:null,onRejected:null,promise:null}}function r(t,n,r){var i=e().take();return i.onFulfilled=t,i.onRejected=n,i.promise=r,i}function i(t){e().add(t)}var o;t.init=r,t.recycle=i}(e=t.PromiseCallbacks||(t.PromiseCallbacks={}))}(O||(O={}));var D;!function(t){function e(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];if(!e&&!n.length)throw new h.ArgumentNullException("promises");var i=(Array.isArray(e)?e:[e]).concat(n);return!i.length||i.every(function(t){return!t})?new I(i):new t(function(t,e){var n=[],r=i.length;n.length=r;for(var o=new d.Set(i.map(function(t,e){return e})),s=function(){e=null,t=null,i.length=0,i=null,o.dispose(),o=null},l=function(){var e=t;e&&!o.count&&(s(),e(n))},a=function(e,r){t&&(n[r]=e,o.remove(r),l())},u=function(t){var n=e;n&&(s(),n(t))},c=function(t){var e=i[t];e?e.then(function(e){return a(e,t)},u):o.remove(t),l()},f=0;o&&r>f;f++)c(f)})}function r(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var i=e&&(Array.isArray(e)?e:[e]).concat(n);if(!i||!i.length||!(i=i.filter(function(t){return null!=t})).length)throw new f.ArgumentException("Nothing to wait for.");var o=i.length;if(1==o)return s(i[0]);for(var l=0;o>l;l++){var a=i[l];if(a instanceof x&&a.isSettled)return a}return new t(function(t,e){for(var n=function(){e=null,t=null,i.length=0,i=null},r=function(t,e){t&&(n(),t(e))},o=function(e){return r(t,e)},s=function(t){return r(e,t)},l=0,a=i;l<a.length;l++){var u=a[l];if(!t)break;u.then(o,s)}})}function i(t){return n(t)?s(t):new I(t)}function o(t){return new E(t)}function s(e){if(!e)throw new h.ArgumentNullException(m);return e instanceof t?this:new P(e)}function l(t){if(!t)throw new h.ArgumentNullException(y);return new P({then:t})}!function(t){t[t.Pending=0]="Pending",t[t.Fulfilled=1]="Fulfilled",t[t.Rejected=-1]="Rejected"}(t.State||(t.State={}));var a=t.State;Object.freeze(a),t.all=e,t.race=r,t.resolve=i,t.reject=o,t.wrap=s,t.createFrom=l}(D=e.Promise||(e.Promise={}))});
//# sourceMappingURL=Promise.js.map
