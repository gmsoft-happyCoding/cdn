(function(l,m){typeof exports=="object"&&typeof module!="undefined"?m(exports,require("react"),require("react-redux"),require("qs"),require("axios"),require("react-dom"),require("antd"),require("styled-components")):typeof define=="function"&&define.amd?define(["exports","react","react-redux","qs","axios","react-dom","antd","styled-components"],m):(l=typeof globalThis!="undefined"?globalThis:l||self,m(l.AuthSDK={},l.React,l.ReactRedux,l.Qs,l.axios,l.ReactDOM,l.antd,l.styled))})(this,function(l,m,H,Qe,Ke,Ve,M,W){"use strict";function z(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var d=z(m),L=z(Qe),qe=z(Ke),ce=z(Ve),C=z(W);/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */var f=function(){return f=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},f.apply(this,arguments)};function Z(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function I(e,t,n,r){function a(i){return i instanceof n?i:new n(function(o){o(i)})}return new(n||(n=Promise))(function(i,o){function v(s){try{u(r.next(s))}catch(E){o(E)}}function g(s){try{u(r.throw(s))}catch(E){o(E)}}function u(s){s.done?i(s.value):a(s.value).then(v,g)}u((r=r.apply(e,t||[])).next())})}function D(e,t){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,a,i,o;return o={next:v(0),throw:v(1),return:v(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function v(u){return function(s){return g([u,s])}}function g(u){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,a&&(i=u[0]&2?a.return:u[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,u[1])).done)return i;switch(a=0,i&&(u=[u[0]&2,i.value]),u[0]){case 0:case 1:i=u;break;case 4:return n.label++,{value:u[1],done:!1};case 5:n.label++,a=u[1],u=[0];continue;case 7:u=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(u[0]===6||u[0]===2)){n=0;continue}if(u[0]===3&&(!i||u[1]>i[0]&&u[1]<i[3])){n.label=u[1];break}if(u[0]===6&&n.label<i[1]){n.label=i[1],i=u;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(u);break}i[2]&&n.ops.pop(),n.trys.pop();continue}u=t.call(e,n)}catch(s){u=[6,s],a=0}finally{r=i=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}}function T(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}l.AuthQueryStrategy=void 0,function(e){e.URL_QUERY_FIRST="URL_QUERY_FIRST",e.COOKIE_FIRST="COOKIE_FIRST"}(l.AuthQueryStrategy||(l.AuthQueryStrategy={}));function ve(e,t){if(e===void 0&&(e="Auth"),t===void 0&&(t="Auth"),document.cookie&&document.cookie.length>0){var n=document.cookie.split(/\s*;\s*/);if(n&&n.length>0){var r=n.find(function(i){return i.startsWith(e)}),a=r?r.split("=")[1]:null;if(a)return a&&t?t+" "+a:a}}}function se(e,t,n,r,a){e===void 0&&(e="Auth"),t===void 0&&(t=window.top||window),n===void 0&&(n="__auth__"),r===void 0&&(r="__token__"),a===void 0&&(a="Bearer");var i=L.default.parse(t.location.search,{ignoreQueryPrefix:!0});if(n){var o=i[n];if(o&&typeof o=="string")return o&&e?e+" "+o:o}if(r){var v=i[r];if(v&&typeof v=="string")return v&&a?a+" "+v:v}}var J=function(e,t,n,r,a,i,o){e===void 0&&(e="Auth"),t===void 0&&(t="Auth"),n===void 0&&(n=window.top||window),r===void 0&&(r="__auth__"),a===void 0&&(a="__token__"),i===void 0&&(i="Bearer"),o===void 0&&(o=l.AuthQueryStrategy.COOKIE_FIRST);try{return o===l.AuthQueryStrategy.COOKIE_FIRST?ve(e,t)||se(t,n,r,a,i)||null:o===l.AuthQueryStrategy.URL_QUERY_FIRST&&(se(t,n,r,a,i)||ve(e,t))||null}catch{return null}},$e=function(e){var t=e===void 0?{}:e,n=t.platDomain,r=n===void 0?window.location.host:n,a=t.platDomainKey,i=a===void 0?"__platDomain__":a,o=t.notSetPlatDomain,v=o===void 0?!1:o,g=t.authCookieKey,u=g===void 0?"Auth":g,s=t.authHeaderKey,E=s===void 0?"Authorization":s,A=t.authScheme,S=A===void 0?"Auth":A,P=t.notSetAuthHeader,k=P===void 0?!1:P,j=t.queryByWindow,N=j===void 0?window.top||window:j,w=t.authQueryKey,_=w===void 0?"__auth__":w,O=t.tokenQueryKey,p=O===void 0?"__token__":O,b=t.tokenScheme,X=b===void 0?"Bearer":b,y=t.authQueryStrategy,$t=y===void 0?l.AuthQueryStrategy.COOKIE_FIRST:y;return{platDomain:r,platDomainKey:i,notSetPlatDomain:v,authCookieKey:u,authHeaderKey:E,authScheme:S,notSetAuthHeader:k,queryByWindow:N,authQueryKey:_,tokenScheme:X,tokenQueryKey:p,authQueryStrategy:$t}},U=function(e){return function(t){var n,r,a,i,o=$e(e),v=o.platDomain,g=o.platDomainKey,u=o.notSetPlatDomain,s=o.authCookieKey,E=o.authHeaderKey,A=o.authScheme,S=o.notSetAuthHeader,P=o.queryByWindow,k=o.authQueryKey,j=o.tokenQueryKey,N=o.tokenScheme,w=o.authQueryStrategy,_=u||!v||t.params&&t.params[g]||((a=t==null?void 0:t.url)===null||a===void 0?void 0:a.indexOf(g+"="))!==-1?t.params:f(f({},t.params),(n={},n[g]=v,n)),O=J(s,A,P,k,j,N,w),p=S||!O||((i=t==null?void 0:t.headers)===null||i===void 0?void 0:i[E])?t.headers:f(f({},t.headers),(r={},r[E]=O,r));return f(f({},t),{params:_,headers:p})}},Xe=function(e){var t="tokenInterceptor";return window.angular&&window.angular.module(t,[]).factory(t,function(){return{request:function(n){return n.url.indexOf(".tpl")!==-1&&(n.withCredentials=!1),n.url.indexOf(".html")===-1?U(e)(n):n}}}).config(["$httpProvider",function(r){r.interceptors.push(t)}]),t},ee;(function(e){e.URL_QUERY_FIRST="URL_QUERY_FIRST",e.COOKIE_FIRST="COOKIE_FIRST"})(ee||(ee={}));var We=function(e,t,n,r,a){t===void 0&&(t="__auth__"),n===void 0&&(n="Auth"),r===void 0&&(r=window.top||window),a===void 0&&(a="__auth__");var i=J(n,"",r,a,"","",ee.COOKIE_FIRST);return i?""+e+(e.indexOf("?")!==-1?"&":"?")+t+"="+i:e},B=qe.default.create({withCredentials:!0,paramsSerializer:function(e){return L.default.stringify(e,{arrayFormat:"repeat",allowDots:!0})}}),fe=B.interceptors.request.use(U()),Ze=function(e){B.interceptors.request.eject(fe),fe=B.interceptors.request.use(U(e))},Y=function(e,t){return B(f({url:e},t))};function te(e){if(!e)return{};var t=e.startsWith("//")?""+window.location.protocol+e:e,n={},r=["href","origin","protocol","host","hostname","port","pathname","search","hash"],a=/(([^:]+:)\/\/(([^:/?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/,i=a.exec(t);if(i)for(var o=r.length-1;o>=0;--o)n[r[o]]=i[o]?i[o]:"";return n}var Je=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/user?requireAvatar=true"},et=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/login"},ge=function(e){return e+"/djcsupport/domainname/getPlatformConfigure"},tt=function(e,t,n){return n||(t?e+"@"+t:"plat@"+e)},nt=function(e,t){return t||(e||window.location.origin)+"/login-app/login-success/index.html"},Ee=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,i=e.djcGatewayBaseUrl,o=e.platId,v=e.dp,g=e.ui,u=e.registerNoHeader,s=e.title,E=e.clientId,A=e.loginSuccessRedirectUri,S=e.limitOrgType,P=e.preferOrgType,k=e.errorMessage,j=e.extraParams;return I(void 0,void 0,void 0,function(){var N,w,_,O,p;return D(this,function(b){switch(b.label){case 0:return N=te(n).host,w=o,o?[3,2]:[4,Y(ge(i),{params:{orgDomainName:N}})];case 1:_=b.sent().data,w=_==null?void 0:_.platformCode,b.label=2;case 2:return w?(p={},S&&(p.limitOrgType=S),P&&(p.preferOrgType=P),[2,f(f({},j),{ui:g,register_no_header:u,title:s,origin:n,client_id:tt(w,v,E),scope:r||a||N,login_sucess_redirect_uri:nt(n,A),redirect_uri:et(n),is_fpa:!0,error_message:k,options:Object.keys(p).length>0?JSON.stringify(p):void 0})]):(O="\u672A\u67E5\u8BE2\u5230 "+N+" \u5BF9\u5E94\u7684\u5E73\u53F0\u4FE1\u606F, \u8BF7\u68C0\u67E5\u5E73\u53F0\u914D\u7F6E\u662F\u5426\u6B63\u786E",console.log(O),[2,Promise.reject(new Error(O))])}})})},he=function(e){return I(void 0,void 0,void 0,function(){var t;return D(this,function(n){switch(n.label){case 0:return[4,Ee(e)];case 1:return t=n.sent(),[2,L.default.stringify(t,{addQueryPrefix:!0})]}})})},G=function(){try{return(top==null?void 0:top.document.querySelector("#mount-root"))||top.document.body}catch{return document.body}};function rt(e){return e&&e.parentNode?e.parentNode:G()}var ne="gmsoft-ui-top-body-need-inject-css",re=function(e){top[ne]=e},at=function(){return top[ne]===void 0&&re(!0),top[ne]},it=W.createGlobalStyle(me||(me=T([`
  body{
    position: relative;
    width: calc(100% - 17px);
    overflow: hidden;
    touch-action: none;
  }
`],[`
  body{
    position: relative;
    width: calc(100% - 17px);
    overflow: hidden;
    touch-action: none;
  }
`]))),ot=function(){m.useEffect(function(){return re(!1),function(){re(!0)}})},ut=function(){var e=m.useState(function(){return at()})[0];return ot(),e?d.default.createElement(it,null):null},me,lt=G(),R=function(e){var t=e.children,n=e.width,r=e.getContainer,a=Z(e,["children","width","getContainer"]);return a.visible!==!0?null:d.default.createElement(W.StyleSheetManager,{target:lt},d.default.createElement(d.default.Fragment,null,d.default.createElement(ut,null),d.default.createElement(M.Modal,f({getContainer:r||G,width:n},a),d.default.createElement(M.ConfigProvider,{getPopupContainer:rt},t))))},x=function(e){return function(t){return M.Modal[e](f({getContainer:G},t))}};R.info=x("info"),R.success=x("success"),R.error=x("error"),R.warning=x("warning"),R.confirm=x("confirm"),R.destroyAll=M.Modal.destroyAll;var Q=function(){},dt=function(e,t,n){Q&&Q();var r=document.createElement("div");document.body.appendChild(r);var a=function(){return ce.default.unmountComponentAtNode(r)};return Q=function(){t&&typeof t=="function"&&t(),a()},ce.default.render(d.default.createElement(R,{visible:!0,maskClosable:!0,closable:!1,footer:null,closeIcon:null,onCancel:Q,width:360,bodyStyle:{padding:0}},d.default.createElement("iframe",{title:"loginBox",className:"login-form-box",src:e,width:"360px",height:"440px",scrolling:"no",style:{margin:0,padding:0,borderRadius:2,display:"block"},frameBorder:"0"})),r),n&&(n.current=a),a},ct="@@GLOBAL_CONTEXT/SET";function vt(e,t){e&&e({type:ct,payload:{me:t}})}var st="__platDomain__",ft=function(e){return e?e.findIndex(function(t){return String(t).endsWith("01")})!==-1:!1},Ae=function(e){var t,n,r,a,i,o,v,g,u,s,E,A;if(!(!e||Object.getOwnPropertyNames(e).length===0))return f({admin:ft(e==null?void 0:e.roles),adminAreaId:(t=e==null?void 0:e.org)===null||t===void 0?void 0:t.areaId,adminAreaName:(n=e==null?void 0:e.org)===null||n===void 0?void 0:n.areaName,maintainPlatId:(r=e==null?void 0:e.additionalInformation)===null||r===void 0?void 0:r.mpi,orgId:(a=e==null?void 0:e.org)===null||a===void 0?void 0:a.orgId,orgName:(i=e==null?void 0:e.org)===null||i===void 0?void 0:i.orgName,orgType:(o=e==null?void 0:e.org)===null||o===void 0?void 0:o.orgType,userName:e==null?void 0:e.realName,userTypes:e!=null&&e.roles?e==null?void 0:e.roles.join(","):void 0,deptRole:(v=e==null?void 0:e.additionalInformation)===null||v===void 0?void 0:v.deptRole,isBidDown:(g=e==null?void 0:e.additionalInformation)===null||g===void 0?void 0:g.isBidDown,isSj:(u=e==null?void 0:e.additionalInformation)===null||u===void 0?void 0:u.isSj,orgClassNo:(s=e==null?void 0:e.additionalInformation)===null||s===void 0?void 0:s.orgClassNo,organClass:(E=e==null?void 0:e.additionalInformation)===null||E===void 0?void 0:E.organClass,userType:(A=e==null?void 0:e.additionalInformation)===null||A===void 0?void 0:A.userType},e)},K=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.dispatch;return I(void 0,void 0,void 0,function(){var i,o,v,g,u,s;return D(this,function(E){switch(E.label){case 0:return i=te(n).host,o=r||i,[4,Y(Je(n),{params:(s={},s[st]=o,s)})];case 1:return v=E.sent(),g=v.data,!g||Object.getOwnPropertyNames(g).length===0?[2,Promise.reject()]:(u=Ae(v.data),window.location.origin.includes(n)&&vt(a,u),[2,u])}})})},Me=function(e){var t=e.authPageOrigin,n=e.origin,r=n===void 0?window.location.origin:n,a=e.whoAmIHost,i=e.whoAmIhost,o=e.clientId,v=e.platId,g=e.dp,u=e.ui,s=e.registerNoHeader,E=e.title,A=e.djcGatewayBaseUrl,S=e.loginSuccessRedirectUri,P=e.limitOrgType,k=e.preferOrgType,j=e.oauthState,N=e.onCancelLogin,w=e.closePopupRef,_=e.dispatch;return I(void 0,void 0,void 0,function(){var O,p,b,X;return D(this,function(y){switch(y.label){case 0:O=a||i,y.label=1;case 1:return y.trys.push([1,3,,5]),[4,K({dispatch:_,origin:r,whoAmIHost:O})];case 2:return p=y.sent(),[2,p];case 3:return y.sent(),[4,he({origin:r,whoAmIHost:O,djcGatewayBaseUrl:A,clientId:o,platId:v,dp:g,ui:u,registerNoHeader:s,title:E,loginSuccessRedirectUri:S,limitOrgType:P,preferOrgType:k,extraParams:j})];case 4:return b=y.sent(),X=t+"/oauth-login"+b,[2,dt(X,N,w)];case 5:return[2]}})})},gt=function(e,t){return I(void 0,void 0,void 0,function(){var n,r;return D(this,function(a){switch(a.label){case 0:return[2,t+"/authing"];case 1:return n=a.sent(),[2,(r=n==null?void 0:n.data)===null||r===void 0?void 0:r.op]}})})},Et=function(e){return e.then(function(t){return{value:t,status:"resolved"}},function(t){return{error:t,status:"rejected"}})},ht=function(e,t){return t===void 0&&(t=5e3),new Promise(function(n,r){var a=new Image(0,0);a.onload=n,a.onerror=r,a.src=e,setTimeout(function(){r()},t)})},mt=function(e){e===void 0&&(e=[]);var t=e.filter(function(n){return n}).map(function(n){return ht(n)});return Promise.all(t.map(Et))},At=function(e,t,n){return I(void 0,void 0,void 0,function(){var r;return D(this,function(a){switch(a.label){case 0:return[4,Y(e+"/logout",{method:"DELETE",params:{success_uri:t}})];case 1:return r=a.sent().data,n&&n.length>0?[4,mt(n)]:[3,3];case 2:a.sent(),a.label=3;case 3:return window.open(r.location,"_top"),[2]}})})},Oe=function(e){var t=e.djcGatewayBaseUrl,n=e.logoutRedirectUrl,r=e.otherLogoutUrls,a=e.origin;return I(void 0,void 0,void 0,function(){var i;return D(this,function(o){switch(o.label){case 0:return[4,gt(a,t)];case 1:return i=o.sent(),[4,At(i,n,r)];case 2:return o.sent(),[2]}})})},pe=function(e){var t=e.authPageOrigin,n=e.origin,r=e.ui,a=e.dp,i=e.djcGatewayBaseUrl,o=e.noHeader,v=e.types,g=e.extraParams;return I(void 0,void 0,void 0,function(){var u,s,E;return D(this,function(A){switch(A.label){case 0:return u=t+"/register/select-type",s=null,[4,Y(ge(i),{params:{orgDomainName:n?te(n).host:window.location.host}})];case 1:return E=A.sent().data,s=E==null?void 0:E.platformCode,window.open(""+u+L.default.stringify(f({ui:r,platId:s,dp:a,noHeader:o,types:v?v.join(","):void 0},g),{addQueryPrefix:!0,encode:!1}),"_blank"),[2]}})})},we="globalContext",ae=function(e){return e&&e[we]?e[we].me:void 0},Ie=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,i=e.dispatch;return K({dispatch:i,origin:n,whoAmIHost:r||a})},De=function(e){return I(void 0,void 0,void 0,function(){var t,n=e.loginPage,r=Z(e,["loginPage"]);return D(this,function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,Ie(r)];case 1:return t=a.sent(),[2,t];case 2:return a.sent(),window.open(n,"_top"),[3,3];case 3:return[2]}})})},F=d.default.createContext({authPageOrigin:"",djcGatewayBaseUrl:"",toCenterPage:function(){}}),ie="ant",Mt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA0OCA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ4IDI0LjAyNjRDNDggMzcuMjY3MyAzNy4yNTQxIDQ4LjAwMzEgMjMuOTk3NSA0OC4wMDMxQzEwLjc0MjEgNDguMDAzMSAwIDM3LjI2NzMgMCAyNC4wMjY0QzAgMTMuODYzIDYuMzI2MDUgNS4xNzk4NyAxNS4yNjAyIDEuNjkwMzNDMTcuOTU5NiAwLjYwMTM3NiAyMC45MDg3IDAgMjMuOTk4MSAwQzI3LjA5MTMgMCAzMC4wMzc5IDAuNjAwNzY5IDMyLjczOTggMS42OTAzM0M0MS42NzM0IDUuMTc5ODcgNDggMTMuODYzIDQ4IDI0LjAyNjRaTTE0Ljc3MzMgMTguOTY5OUMxNC43NzMzIDIzLjAxMDUgMTYuODQzNiAyNi41MDg4IDE5Ljg1MzEgMjguMjIxMUMyMS4xMDEyIDI4LjkzMTQgMjIuNTA2NSAyOS4zNDA5IDIzLjk5NzUgMjkuMzQwOUMyNS40MzYxIDI5LjM0MDkgMjYuNzkyNSAyOC45NTc4IDI4LjAwNzkgMjguMjk2QzMxLjA4ODUgMjYuNjE2MyAzMy4yMjU1IDIzLjA3NTMgMzMuMjI1NSAxOC45NzA1QzMzLjIyNTUgMTMuMjU1MyAyOS4wODY4IDguNjAzMjggMjMuOTk3NSA4LjYwMzI4QzE4LjkxMTQgOC42MDI2NyAxNC43NzMzIDEzLjI1NDcgMTQuNzczMyAxOC45Njk5Wk0yNC4wOTUgNDYuNDQ5NEMzMS4xMDY3IDQ2LjQ0OTQgMzcuMzYxNiA0My4yMjQ3IDQxLjQ2MTMgMzguMTc4M0M0MC45NzcgMzQuMTk3NSAzNy4wOTggMzAuODA4NiAzMS42MDgxIDI5LjExODJDMjkuNTM0NyAzMC45ODM1IDI2Ljg4NTYgMzIuMTA1OCAyMy45OTY4IDMyLjEwNThDMjEuMDQzOSAzMi4xMDU4IDE4LjM0MDggMzAuOTIzMSAxNi4yNDcyIDI4Ljk3NjdDMTAuOTA2OSAzMC41MDA5IDYuOTk1MzIgMzMuNjA5OSA2LjA3ODE4IDM3LjMzNTNDMTAuMTQ2NCA0Mi44NjE3IDE2LjcwMzMgNDYuNDQ5NCAyNC4wOTUgNDYuNDQ5NFoiIGZpbGw9IiNDRUNGRTAiLz4KPC9zdmc+Cg==",Ne=function(e){var t=e.path,n=e.className,r=m.useContext(F).djcGatewayBaseUrl,a=m.useMemo(function(){return t?r+"/files?business=avatar&filePath="+t+"&fileName=file&attachment=false&contentType=image/png":Mt},[r,t]);return d.default.createElement(M.Avatar,{className:n,src:a})},V=function(e){return e.theme.textColorSecondary||"#697b8c"},_e=function(e){return e.theme.linkColorHover||"#1890ff"},Ot=C.default.a(Te||(Te=T([`
  color: `,`;
  &:active {
    color: `,`;
  }
  span,
  svg {
    vertical-align: middle;
    color: `,`;
    fill: `,`;
  }
  &:hover {
    span,
    svg {
      color: `,`;
      fill: `,`;
    }
  }
