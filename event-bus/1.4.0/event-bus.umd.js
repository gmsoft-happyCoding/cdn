!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("antd"),require("react"),require("react-is")):"function"==typeof define&&define.amd?define(["exports","antd","react","react-is"],e):e((n="undefined"!=typeof globalThis?globalThis:n||self).EventBus={},n.antd,n.React,n.ReactIs)}(this,(function(n,e,o,t){"use strict";function r(n){return n&&"object"==typeof n&&"default"in n?n:{default:n}}var i=r(o),a=function(){for(var n=[],e=0;arguments.length>e;e++)n[e]=arguments[e];return n},s=function(n,e,o){var t=this;void 0===o&&(o=a),this.run=function(){for(var n,e=[],o=0;arguments.length>o;o++)e[o]=arguments[o];t.fn.apply(t,e),t.next&&(n=t.next).run.apply(n,e)},this.prev=n,this.next=e,this.fn=o},c=function(){var n=this;this.insert=function(e){var o=new s(n.tail.prev,n.tail,e);return o.next.prev=o.prev.next=o,o},this.remove=function(n){n.prev&&(n.prev.next=n.next),n.next&&(n.next.prev=n.prev)},this.head=new s,this.tail=new s(this.head),this.head.next=this.tail,this.reg={}},d=/[\s,]+/g,f=function(){var n=this;this.id=0,this.on=function(e,o){var t=n;e.split(d).forEach((function(e){var r=t.events[e]||(t.events[e]=new c),i=o._eev||(o._eev=++n.id);r.reg[i]||(r.reg[i]=r.insert(o))}))},this.off=function(e,o){o&&e.split(d).forEach((function(e){var t=n.events[e];if(t){var r=t.reg[o._eev];t.reg[o._eev]=void 0,t&&r&&t.remove(r)}}))},this.emit=function(e){for(var o,t=[],r=1;arguments.length>r;r++)t[r-1]=arguments[r];var i=n.events[e];i&&i.head&&(o=i.head).run.apply(o,t)},this.events={}},l=function(){var n,e,o,t;try{return(null===(e=null===(n=null===window||void 0===window?void 0:window.top)||void 0===n?void 0:n.document.querySelector("#mount-root"))||void 0===e?void 0:e.shadowRoot)||(null===(o=null===window||void 0===window?void 0:window.top)||void 0===o?void 0:o.document.querySelector("#mount-root"))||(null===(t=null===window||void 0===window?void 0:window.top)||void 0===t?void 0:t.document.body)}catch(n){return document.body}};function u(n){return n&&n.parentNode?n.parentNode:l()}var v=function(n){return function(o,t,r){void 0===t&&(t=3),e.message.config({getContainer:l}),e.message[n](o,t,r)}},g={info:v("info"),success:v("success"),error:v("error"),warning:v("warning"),loading:v("loading"),config:e.message.config,destroy:e.message.destroy},m=function(){return(m=Object.assign||function(n){for(var e,o=1,t=arguments.length;t>o;o++)for(var r in e=arguments[o])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}).apply(this,arguments)};function p(n,e){var o={};for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&0>e.indexOf(t)&&(o[t]=n[t]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(t=Object.getOwnPropertySymbols(n);t.length>r;r++)0>e.indexOf(t[r])&&Object.prototype.propertyIsEnumerable.call(n,t[r])&&(o[t[r]]=n[t[r]])}return o}var y=function(n){var o=n.children,t=n.getContainer,r=p(n,["children","getContainer"]);return!0!==r.visible?null:i.default.createElement(e.Modal,m({getContainer:t||l},r),i.default.createElement(e.ConfigProvider,{getPopupContainer:u},o))},w=function(n){return function(o){var r=o.content,a=p(o,["content","getContainer"]);return e.Modal[n](m(m({},a),{getContainer:l,content:r&&t.isElement(r)?i.default.cloneElement(r,{getPopupContainer:u}):r}))}};y.info=w("info"),y.success=w("success"),y.error=w("error"),y.warning=w("warning"),y.confirm=w("confirm"),y.destroyAll=e.Modal.destroyAll;var h=function(n){return function(o){e.notification[n](m({style:{wordBreak:"break-word"},getContainer:l},o))}},b={info:h("info"),success:h("success"),error:h("error"),warning:h("warning"),open:e.notification.open,close:e.notification.close,destroy:e.notification.destroy},x=function(n,e){void 0===e&&(e=window.document);var o=e.createElement("script");return o.type="text/javascript",o.src=n,new Promise((function(n,t){o.readyState?o.onreadystatechange=function(){"loaded"!==this.readyState&&"complete"!==this.readyState||n(null)}:o.onload=function(){return n(null)},o.onerror=function(){return t()},e.head.appendChild(o)}))};function S(){var n=parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase())||[])[1],10);return isNaN(n)&&(n=parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase())||[])[1],10)),n}function O(){return 10>S()&&document.styleSheets.length>20}function M(){var n,e,o;if(S()&&(null===(o=null===(e=null===(n=null===document||void 0===document?void 0:document.all)||void 0===n?void 0:n.factory)||void 0===e?void 0:e.printing)||void 0===o?void 0:o.Preview))try{document.all.factory.printing.Preview()}catch(n){window.print()}else window.print()}var j=function(n,e){var o,t;void 0===n&&(n=0),void 0===e&&(e=!0);var r="number"==typeof n?n:null!==(t=null===(o=document.querySelector(n))||void 0===o?void 0:o.offsetTop)&&void 0!==t?t:0;window.scrollTo({top:r,behavior:e?"smooth":void 0})};function C(n,e){return void 0===e?localStorage.remove(n):(localStorage.setItem(n,JSON.stringify(e)),e)}function E(n,e){var o=function(n){if("string"==typeof n)try{return JSON.parse(n)}catch(e){return n||void 0}}(localStorage.getItem(n));return void 0===o?e:o}function T(n){localStorage.removeItem(n)}function _(){localStorage.clear()}var A=Object.freeze({__proto__:null,set:C,get:E,remove:T,clear:_}),P=function(n,e){void 0===e&&(e="info"),g[e](n)},I=function(){};function q(n){switch(n){default:case"info":return"提示";case"error":return"错误";case"warning":return"警告";case"success":return"成功";case"confirm":return"请确认"}}var N=function(n){return function(e,o,t,r){var a="alert"===n?"info":n,s={title:t||q(a),content:i.default.createElement("div",{dangerouslySetInnerHTML:{__html:e}}),okText:"确定",cancelText:"取消",onOk:o||I,onCancel:r||I};y[a](s)}},k=function(){g.destroy(),y.destroyAll()},B=N("alert"),L=N("error"),R=N("warning"),D=N("success"),H=N("confirm"),J=function(n,e){void 0===e&&(e="style"),"style"===e&&function(n,e){if(void 0===e&&(e=window.document),O())!function(n,e){var o,t=(null===(o=n.match(/\{[^{}]*\}/g))||void 0===o?void 0:o.length)||0;if(0!==t)for(var r,i=0;e.styleSheets.length>i;++i)if(!((r=e.styleSheets[i]).rules.length+t>3900||-1!==r.cssText.indexOf("@import")||r.disabled||r.readOnly||r.media&&0!==r.media.length))return e.styleSheets[i].cssText+=n,!0}(n,e);else{var o=e.getElementsByTagName("head")[0],t=e.createElement("style");o.appendChild(t);try{t.innerHTML=n}catch(e){try{t.innerText=n}catch(e){t.styleSheet.cssText=n}}}}(n,window.document),"link"===e&&function(n,e){void 0===e&&(e=window.document);var o=e.querySelector("head"),t=e.createElement("link");t.href=n,t.setAttribute("rel","stylesheet"),t.setAttribute("type","text/css"),o&&o.appendChild(t)}(n,window.document)},z=C.bind(A),F=E.bind(A),G=T.bind(A),K=_.bind(A),Q=function(n){n.on("inject.css",J),n.on("inject.js",x),n.on("store.set",z),n.on("store.get",F),n.on("store.remove",G),n.on("store.clear",K),n.on("page.gotop",j),n.on("page.print",M),n.on("antd.Modal.info",y.info),n.on("antd.Modal.success",y.success),n.on("antd.Modal.error",y.error),n.on("antd.Modal.warning",y.warning),n.on("antd.Modal.confirm",y.confirm),n.on("antd.Modal.destroyAll",y.destroyAll),n.on("antd.message.info",g.info),n.on("antd.message.success",g.success),n.on("antd.message.error",g.error),n.on("antd.message.warning",g.warning),n.on("antd.message.loading",g.loading),n.on("antd.message.destroy",g.destroy),n.on("antd.notification.info",b.info),n.on("antd.notification.success",b.success),n.on("antd.notification.error",b.error),n.on("antd.notification.warning",b.warning),n.on("antd.notification.open",b.open),n.on("antd.notification.close",b.close),n.on("antd.notification.destroy",b.destroy),n.on("modal.alert",B),n.on("modal.error",L),n.on("modal.warning",R),n.on("modal.success",D),n.on("modal.confirm",H),n.on("modal.toast",P),n.on("modal.close",k)};var U=function(n){var e=new f;return n&&Q(e),top===self&&(top.eventBus=e),e};n.default=function(n,e){void 0===n&&(n=!1),void 0===e&&(e=!0);try{return n?U(e):(null===top||void 0===top?void 0:top.eventBus)?top.eventBus:U(e)}catch(n){return U(e)}},n.offDefaultEvents=function(n){n.off("inject.css",J),n.off("inject.js",x),n.off("store.set",z),n.off("store.get",F),n.off("store.remove",G),n.off("store.clear",K),n.off("page.gotop",j),n.off("page.print",M),n.off("antd.Modal.info",y.info),n.off("antd.Modal.success",y.success),n.off("antd.Modal.error",y.error),n.off("antd.Modal.warning",y.warning),n.off("antd.Modal.confirm",y.confirm),n.off("antd.Modal.destroyAll",y.destroyAll),n.off("antd.message.info",g.info),n.off("antd.message.success",g.success),n.off("antd.message.error",g.error),n.off("antd.message.warning",g.warning),n.off("antd.message.loading",g.loading),n.off("antd.message.destroy",g.destroy),n.off("antd.notification.info",b.info),n.off("antd.notification.success",b.success),n.off("antd.notification.error",b.error),n.off("antd.notification.warning",b.warning),n.off("antd.notification.open",b.open),n.off("antd.notification.close",b.close),n.off("antd.notification.destroy",b.destroy),n.off("modal.alert",B),n.off("modal.error",L),n.off("modal.warning",R),n.off("modal.success",D),n.off("modal.confirm",H),n.off("modal.toast",P),n.off("modal.close",k)},n.registerDefaultEvents=Q,Object.defineProperty(n,"__esModule",{value:!0})}));
//# sourceMappingURL=event-bus.umd.js.map