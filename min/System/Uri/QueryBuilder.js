/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};define(["require","exports","../Types","./QueryParams","../Collections/Dictionaries/OrderedStringKeyDictionary"],function(t,e,n,r,o){var i="&",u="=",s=function(t){function e(e,r){void 0===r&&(r=!0),t.call(this),n["default"].isString(e)?this.importFromString(e,r):this.importMap(e)}return __extends(e,t),e.prototype.importFromString=function(t,e,n,o){var i=this;return void 0===e&&(e=!0),void 0===n&&(n=!0),void 0===o&&(o=!0),r.parse(t,function(t,e){i.setValue(t,e,o)},e,n),this},e.init=function(t,n){return void 0===n&&(n=!0),new e(t,n)},e.prototype.encode=function(t){for(var e=[],n=this.keys,o=0;o<n.length;o++){var s=n[o];e.push(s+u+r.encodeValue(this.getValue(s)))}return(e.length&&t?"?":"")+e.join(i)},e.prototype.toString=function(){return this.encode()},e}(o["default"]);Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=s});
//# sourceMappingURL=QueryBuilder.js.map