`],[`
  color: `,`;
  &:active {
    color: `,`;
  }
  span,
  svg {
    vertical-align: middle;
    color: `,`;
    fill: `,`;
  }
  &:hover {
    span,
    svg {
      color: `,`;
      fill: `,`;
    }
  }
`])),V,V,V,V,_e,_e),pt=function(){try{return window.top.location.href}catch{return window.location.href}},wt=function(){var e=m.useContext(F),t=e.logoutRedirectUrl,n=Z(e,["logoutRedirectUrl"]),r=m.useCallback(function(){return I(void 0,void 0,void 0,function(){return D(this,function(a){switch(a.label){case 0:return[4,Oe(f(f({},n),{logoutRedirectUrl:t||pt()}))];case 1:return a.sent(),[2]}})})},[n,t]);return d.default.createElement(Ot,{onClick:r},d.default.createElement("span",null,"\u9000\u51FA"),d.default.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4393",width:"20",height:"20"},d.default.createElement("path",{d:"M593.92 838.513v-95.355a40.96 40.96 0 1 1 81.92 0v95.355c0 45.26-35.226 83.087-80.22 83.087H203.1c-44.994 0-80.22-37.827-80.22-83.087V185.487c0-45.26 35.226-83.087 80.22-83.087h392.52c44.994 0 80.22 37.827 80.22 83.087v193.946a40.96 40.96 0 1 1-81.92 0V185.487c0-1.024 0.061-1.147 0.901-1.167H203.9c0.84 0 0.901 0.164 0.901 1.167v653.026c0 1.024-0.061 1.147-0.901 1.167H594.82c-0.84 0-0.901-0.164-0.901-1.167z","p-id":"4394"}),d.default.createElement("path",{d:"M471.04 512h327.68q40.96 0 40.96 40.96t-40.96 40.96H471.04q-40.96 0-40.96-40.96T471.04 512z","p-id":"4395"}),d.default.createElement("path",{d:"M811.199 422.828L912.57 524.2q28.963 28.963 0 57.926t-57.926 0l-101.37-101.37q-28.964-28.964 0-57.927 28.962-28.963 57.925 0z","p-id":"4396"}),d.default.createElement("path",{d:"M753.273 625.575l101.37-101.37q28.964-28.964 57.927 0 28.963 28.962 0 57.925L811.2 683.501q-28.964 28.963-57.927 0t0-57.926z","p-id":"4397"})))},Te,It=M.Typography.Paragraph,Dt=C.default.div(be||(be=T([`
  &&& {
    max-width: 280px;
    margin-bottom: -6px;
    .`,`-menu-vertical {
      border-right: none;
      .`,`-menu-item {
        cursor: default;
        line-height: 35px;
        height: auto;
        text-align: center;
        margin: 0;
        &.`,`-menu-item-selected, &:active {
          background-color: white;
        }
      }
    }
  }
