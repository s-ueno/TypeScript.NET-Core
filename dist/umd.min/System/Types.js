/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
!function(e){if("object"==typeof module&&"object"==typeof module.exports){var i=e(require,exports);void 0!==i&&(module.exports=i)}else"function"==typeof define&&define.amd&&define(["require","exports"],e)}(function(e,i){"use strict";var t=void 0,r=typeof!0,n="number",o="string",s=typeof{},u=typeof t,a="function",f={},c=function(){function e(e){var i=this;switch(i.isBoolean=!1,i.isNumber=!1,i.isString=!1,i.isTrueNaN=!1,i.isObject=!1,i.isFunction=!1,i.isUndefined=!1,i.isNull=!1,i.isPrimitive=!1,i.type=typeof e){case r:i.isBoolean=!0,i.isPrimitive=!0;break;case n:i.isNumber=!0,i.isTrueNaN=isNaN(e),i.isFinite=isFinite(e),i.isValidNumber=!i.isTrueNaN,i.isPrimitive=!0;break;case o:i.isString=!0,i.isPrimitive=!0;break;case s:i.target=e,null===e?(i.isNull=!0,i.isNullOrUndefined=!0,i.isPrimitive=!0):i.isObject=!0;break;case a:i.target=e,i.isString=!0;break;case u:i.isUndefined=!0,i.isNullOrUndefined=!0,i.isPrimitive=!0;break;default:throw"Fatal type failure.  Unknown type: "+i.type}Object.freeze(i)}return e.prototype.member=function(i){var t=this.target;return e.getFor(t&&i in t?t[i]:void 0)},e.getFor=function(i){var t=typeof i;switch(t){case s:case a:return new e(i)}var r=f[t];return r||(f[t]=r=new e(i)),r},e}();i.TypeInfo=c;var N;!function(e){function i(e){return typeof e===r}function f(e,i){return i===t&&(i=!0),typeof e===n&&(i||!isNaN(e))}function N(e){return typeof e===n&&isNaN(e)}function l(e){return typeof e===o}function p(e){var i=typeof e;switch(i){case r:case o:case n:case u:return!0;case s:return null===e}return!1}function y(e){return typeof e===a}function d(e,i){return void 0===i&&(i=!1),typeof e===s&&(i||null!==e)}function b(e){return isNaN(e)?NaN:e}function m(e){return c.getFor(e)}function v(e,i){return e&&!p(e)&&i in e}function O(e,i,t){return v(e,i)&&typeof e[i]===t}function g(e){return e instanceof Array||v(e,"length")}e.BOOLEAN=r,e.NUMBER=n,e.STRING=o,e.OBJECT=s,e.UNDEFINED=u,e.FUNCTION=a,e.isBoolean=i,e.isNumber=f,e.isTrueNaN=N,e.isString=l,e.isPrimitive=p,e.isFunction=y,e.isObject=d,e.numberOrNaN=b,e.of=m,e.hasMember=v,e.hasMemberOfType=O,e.isArrayLike=g}(N||(N={})),Object.freeze(N),Object.defineProperty(i,"__esModule",{value:!0}),i["default"]=N});
//# sourceMappingURL=Types.js.map
