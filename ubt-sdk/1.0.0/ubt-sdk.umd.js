(function(b,m){typeof exports=="object"&&typeof module!="undefined"?m(exports):typeof define=="function"&&define.amd?define(["exports"],m):(b=typeof globalThis!="undefined"?globalThis:b||self,m(b.UBTSDK={}))})(this,function(b){"use strict";var m=function(){return m=Object.assign||function(n){for(var e,i=1,a=arguments.length;i<a;i++){e=arguments[i];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}return n},m.apply(this,arguments)};function f(r,n,e,i){function a(t){return t instanceof e?t:new e(function(s){s(t)})}return new(e||(e=Promise))(function(t,s){function d(u){try{o(i.next(u))}catch(l){s(l)}}function c(u){try{o(i.throw(u))}catch(l){s(l)}}function o(u){u.done?t(u.value):a(u.value).then(d,c)}o((i=i.apply(r,n||[])).next())})}function h(r,n){var e={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},i,a,t,s;return s={next:d(0),throw:d(1),return:d(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function d(o){return function(u){return c([o,u])}}function c(o){if(i)throw new TypeError("Generator is already executing.");for(;e;)try{if(i=1,a&&(t=o[0]&2?a.return:o[0]?a.throw||((t=a.return)&&t.call(a),0):a.next)&&!(t=t.call(a,o[1])).done)return t;switch(a=0,t&&(o=[o[0]&2,t.value]),o[0]){case 0:case 1:t=o;break;case 4:return e.label++,{value:o[1],done:!1};case 5:e.label++,a=o[1],o=[0];continue;case 7:o=e.ops.pop(),e.trys.pop();continue;default:if(t=e.trys,!(t=t.length>0&&t[t.length-1])&&(o[0]===6||o[0]===2)){e=0;continue}if(o[0]===3&&(!t||o[1]>t[0]&&o[1]<t[3])){e.label=o[1];break}if(o[0]===6&&e.label<t[1]){e.label=t[1],t=o;break}if(t&&e.label<t[2]){e.label=t[2],e.ops.push(o);break}t[2]&&e.ops.pop(),e.trys.pop();continue}o=n.call(r,e)}catch(u){o=[6,u],a=0}finally{i=t=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}}function k(r,n,e){if(e||arguments.length===2)for(var i=0,a=n.length,t;i<a;i++)(t||!(i in n))&&(t||(t=Array.prototype.slice.call(n,0,i)),t[i]=n[i]);return r.concat(t||Array.prototype.slice.call(n))}var P=10,B="/djc-gateway/platform/time",U=function(r){B=r},E=!1,g=null,A=[],j=function(){return f(void 0,void 0,void 0,function(){var r,n,e;return h(this,function(i){switch(i.label){case 0:if(E)return g===null?(r=new Promise(function(a){A.push(a)}),[2,r]):[2,g];i.label=1;case 1:return i.trys.push([1,4,5,6]),E=!0,[4,fetch(B)];case 2:return n=i.sent(),[4,n.json()];case 3:return e=i.sent().timestamp,g=e+P-Date.now(),[2,g];case 4:return i.sent(),g=0,[2,g];case 5:return A.forEach(function(a){return a(g||0)}),A.length=0,[7];case 6:return[2]}})})},H=function(){return f(void 0,void 0,void 0,function(){var r;return h(this,function(n){switch(n.label){case 0:return[4,j()];case 1:return r=n.sent(),[2,Date.now()+r]}})})};function T(r){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?T=function(n){return typeof n}:T=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},T(r)}var M=function(n){return typeof n=="string"},R=function(n){return n instanceof Blob};q.call((typeof window=="undefined"?"undefined":T(window))==="object"?window:void 0);function q(){X.call(this)||("navigator"in this||(this.navigator={}),this.navigator.sendBeacon=K.bind(this))}function K(r,n){var e=this.event&&this.event.type,i=e==="unload"||e==="beforeunload",a="XMLHttpRequest"in this?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");a.open("POST",r,!i),a.withCredentials=!0,a.setRequestHeader("Accept","*/*"),M(n)?(a.setRequestHeader("Content-Type","text/plain;charset=UTF-8"),a.responseType="text/plain"):R(n)&&n.type&&a.setRequestHeader("Content-Type",n.type);try{a.send(n)}catch{return!1}return!0}function X(){return"navigator"in this&&"sendBeacon"in this.navigator}var $=function(r,n){return f(void 0,void 0,void 0,function(){return h(this,function(e){try{navigator.sendBeacon(r,JSON.stringify(n))}catch{}return[2]})})},w=function(r){for(var n=[],e=1;e<arguments.length;e++)n[e-1]=arguments[e];window.__tracking_debug__&&console.log.apply(console,k([r],n,!1))},L=function(r){for(var n=[],e=1;e<arguments.length;e++)n[e-1]=arguments[e];window.__tracking_debug__&&console.log.apply(console,k(["%c".concat(r),"color: red;"],n,!1))},F=function(r){var n=r.apiUrl,e=n===void 0?"/djc-gateway/xcj/da-record":n,i=r.threshold,a=i===void 0?20:i,t=[],s=function(){if(!!t.length)try{L("[send]","length: ",t.length,k([],t,!0)),$(e,t),t.length=0}catch{}},d=function(){t.length>=a&&s()},c=function(u){L("[push]",u),Array.isArray(u)?t.push.apply(t,u):t.push(u),d()},o=s;return{push:c,destroyBatchSender:o}},G={id:"data-id",name:"data-name",position:"data-position",advertiserId:"data-advertiser-id",advertiserName:"data-advertiser-name"},W=function(){return{id:null,name:null,position:null,advertiserId:null,advertiserName:null}},J=function(r){if(!r||!r.length)return[];var n=r.map(function(e){var i=m(m({},e),{data:(e==null?void 0:e.data)||W()});return Object.keys(i.data).forEach(function(a){var t;i.data[a]||(i.data[a]=e.element.getAttribute(((t=e==null?void 0:e.attributes)===null||t===void 0?void 0:t[a])||G[a])||null)}),i});return n.filter(function(e){return e.data.id})},x=function(r){var n=r.businessId,e=r.businessType,i=r.actionType,a=r.duration,t=r.adName,s=r.adPosition,d=r.advertiser;return f(void 0,void 0,void 0,function(){var c;return h(this,function(o){switch(o.label){case 0:return c={},[4,H()];case 1:return[2,(c.createTime=o.sent(),c.businessId=n,c.businessType=e,c.actionType=i,c.pageUrl=window.location.href,c.data=t||s||a||d?{adName:t,adPosition:s,duration:a,advertiser:d}:void 0,c)]}})})},I;(function(r){r.AD="ad"})(I||(I={}));var C=I,S;(function(r){r.CLICK="click",r.WATCH="watch"})(S||(S={}));var O=S,V=function(r){return function(n,e){return e===void 0&&(e=performance.now()),f(void 0,void 0,void 0,function(){var i;return h(this,function(a){switch(a.label){case 0:return[4,x({businessId:n.item.data.id,businessType:C.AD,actionType:O.WATCH,adName:n.item.data.name,adPosition:n.item.data.position,advertiser:{id:n.item.data.advertiserId,name:n.item.data.advertiserName},duration:e-n.startTime})];case 1:return i=a.sent(),r(i),[2]}})})}},N=function(r){var n=r.push,e=r.items,i=r.root,a=r.threshold,t={root:i,rootMargin:"0px",threshold:a},s={},d=V(n),c=function(l){l.forEach(function(v){return f(void 0,void 0,void 0,function(){var y,p;return h(this,function(D){switch(D.label){case 0:return v.isIntersecting?(y=e.find(function(Z){return Z.data.id===v.target.dataset.trackId}),y&&(w("[ad in]","name: ".concat(y.data.name,", time: ").concat(v.time)),s[v.target.dataset.trackId]={startTime:v.time,item:y}),[3,3]):[3,1];case 1:return p=s[v.target.dataset.trackId],p?(w("[ad out]","name: ".concat(p.item.data.name,", time: ").concat(v.time)),delete s[v.target.dataset.trackId],[4,d(p,v.time)]):[3,3];case 2:D.sent(),D.label=3;case 3:return[2]}})})})},o=new IntersectionObserver(c,t);e.forEach(function(l){var v=l.element;v&&(v.dataset.trackId=l.data.id,o.observe(v))});var u=function(){return f(void 0,void 0,void 0,function(){var l;return h(this,function(v){switch(v.label){case 0:return o.disconnect(),l=Object.values(s).map(function(y){return f(void 0,void 0,void 0,function(){return h(this,function(p){switch(p.label){case 0:return[4,d(y)];case 1:return p.sent(),[2]}})})}),[4,Promise.all(l)];case 1:return v.sent(),[2]}})})};return u},Y=function(r){var n=r.push,e=r.items,i=r.root,a=r.threshold;if(!i)return N({push:n,items:e,root:i,threshold:a});var t=function(){return f(void 0,void 0,void 0,function(){return h(this,function(o){return[2]})})},s=function(o){o.forEach(function(u){return f(void 0,void 0,void 0,function(){return h(this,function(l){return u.isIntersecting?(w("[ad container in]",i),t=N({push:n,items:e,root:i,threshold:a})):(w("[ad container out]",i),t()),[2]})})})},d=new IntersectionObserver(s,{rootMargin:"0px",threshold:a});d.observe(i);var c=function(){return f(void 0,void 0,void 0,function(){return h(this,function(o){switch(o.label){case 0:return d.disconnect(),[4,t()];case 1:return o.sent(),[2]}})})};return c},_=function(r){var n=r.push,e=r.items,i=function(t){return f(void 0,void 0,void 0,function(){var s,d;return h(this,function(c){switch(c.label){case 0:return s=e.find(function(o){var u,l;return o.data.id===((l=(u=t.currentTarget)===null||u===void 0?void 0:u.dataset)===null||l===void 0?void 0:l.trackId)}),s?[4,x({businessId:s.data.id,businessType:C.AD,actionType:O.CLICK,adName:s.data.name,adPosition:s.data.position,advertiser:{id:s.data.advertiserId,name:s.data.advertiserName}})]:[3,2];case 1:d=c.sent(),n(d),c.label=2;case 2:return[2]}})})};e.forEach(function(t){t.element.dataset.trackId=t.data.id,t.element.addEventListener("click",i)});var a=function(){e.forEach(function(t){t.element.removeEventListener("click",i)})};return a},z=function(r){var n=r.items,e=r.submitApiUrl,i=r.container,a=r.visibleThreshold,t=a===void 0?.5:a,s=r.sendThreshold,d=J(n);if(d.length===0)return function(){return f(void 0,void 0,void 0,function(){return h(this,function(p){return[2,void 0]})})};var c=F({apiUrl:e,threshold:s}),o=c.push,u=c.destroyBatchSender,l=_({push:o,items:d}),v=Y({push:o,items:d,root:i,threshold:t}),y=function(){return f(void 0,void 0,void 0,function(){return h(this,function(p){switch(p.label){case 0:return l(),[4,v()];case 1:return p.sent(),u(),[2]}})})};return y},Q=function(r){var n=function(){},e=function(){document.visibilityState==="hidden"&&n(),document.visibilityState==="visible"&&(n=z(r))};return e(),document.addEventListener("visibilitychange",e),function(){document.removeEventListener("visibilitychange",e),n()}};b.adsTracking=Q,b.setGetServerTimeApi=U,Object.defineProperties(b,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=ubt-sdk.umd.js.map