`],[`
  &&& {
    max-width: 280px;
    margin-bottom: -6px;
    .`,`-menu-vertical {
      border-right: none;
      .`,`-menu-item {
        cursor: default;
        line-height: 35px;
        height: auto;
        text-align: center;
        margin: 0;
        &.`,`-menu-item-selected, &:active {
          background-color: white;
        }
      }
    }
  }
`])),ie,ie,ie),Nt=C.default(Ne)(ye||(ye=T([`
  &&& {
    height: 64px;
    width: 64px;
    vertical-align: top;
    border: 1px solid #dedede;
  }
`],[`
  &&& {
    height: 64px;
    width: 64px;
    vertical-align: top;
    border: 1px solid #dedede;
  }
`]))),Pe=C.default(It).attrs({ellipsis:!0})(Ce||(Ce=T([`
  &&& {
    margin: 0;
  }
`],[`
  &&& {
    margin: 0;
  }
`]))),_t=C.default(Pe)(Se||(Se=T([`
  font-size: 16px;
  font-weight: 700;
`],[`
  font-size: 16px;
  font-weight: 700;
`]))),Tt=function(e){var t,n,r,a=e.me,i=m.useContext(F).toCenterPage;return d.default.createElement(Dt,null,d.default.createElement(M.Menu,{mode:"vertical"},d.default.createElement(M.Menu.Item,{key:"avatar"},d.default.createElement(Nt,{path:(t=a.additionalInformation)===null||t===void 0?void 0:t.avatar})),d.default.createElement(M.Menu.Item,{key:"name"},a.realName&&d.default.createElement("a",{onClick:i},d.default.createElement(_t,null,a.realName)),((n=a.org)===null||n===void 0?void 0:n.orgName)&&d.default.createElement(Pe,null,(r=a.org)===null||r===void 0?void 0:r.orgName)),d.default.createElement(M.Menu.Divider,null),d.default.createElement(M.Menu.Item,{key:"logout"},d.default.createElement(wt,null))))},be,ye,Ce,Se,Pt=C.default(Ne)(je||(je=T([`
  &&& {
    height: 24px;
    width: 24px;
    vertical-align: middle;
    margin-right: 4px;
  }
`],[`
  &&& {
    height: 24px;
    width: 24px;
    vertical-align: middle;
    margin-right: 4px;
  }
`]))),bt=M.Typography.Text,yt=C.default(bt)(Le||(Le=T([`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`],[`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`]))),Ct=function(e){var t,n=e.me;return d.default.createElement(M.Popover,{placement:"bottom",autoAdjustOverflow:!1,content:d.default.createElement(Tt,{me:n})},d.default.createElement(Pt,{path:(t=n.additionalInformation)===null||t===void 0?void 0:t.avatar}),d.default.createElement(yt,{ellipsis:!0},n.realName))},je,Le,St=function(){var e=m.useContext(F),t=m.useCallback(function(){pe(e)},[e]);return d.default.createElement("a",{className:"register",onClick:t},"\u6CE8\u518C")},Re=function(){return H.useSelector(ae)},jt=function(){var e=Re(),t=H.useDispatch();return m.useEffect(function(){e||K({dispatch:t}).catch(function(){})},[e,t]),e},Lt=M.Typography.Text,Rt=C.default(Lt).attrs({type:"secondary"})(ke||(ke=T([`
  margin: 0 8px;
`],[`
  margin: 0 8px;
`]))),ke,ze=function(e){var t=e.className,n=e.children,r=jt();return d.default.createElement(F.Provider,{value:e},d.default.createElement("div",{className:t},r?d.default.createElement(Ct,{me:r}):d.default.createElement(d.default.Fragment,null,n,d.default.createElement(Rt,null,"\u6216"),d.default.createElement(St,null))))},xe=function(e){var t=e.login;return d.default.createElement("a",{className:"login",onClick:t},"\u767B\u5F55")},kt=function(e){var t=e.loginPage,n=H.useDispatch(),r=m.useCallback(function(){De(f(f({},e),{dispatch:n}))},[n,e]);return d.default.createElement(ze,f({},e,{logoutRedirectUrl:t}),d.default.createElement(xe,{login:r}))},zt=function(e){var t=H.useDispatch(),n=m.useCallback(function(){Me(f(f({},e),{dispatch:t}))},[t,e]);return d.default.createElement(ze,f({},e),d.default.createElement(xe,{login:n}))},c;(function(e){e[e.PLATFORM=1]="PLATFORM",e[e.APPROVAL=2]="APPROVAL",e[e.STOCK=3]="STOCK",e[e.AGENT=4]="AGENT",e[e.PROVIDER=5]="PROVIDER",e[e.FINANCE=7]="FINANCE",e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(c||(c={}));var xt=c,h=function(e,t){var n="";switch(e){case c.PLATFORM:n="platform";break;case c.APPROVAL:n="approval";break;case c.STOCK:n="stock";break;case c.AGENT:n="agent";break;case c.PROVIDER:n="provider";break;case c.FINANCE:n="finance";break;case c.EMPLOYEE:n="employee";break;case c.EXPERT:n="expert";break;case c.TEACHER:n="teacher";break;default:n="";break}return t?n.toUpperCase():n},Ft=[{label:"\u5E73\u53F0\u8FD0\u8425",value:c.PLATFORM},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:c.APPROVAL},{label:"\u91C7\u8D2D\u5355\u4F4D",value:c.STOCK},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:c.AGENT},{label:"\u4F9B\u5E94\u5546",value:c.PROVIDER},{label:"\u91D1\u878D\u673A\u6784",value:c.FINANCE},{label:"\u5355\u4F4D\u6210\u5458",value:c.EMPLOYEE},{label:"\u4E13\u5BB6",value:c.EXPERT},{label:"\u6559\u5E08",value:c.TEACHER}],Ht=[{label:"\u5E73\u53F0\u8FD0\u8425",value:h(c.PLATFORM,!0)},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:h(c.APPROVAL,!0)},{label:"\u91C7\u8D2D\u5355\u4F4D",value:h(c.STOCK,!0)},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:h(c.AGENT,!0)},{label:"\u4F9B\u5E94\u5546",value:h(c.PROVIDER,!0)},{label:"\u91D1\u878D\u673A\u6784",value:h(c.FINANCE,!0)},{label:"\u5355\u4F4D\u6210\u5458",value:h(c.EMPLOYEE,!0)},{label:"\u4E13\u5BB6",value:h(c.EXPERT,!0)},{label:"\u6559\u5E08",value:h(c.TEACHER,!0)}];h(c.PLATFORM),h(c.APPROVAL),h(c.STOCK),h(c.AGENT),h(c.PROVIDER),h(c.FINANCE),h(c.EMPLOYEE),h(c.EXPERT),h(c.TEACHER);var oe;(function(e){e[e.ORG_ADMIN=101]="ORG_ADMIN",e[e.ORG_CHIEF=151]="ORG_CHIEF",e[e.SYS_RIGHT=102]="SYS_RIGHT",e[e.SYS_DUTY_MONITOR=104]="SYS_DUTY_MONITOR",e[e.SYS_DUTY=105]="SYS_DUTY",e[e.SYS_COM_ADMIN=107]="SYS_COM_ADMIN",e[e.SYS_GMSOFT_ADMIN=108]="SYS_GMSOFT_ADMIN",e[e.APPROVAL_ADMIN=201]="APPROVAL_ADMIN",e[e.APPROVAL_OPER=202]="APPROVAL_OPER",e[e.APPROVAL_LEADER=203]="APPROVAL_LEADER",e[e.STOCK_ADMIN=301]="STOCK_ADMIN",e[e.STOCK_OPER=302]="STOCK_OPER",e[e.STOCK_LEADER=303]="STOCK_LEADER",e[e.STOCK_FIN=304]="STOCK_FIN",e[e.AGENT_ADMIN=401]="AGENT_ADMIN",e[e.AGENT_OPER=402]="AGENT_OPER",e[e.AGENT_LEADER=403]="AGENT_LEADER",e[e.PROVIDER_ADMIN=501]="PROVIDER_ADMIN",e[e.PROVIDER_OPER=502]="PROVIDER_OPER",e[e.FINANC_ADMIN=701]="FINANC_ADMIN",e[e.FINANC_OPER=702]="FINANC_OPER"})(oe||(oe={}));var Ut=oe,ue;(function(e){e[e.PERSON=100]="PERSON",e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(ue||(ue={}));var Bt=ue,le;(function(e){e.DJC="DJC",e.XCJ="XCJ",e.ZCJ="ZCJ",e.PM="PM",e.ZRTD="ZRTD"})(le||(le={}));var Yt=le,q="__token__",$="__token_param_key__",Fe="__token__",Gt=function(e,t){var n;try{e&&t&&(window[$]=e,window[q]=t,window.history.replaceState(f(f({},window.history.state),(n={},n[$]=e,n[q]=t,n)),""))}catch{}},He=function(){try{return window[$]||window.history.state[$]||Fe}catch{return Fe}},Ue=function(){try{return window[q]||window.history.state[q]}catch{return null}},de=function(e){var t=L.default.parse(window.location.search,{ignoreQueryPrefix:!0})||{},n=e||He(),r=t[n]||Ue();return Gt(n,r),r},Be=function(){var e,t=He(),n=Ue();return n?(e={},e[t]=n,e):null},Ye=function(e){de(e)},Qt=function(e){var t=e.url,n=e.target,r=n===void 0?"_self":n,a=e.extraParams,i=e.qsStringifyOptions,o=Be();if(o){var v=t.split("?"),g=v[0],u=v[1],s=L.default.stringify(f(f(f({},L.default.parse(u)),a),o),f({arrayFormat:"repeat",allowDots:!0},i)),E=[g,s].join("?");window.open(E,r)}},Kt="Authorization",Ge=function(e,t){var n,r=e.tokenParamKey,a=e.authHeaderKey;t===void 0&&(t={});var i=de(r);if(i){var o=f(f({},t.headers),(n={},n[a||Kt]=i,n));return f(f({},t),{headers:o})}return t};function Vt(e){return Ye(e.tokenParamKey),function(t){return Ge(e,t)}}function qt(e){return Ye(e.tokenParamKey),window.angular.module("HTInterceptor",[]).factory("HTInterceptor",function(){return{request:function(t){return Ge(e,t)}}}).config(["$httpProvider",function(n){n.interceptors.push("HTInterceptor")}]),"HTInterceptor"}l.LoginByPageOrRegister=kt,l.LoginByPopupOrRegister=zt,l.OrgIdentityStringOptions=Ht,l.OrgIdentityType=xt,l.OrgIdentityTypeOptions=Ft,l.RoleType=Ut,l.UIType=Yt,l.UserIdentity=Bt,l.angularHTInterceptor=qt,l.angularTokenInterceptor=Xe,l.axiosHTInterceptor=Vt,l.axiosTokenInterceptor=U,l.buildLoginParams=Ee,l.buildLoginQueryString=he,l.compatibilityMe=Ae,l.getOrgIdentityString=h,l.getToken=J,l.getTokenLegacy=de,l.getTokenWithKey=Be,l.jumpWithToken=Qt,l.loginByPage=De,l.loginByPopup=Me,l.logout=Oe,l.meSelector=ae,l.meSeletor=ae,l.register=pe,l.requestMe=K,l.requestMeTrySSO=Ie,l.updateSelfTokenInterceptor=Ze,l.urlWithToken=We,l.useMe=Re,Object.defineProperties(l,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=auth-sdk.umd.js.map
