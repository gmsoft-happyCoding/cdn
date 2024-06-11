(function(d,M){typeof exports=="object"&&typeof module!="undefined"?M(exports,require("react"),require("react-redux"),require("qs"),require("axios"),require("react-dom"),require("styled-components"),require("antd")):typeof define=="function"&&define.amd?define(["exports","react","react-redux","qs","axios","react-dom","styled-components","antd"],M):(d=typeof globalThis!="undefined"?globalThis:d||self,M(d.AuthSDK={},d.React,d.ReactRedux,d.Qs,d.axios,d.ReactDOM,d.styled,d.antd))})(this,function(d,M,F,Ye,Ge,Ke,J,p){"use strict";function z(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var l=z(M),j=z(Ye),Qe=z(Ge),de=z(Ke),b=z(J);/*! *****************************************************************************
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
    ***************************************************************************** */var s=function(){return s=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s.apply(this,arguments)};function ee(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function D(e,t,n,r){function a(i){return i instanceof n?i:new n(function(o){o(i)})}return new(n||(n=Promise))(function(i,o){function g(c){try{u(r.next(c))}catch(f){o(f)}}function h(c){try{u(r.throw(c))}catch(f){o(f)}}function u(c){c.done?i(c.value):a(c.value).then(g,h)}u((r=r.apply(e,t||[])).next())})}function N(e,t){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,a,i,o;return o={next:g(0),throw:g(1),return:g(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function g(u){return function(c){return h([u,c])}}function h(u){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,a&&(i=u[0]&2?a.return:u[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,u[1])).done)return i;switch(a=0,i&&(u=[u[0]&2,i.value]),u[0]){case 0:case 1:i=u;break;case 4:return n.label++,{value:u[1],done:!1};case 5:n.label++,a=u[1],u=[0];continue;case 7:u=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(u[0]===6||u[0]===2)){n=0;continue}if(u[0]===3&&(!i||u[1]>i[0]&&u[1]<i[3])){n.label=u[1];break}if(u[0]===6&&n.label<i[1]){n.label=i[1],i=u;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(u);break}i[2]&&n.ops.pop(),n.trys.pop();continue}u=t.call(e,n)}catch(c){u=[6,c],a=0}finally{r=i=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}}function I(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var te=function(e,t,n,r,a,i){e===void 0&&(e="Auth"),t===void 0&&(t="Auth"),n===void 0&&(n=window.top||window),r===void 0&&(r="__auth__"),a===void 0&&(a="__token__"),i===void 0&&(i="Bearer");try{if(document.cookie&&document.cookie.length>0){var o=document.cookie.split(/\s*;\s*/);if(o&&o.length>0){var g=o.find(function(E){return E.startsWith(e)}),h=g?g.split("=")[1]:null;if(h)return h&&t?t+" "+h:h}}var u=j.default.parse(n.location.search,{ignoreQueryPrefix:!0});if(r){var c=u[r];if(c&&typeof c=="string")return c&&t?t+" "+c:c}if(a){var f=u[a];if(f&&typeof f=="string")return f&&i?i+" "+f:f}return null}catch{return null}},Ve=function(e){var t=e===void 0?{}:e,n=t.platDomain,r=n===void 0?window.location.host:n,a=t.platDomainKey,i=a===void 0?"__platDomain__":a,o=t.notSetPlatDomain,g=o===void 0?!1:o,h=t.authCookieKey,u=h===void 0?"Auth":h,c=t.authHeaderKey,f=c===void 0?"Authorization":c,E=t.authScheme,C=E===void 0?"Auth":E,y=t.notSetAuthHeader,k=y===void 0?!1:y,S=t.queryByWindow,P=S===void 0?window.top||window:S,w=t.authQueryKey,O=w===void 0?"__auth__":w,A=t.tokenQueryKey,_=A===void 0?"__token__":A,T=t.tokenScheme,Z=T===void 0?"Bearer":T;return{platDomain:r,platDomainKey:i,notSetPlatDomain:g,authCookieKey:u,authHeaderKey:f,authScheme:C,notSetAuthHeader:k,queryByWindow:P,authQueryKey:O,tokenScheme:Z,tokenQueryKey:_}},U=function(e){return function(t){var n,r,a,i,o=Ve(e),g=o.platDomain,h=o.platDomainKey,u=o.notSetPlatDomain,c=o.authCookieKey,f=o.authHeaderKey,E=o.authScheme,C=o.notSetAuthHeader,y=o.queryByWindow,k=o.authQueryKey,S=o.tokenQueryKey,P=o.tokenScheme,w=u||!g||t.params&&t.params[h]||((a=t==null?void 0:t.url)===null||a===void 0?void 0:a.indexOf(h+"="))!==-1?t.params:s(s({},t.params),(n={},n[h]=g,n)),O=te(c,E,y,k,S,P),A=C||!O||((i=t==null?void 0:t.headers)===null||i===void 0?void 0:i[f])?t.headers:s(s({},t.headers),(r={},r[f]=O,r));return s(s({},t),{params:w,headers:A})}},qe=function(e){var t="tokenInterceptor";return window.angular&&window.angular.module(t,[]).factory(t,function(){return{request:function(n){return n.url.indexOf(".tpl")!==-1&&(n.withCredentials=!1),n.url.indexOf(".html")===-1?U(e)(n):n}}}).config(["$httpProvider",function(r){r.interceptors.push(t)}]),t},$e=function(e,t,n,r,a){t===void 0&&(t="__auth__"),n===void 0&&(n="Auth"),r===void 0&&(r=window.top||window),a===void 0&&(a="__auth__");var i=te(n,"",r,a,"","");return i?""+e+(e.indexOf("?")!==-1?"&":"?")+t+"="+i:e},Y=Qe.default.create({withCredentials:!0,paramsSerializer:function(e){return j.default.stringify(e,{arrayFormat:"repeat",allowDots:!0})}}),ce=Y.interceptors.request.use(U()),We=function(e){Y.interceptors.request.eject(ce),ce=Y.interceptors.request.use(U(e))},R=function(e,t){return Y(s({url:e},t))};function G(e){if(!e)return{};var t=e.startsWith("//")?""+window.location.protocol+e:e,n={},r=["href","origin","protocol","host","hostname","port","pathname","search","hash"],a=/(([^:]+:)\/\/(([^:/?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/,i=a.exec(t);if(i)for(var o=r.length-1;o>=0;--o)n[r[o]]=i[o]?i[o]:"";return n}var Xe=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/user?requireAvatar=true"},Ze=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/login"},Je=function(e){e===void 0&&(e=window.location.origin);var t=G(e).host;return e+"/gateway/v1/op?host="+encodeURIComponent(t)},ve=function(e){return e+"/djcsupport/domainname/getPlatformConfigure"},et=function(e,t,n){return n||(t?e+"@"+t:"plat@"+e)},tt=function(e,t){return t||(e||window.location.origin)+"/login-app/login-success/index.html"},se=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,i=e.djcGatewayBaseUrl,o=e.platId,g=e.dp,h=e.ui,u=e.registerNoHeader,c=e.title,f=e.clientId,E=e.loginSuccessRedirectUri,C=e.limitOrgType,y=e.preferOrgType,k=e.errorMessage,S=e.extraParams;return D(void 0,void 0,void 0,function(){var P,w,O,A,_;return N(this,function(T){switch(T.label){case 0:return P=G(n).host,w=o,o?[3,2]:[4,R(ve(i),{params:{orgDomainName:P}})];case 1:O=T.sent().data,w=O==null?void 0:O.platformCode,T.label=2;case 2:return w?(_={},C&&(_.limitOrgType=C),y&&(_.preferOrgType=y),[2,s(s({},S),{ui:h,register_no_header:u,title:c,origin:n,client_id:et(w,g,f),scope:r||a||P,login_sucess_redirect_uri:tt(n,E),redirect_uri:Ze(n),is_fpa:!0,error_message:k,options:Object.keys(_).length>0?JSON.stringify(_):void 0})]):(A="\u672A\u67E5\u8BE2\u5230 "+P+" \u5BF9\u5E94\u7684\u5E73\u53F0\u4FE1\u606F, \u8BF7\u68C0\u67E5\u5E73\u53F0\u914D\u7F6E\u662F\u5426\u6B63\u786E",console.log(A),[2,Promise.reject(new Error(A))])}})})},fe=function(e){return D(void 0,void 0,void 0,function(){var t;return N(this,function(n){switch(n.label){case 0:return[4,se(e)];case 1:return t=n.sent(),[2,j.default.stringify(t,{addQueryPrefix:!0})]}})})},K=function(){try{return(top==null?void 0:top.document.querySelector("#mount-root"))||top.document.body}catch{return document.body}};function nt(e){return e&&e.parentNode?e.parentNode:K()}var ne="gmsoft-ui-top-body-need-inject-css",re=function(e){top[ne]=e},rt=function(){return top[ne]===void 0&&re(!0),top[ne]},at=J.createGlobalStyle(ge||(ge=I([`
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
`]))),it=function(){M.useEffect(function(){return re(!1),function(){re(!0)}})},ot=function(){var e=M.useState(function(){return rt()})[0];return it(),e?l.default.createElement(at,null):null},ge,ut=K(),L=function(e){var t=e.children,n=e.width,r=e.getContainer,a=ee(e,["children","width","getContainer"]);return a.visible!==!0?null:l.default.createElement(J.StyleSheetManager,{target:ut},l.default.createElement(l.default.Fragment,null,l.default.createElement(ot,null),l.default.createElement(p.Modal,s({getContainer:r||K,width:n},a),l.default.createElement(p.ConfigProvider,{getPopupContainer:nt},t))))},H=function(e){return function(t){return p.Modal[e](s({getContainer:K},t))}};L.info=H("info"),L.success=H("success"),L.error=H("error"),L.warning=H("warning"),L.confirm=H("confirm"),L.destroyAll=p.Modal.destroyAll;var Q="ant",V=function(){},lt=b.default(L)(he||(he=I([`
  &&& .`,`-modal-body {
    border: 3px solid #666666;
    border-radius: 3px;
    padding: 0;
  }
`],[`
  &&& .`,`-modal-body {
    border: 3px solid #666666;
    border-radius: 3px;
    padding: 0;
  }
`])),Q),dt=function(e,t,n){V&&V();var r=document.createElement("div");document.body.appendChild(r);var a=function(){return de.default.unmountComponentAtNode(r)};return V=function(){t&&typeof t=="function"&&t(),a()},de.default.render(l.default.createElement(lt,{visible:!0,maskClosable:!0,closable:!1,footer:null,closeIcon:null,onCancel:V,width:366},l.default.createElement("iframe",{title:"loginBox",className:"login-form-box",src:e,width:"360px",height:"440px",scrolling:"no",style:{margin:0,padding:0,display:"block"},frameBorder:"0"})),r),n&&(n.current=a),a},he,ct="@@GLOBAL_CONTEXT/SET";function vt(e,t){e&&e({type:ct,payload:{me:t}})}var st="__platDomain__",ft=function(e){return e?e.findIndex(function(t){return String(t).endsWith("01")})!==-1:!1},me=function(e){var t,n,r,a,i,o,g,h,u,c,f,E;if(!(!e||Object.getOwnPropertyNames(e).length===0))return s({admin:ft(e==null?void 0:e.roles),adminAreaId:(t=e==null?void 0:e.org)===null||t===void 0?void 0:t.areaId,adminAreaName:(n=e==null?void 0:e.org)===null||n===void 0?void 0:n.areaName,maintainPlatId:(r=e==null?void 0:e.additionalInformation)===null||r===void 0?void 0:r.mpi,orgId:(a=e==null?void 0:e.org)===null||a===void 0?void 0:a.orgId,orgName:(i=e==null?void 0:e.org)===null||i===void 0?void 0:i.orgName,orgType:(o=e==null?void 0:e.org)===null||o===void 0?void 0:o.orgType,userName:e==null?void 0:e.realName,userTypes:e!=null&&e.roles?e==null?void 0:e.roles.join(","):void 0,deptRole:(g=e==null?void 0:e.additionalInformation)===null||g===void 0?void 0:g.deptRole,isBidDown:(h=e==null?void 0:e.additionalInformation)===null||h===void 0?void 0:h.isBidDown,isSj:(u=e==null?void 0:e.additionalInformation)===null||u===void 0?void 0:u.isSj,orgClassNo:(c=e==null?void 0:e.additionalInformation)===null||c===void 0?void 0:c.orgClassNo,organClass:(f=e==null?void 0:e.additionalInformation)===null||f===void 0?void 0:f.organClass,userType:(E=e==null?void 0:e.additionalInformation)===null||E===void 0?void 0:E.userType},e)},q=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.dispatch;return D(void 0,void 0,void 0,function(){var i,o,g,h,u,c;return N(this,function(f){switch(f.label){case 0:return i=G(n).host,o=r||i,[4,R(Xe(n),{params:(c={},c[st]=o,c)})];case 1:return g=f.sent(),h=g.data,!h||Object.getOwnPropertyNames(h).length===0?[2,Promise.reject()]:(u=me(g.data),window.location.origin.includes(n)&&vt(a,u),[2,u])}})})},Ee=function(e){var t=e.authPageOrigin,n=e.origin,r=n===void 0?window.location.origin:n,a=e.whoAmIHost,i=e.whoAmIhost,o=e.clientId,g=e.platId,h=e.dp,u=e.ui,c=e.registerNoHeader,f=e.title,E=e.djcGatewayBaseUrl,C=e.loginSuccessRedirectUri,y=e.limitOrgType,k=e.preferOrgType,S=e.oauthState,P=e.onCancelLogin,w=e.closePopupRef,O=e.dispatch;return D(void 0,void 0,void 0,function(){var A,_,T,Z;return N(this,function(x){switch(x.label){case 0:A=a||i,x.label=1;case 1:return x.trys.push([1,3,,5]),[4,q({dispatch:O,origin:r,whoAmIHost:A})];case 2:return _=x.sent(),[2,_];case 3:return x.sent(),[4,fe({origin:r,whoAmIHost:A,djcGatewayBaseUrl:E,clientId:o,platId:g,dp:h,ui:u,registerNoHeader:c,title:f,loginSuccessRedirectUri:C,limitOrgType:y,preferOrgType:k,extraParams:S})];case 4:return T=x.sent(),Z=t+"/oauth-login"+T,[2,dt(Z,P,w)];case 5:return[2]}})})},gt=function(e,t){return e===void 0&&(e=window.location.origin),D(void 0,void 0,void 0,function(){var n,r;return N(this,function(a){switch(a.label){case 0:return{}.VITE_DEPLOY==="PM"?[2,t+"/authing"]:[4,R(Je(e))];case 1:return n=a.sent(),[2,(r=n==null?void 0:n.data)===null||r===void 0?void 0:r.op]}})})},ht=function(e){return e.then(function(t){return{value:t,status:"resolved"}},function(t){return{error:t,status:"rejected"}})},mt=function(e,t){return t===void 0&&(t=5e3),new Promise(function(n,r){var a=new Image(0,0);a.onload=n,a.onerror=r,a.src=e,setTimeout(function(){r()},t)})},Et=function(e){e===void 0&&(e=[]);var t=e.filter(function(n){return n}).map(function(n){return mt(n)});return Promise.all(t.map(ht))},Mt=function(e,t,n){return D(void 0,void 0,void 0,function(){var r;return N(this,function(a){switch(a.label){case 0:return[4,R(e+"/logout",{method:"DELETE",params:{success_uri:t}})];case 1:return r=a.sent().data,n&&n.length>0?[4,Et(n)]:[3,3];case 2:a.sent(),a.label=3;case 3:return window.open(r.location,"_top"),[2]}})})},Me=function(e){var t=e.djcGatewayBaseUrl,n=e.logoutRedirectUrl,r=e.otherLogoutUrls,a=e.origin;return D(void 0,void 0,void 0,function(){var i;return N(this,function(o){switch(o.label){case 0:return[4,gt(a,t)];case 1:return i=o.sent(),[4,Mt(i,n,r)];case 2:return o.sent(),[2]}})})},pe=function(e){var t=e.authPageOrigin,n=e.origin,r=e.ui,a=e.dp,i=e.djcGatewayBaseUrl,o=e.noHeader,g=e.types,h=e.extraParams;return D(void 0,void 0,void 0,function(){var u,c,f;return N(this,function(E){switch(E.label){case 0:return u=t+"/register/select-type",c=null,[4,R(ve(i),{params:{orgDomainName:n?G(n).host:window.location.host}})];case 1:return f=E.sent().data,c=f==null?void 0:f.platformCode,window.open(""+u+j.default.stringify(s({ui:r,platId:c,dp:a,noHeader:o,types:g?g.join(","):void 0},h),{addQueryPrefix:!0,encode:!1}),"_blank"),[2]}})})},Ae="globalContext",ae=function(e){return e&&e[Ae]?e[Ae].me:void 0},we=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,i=e.dispatch;return q({dispatch:i,origin:n,whoAmIHost:r||a})},Oe=function(e){return D(void 0,void 0,void 0,function(){var t,n=e.loginPage,r=ee(e,["loginPage"]);return N(this,function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,we(r)];case 1:return t=a.sent(),[2,t];case 2:return a.sent(),window.open(n,"_top"),[3,3];case 3:return[2]}})})},B=l.default.createContext({authPageOrigin:"",djcGatewayBaseUrl:"",toCenterPage:function(){}}),pt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA0OCA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ4IDI0LjAyNjRDNDggMzcuMjY3MyAzNy4yNTQxIDQ4LjAwMzEgMjMuOTk3NSA0OC4wMDMxQzEwLjc0MjEgNDguMDAzMSAwIDM3LjI2NzMgMCAyNC4wMjY0QzAgMTMuODYzIDYuMzI2MDUgNS4xNzk4NyAxNS4yNjAyIDEuNjkwMzNDMTcuOTU5NiAwLjYwMTM3NiAyMC45MDg3IDAgMjMuOTk4MSAwQzI3LjA5MTMgMCAzMC4wMzc5IDAuNjAwNzY5IDMyLjczOTggMS42OTAzM0M0MS42NzM0IDUuMTc5ODcgNDggMTMuODYzIDQ4IDI0LjAyNjRaTTE0Ljc3MzMgMTguOTY5OUMxNC43NzMzIDIzLjAxMDUgMTYuODQzNiAyNi41MDg4IDE5Ljg1MzEgMjguMjIxMUMyMS4xMDEyIDI4LjkzMTQgMjIuNTA2NSAyOS4zNDA5IDIzLjk5NzUgMjkuMzQwOUMyNS40MzYxIDI5LjM0MDkgMjYuNzkyNSAyOC45NTc4IDI4LjAwNzkgMjguMjk2QzMxLjA4ODUgMjYuNjE2MyAzMy4yMjU1IDIzLjA3NTMgMzMuMjI1NSAxOC45NzA1QzMzLjIyNTUgMTMuMjU1MyAyOS4wODY4IDguNjAzMjggMjMuOTk3NSA4LjYwMzI4QzE4LjkxMTQgOC42MDI2NyAxNC43NzMzIDEzLjI1NDcgMTQuNzczMyAxOC45Njk5Wk0yNC4wOTUgNDYuNDQ5NEMzMS4xMDY3IDQ2LjQ0OTQgMzcuMzYxNiA0My4yMjQ3IDQxLjQ2MTMgMzguMTc4M0M0MC45NzcgMzQuMTk3NSAzNy4wOTggMzAuODA4NiAzMS42MDgxIDI5LjExODJDMjkuNTM0NyAzMC45ODM1IDI2Ljg4NTYgMzIuMTA1OCAyMy45OTY4IDMyLjEwNThDMjEuMDQzOSAzMi4xMDU4IDE4LjM0MDggMzAuOTIzMSAxNi4yNDcyIDI4Ljk3NjdDMTAuOTA2OSAzMC41MDA5IDYuOTk1MzIgMzMuNjA5OSA2LjA3ODE4IDM3LjMzNTNDMTAuMTQ2NCA0Mi44NjE3IDE2LjcwMzMgNDYuNDQ5NCAyNC4wOTUgNDYuNDQ5NFoiIGZpbGw9IiNDRUNGRTAiLz4KPC9zdmc+Cg==",De=function(e){var t=e.path,n=e.className,r=M.useContext(B).djcGatewayBaseUrl,a=M.useMemo(function(){return t?r+"/files?business=avatar&filePath="+t+"&fileName=file&attachment=false&contentType=image/png":pt},[r,t]);return l.default.createElement(p.Avatar,{className:n,src:a})},$=function(e){return e.theme.textColorSecondary||"#697b8c"},Ne=function(e){return e.theme.linkColorHover||"#1890ff"},At=b.default.a(Ie||(Ie=I([`
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
`])),$,$,$,$,Ne,Ne),wt=function(){try{return window.top.location.href}catch{return window.location.href}},Ot=function(){var e=M.useContext(B),t=e.logoutRedirectUrl,n=ee(e,["logoutRedirectUrl"]),r=M.useCallback(function(){return D(void 0,void 0,void 0,function(){return N(this,function(a){switch(a.label){case 0:return[4,Me(s(s({},n),{logoutRedirectUrl:t||wt()}))];case 1:return a.sent(),[2]}})})},[n,t]);return l.default.createElement(At,{onClick:r},l.default.createElement("span",null,"\u9000\u51FA"),l.default.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4393",width:"20",height:"20"},l.default.createElement("path",{d:"M593.92 838.513v-95.355a40.96 40.96 0 1 1 81.92 0v95.355c0 45.26-35.226 83.087-80.22 83.087H203.1c-44.994 0-80.22-37.827-80.22-83.087V185.487c0-45.26 35.226-83.087 80.22-83.087h392.52c44.994 0 80.22 37.827 80.22 83.087v193.946a40.96 40.96 0 1 1-81.92 0V185.487c0-1.024 0.061-1.147 0.901-1.167H203.9c0.84 0 0.901 0.164 0.901 1.167v653.026c0 1.024-0.061 1.147-0.901 1.167H594.82c-0.84 0-0.901-0.164-0.901-1.167z","p-id":"4394"}),l.default.createElement("path",{d:"M471.04 512h327.68q40.96 0 40.96 40.96t-40.96 40.96H471.04q-40.96 0-40.96-40.96T471.04 512z","p-id":"4395"}),l.default.createElement("path",{d:"M811.199 422.828L912.57 524.2q28.963 28.963 0 57.926t-57.926 0l-101.37-101.37q-28.964-28.964 0-57.927 28.962-28.963 57.925 0z","p-id":"4396"}),l.default.createElement("path",{d:"M753.273 625.575l101.37-101.37q28.964-28.964 57.927 0 28.963 28.962 0 57.925L811.2 683.501q-28.964 28.963-57.927 0t0-57.926z","p-id":"4397"})))},Ie,Dt=p.Typography.Paragraph,Nt=b.default.div(_e||(_e=I([`
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
`])),Q,Q,Q),It=b.default(De)(be||(be=I([`
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
`]))),Pe=b.default(Dt).attrs({ellipsis:!0})(ye||(ye=I([`
  &&& {
    margin: 0;
  }
`],[`
  &&& {
    margin: 0;
  }
`]))),Pt=b.default(Pe)(Te||(Te=I([`
  font-size: 16px;
  font-weight: 700;
`],[`
  font-size: 16px;
  font-weight: 700;
`]))),_t=function(e){var t,n,r,a=e.me,i=M.useContext(B).toCenterPage;return l.default.createElement(Nt,null,l.default.createElement(p.Menu,{mode:"vertical"},l.default.createElement(p.Menu.Item,{key:"avatar"},l.default.createElement(It,{path:(t=a.additionalInformation)===null||t===void 0?void 0:t.avatar})),l.default.createElement(p.Menu.Item,{key:"name"},a.realName&&l.default.createElement("a",{onClick:i},l.default.createElement(Pt,null,a.realName)),((n=a.org)===null||n===void 0?void 0:n.orgName)&&l.default.createElement(Pe,null,(r=a.org)===null||r===void 0?void 0:r.orgName)),l.default.createElement(p.Menu.Divider,null),l.default.createElement(p.Menu.Item,{key:"logout"},l.default.createElement(Ot,null))))},_e,be,ye,Te,bt=b.default(De)(Ce||(Ce=I([`
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
`]))),yt=p.Typography.Text,Tt=b.default(yt)(Se||(Se=I([`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`],[`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`]))),Ct=function(e){var t,n=e.me;return l.default.createElement(p.Popover,{placement:"bottom",autoAdjustOverflow:!1,content:l.default.createElement(_t,{me:n})},l.default.createElement(bt,{path:(t=n.additionalInformation)===null||t===void 0?void 0:t.avatar}),l.default.createElement(Tt,{ellipsis:!0},n.realName))},Ce,Se,St=function(){var e=M.useContext(B),t=M.useCallback(function(){pe(e)},[e]);return l.default.createElement("a",{className:"register",onClick:t},"\u6CE8\u518C")},je=function(){return F.useSelector(ae)},jt=function(){var e=je(),t=F.useDispatch();return M.useEffect(function(){e||q({dispatch:t}).catch(function(){})},[e,t]),e},Lt=p.Typography.Text,kt=b.default(Lt).attrs({type:"secondary"})(Le||(Le=I([`
  margin: 0 8px;
`],[`
  margin: 0 8px;
`]))),Le,ke=function(e){var t=e.className,n=e.children,r=jt();return l.default.createElement(B.Provider,{value:e},l.default.createElement("div",{className:t},r?l.default.createElement(Ct,{me:r}):l.default.createElement(l.default.Fragment,null,n,l.default.createElement(kt,null,"\u6216"),l.default.createElement(St,null))))},xe=function(e){var t=e.login;return l.default.createElement("a",{className:"login",onClick:t},"\u767B\u5F55")},xt=function(e){var t=e.loginPage,n=F.useDispatch(),r=M.useCallback(function(){Oe(s(s({},e),{dispatch:n}))},[n,e]);return l.default.createElement(ke,s({},e,{logoutRedirectUrl:t}),l.default.createElement(xe,{login:r}))},zt=function(e){var t=F.useDispatch(),n=M.useCallback(function(){Ee(s(s({},e),{dispatch:t}))},[t,e]);return l.default.createElement(ke,s({},e),l.default.createElement(xe,{login:n}))},v;(function(e){e[e.PLATFORM=1]="PLATFORM",e[e.APPROVAL=2]="APPROVAL",e[e.STOCK=3]="STOCK",e[e.AGENT=4]="AGENT",e[e.PROVIDER=5]="PROVIDER",e[e.FINANCE=7]="FINANCE",e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(v||(v={}));var Rt=v,m=function(e,t){var n="";switch(e){case v.PLATFORM:n="platform";break;case v.APPROVAL:n="approval";break;case v.STOCK:n="stock";break;case v.AGENT:n="agent";break;case v.PROVIDER:n="provider";break;case v.FINANCE:n="finance";break;case v.EMPLOYEE:n="employee";break;case v.EXPERT:n="expert";break;case v.TEACHER:n="teacher";break;default:n="";break}return t?n.toUpperCase():n},Ht=[{label:"\u5E73\u53F0\u8FD0\u8425",value:v.PLATFORM},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:v.APPROVAL},{label:"\u91C7\u8D2D\u5355\u4F4D",value:v.STOCK},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:v.AGENT},{label:"\u4F9B\u5E94\u5546",value:v.PROVIDER},{label:"\u91D1\u878D\u673A\u6784",value:v.FINANCE},{label:"\u5355\u4F4D\u6210\u5458",value:v.EMPLOYEE},{label:"\u4E13\u5BB6",value:v.EXPERT},{label:"\u6559\u5E08",value:v.TEACHER}],Bt=[{label:"\u5E73\u53F0\u8FD0\u8425",value:m(v.PLATFORM,!0)},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:m(v.APPROVAL,!0)},{label:"\u91C7\u8D2D\u5355\u4F4D",value:m(v.STOCK,!0)},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:m(v.AGENT,!0)},{label:"\u4F9B\u5E94\u5546",value:m(v.PROVIDER,!0)},{label:"\u91D1\u878D\u673A\u6784",value:m(v.FINANCE,!0)},{label:"\u5355\u4F4D\u6210\u5458",value:m(v.EMPLOYEE,!0)},{label:"\u4E13\u5BB6",value:m(v.EXPERT,!0)},{label:"\u6559\u5E08",value:m(v.TEACHER,!0)}];m(v.PLATFORM),m(v.APPROVAL),m(v.STOCK),m(v.AGENT),m(v.PROVIDER),m(v.FINANCE),m(v.EMPLOYEE),m(v.EXPERT),m(v.TEACHER);var ie;(function(e){e[e.ORG_ADMIN=101]="ORG_ADMIN",e[e.ORG_CHIEF=151]="ORG_CHIEF",e[e.SYS_RIGHT=102]="SYS_RIGHT",e[e.SYS_DUTY_MONITOR=104]="SYS_DUTY_MONITOR",e[e.SYS_DUTY=105]="SYS_DUTY",e[e.SYS_COM_ADMIN=107]="SYS_COM_ADMIN",e[e.SYS_GMSOFT_ADMIN=108]="SYS_GMSOFT_ADMIN",e[e.APPROVAL_ADMIN=201]="APPROVAL_ADMIN",e[e.APPROVAL_OPER=202]="APPROVAL_OPER",e[e.APPROVAL_LEADER=203]="APPROVAL_LEADER",e[e.STOCK_ADMIN=301]="STOCK_ADMIN",e[e.STOCK_OPER=302]="STOCK_OPER",e[e.STOCK_LEADER=303]="STOCK_LEADER",e[e.STOCK_FIN=304]="STOCK_FIN",e[e.AGENT_ADMIN=401]="AGENT_ADMIN",e[e.AGENT_OPER=402]="AGENT_OPER",e[e.AGENT_LEADER=403]="AGENT_LEADER",e[e.PROVIDER_ADMIN=501]="PROVIDER_ADMIN",e[e.PROVIDER_OPER=502]="PROVIDER_OPER",e[e.FINANC_ADMIN=701]="FINANC_ADMIN",e[e.FINANC_OPER=702]="FINANC_OPER"})(ie||(ie={}));var Ft=ie,oe;(function(e){e[e.PERSON=100]="PERSON",e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(oe||(oe={}));var Ut=oe,ue;(function(e){e.DJC="DJC",e.XCJ="XCJ",e.ZCJ="ZCJ",e.PM="PM",e.ZRTD="ZRTD"})(ue||(ue={}));var Yt=ue,W="__token__",X="__token_param_key__",ze="__token__",Gt=function(e,t){var n;try{e&&t&&(window[X]=e,window[W]=t,window.history.replaceState(s(s({},window.history.state),(n={},n[X]=e,n[W]=t,n)),""))}catch{}},Re=function(){try{return window[X]||window.history.state[X]||ze}catch{return ze}},He=function(){try{return window[W]||window.history.state[W]}catch{return null}},le=function(e){var t=j.default.parse(window.location.search,{ignoreQueryPrefix:!0})||{},n=e||Re(),r=t[n]||He();return Gt(n,r),r},Be=function(){var e,t=Re(),n=He();return n?(e={},e[t]=n,e):null},Fe=function(e){le(e)},Kt=function(e){var t=e.url,n=e.target,r=n===void 0?"_self":n,a=e.extraParams,i=e.qsStringifyOptions,o=Be();if(o){var g=t.split("?"),h=g[0],u=g[1],c=j.default.stringify(s(s(s({},j.default.parse(u)),a),o),s({arrayFormat:"repeat",allowDots:!0},i)),f=[h,c].join("?");window.open(f,r)}},Qt="Authorization",Ue=function(e,t){var n,r=e.tokenParamKey,a=e.authHeaderKey;t===void 0&&(t={});var i=le(r);if(i){var o=s(s({},t.headers),(n={},n[a||Qt]=i,n));return s(s({},t),{headers:o})}return t};function Vt(e){return Fe(e.tokenParamKey),function(t){return Ue(e,t)}}function qt(e){return Fe(e.tokenParamKey),window.angular.module("HTInterceptor",[]).factory("HTInterceptor",function(){return{request:function(t){return Ue(e,t)}}}).config(["$httpProvider",function(n){n.interceptors.push("HTInterceptor")}]),"HTInterceptor"}d.LoginByPageOrRegister=xt,d.LoginByPopupOrRegister=zt,d.OrgIdentityStringOptions=Bt,d.OrgIdentityType=Rt,d.OrgIdentityTypeOptions=Ht,d.RoleType=Ft,d.UIType=Yt,d.UserIdentity=Ut,d.angularHTInterceptor=qt,d.angularTokenInterceptor=qe,d.axiosHTInterceptor=Vt,d.axiosTokenInterceptor=U,d.buildLoginParams=se,d.buildLoginQueryString=fe,d.compatibilityMe=me,d.getOrgIdentityString=m,d.getToken=te,d.getTokenLegacy=le,d.getTokenWithKey=Be,d.jumpWithToken=Kt,d.loginByPage=Oe,d.loginByPopup=Ee,d.logout=Me,d.meSelector=ae,d.meSeletor=ae,d.register=pe,d.requestMe=q,d.requestMeTrySSO=we,d.updateSelfTokenInterceptor=We,d.urlWithToken=$e,d.useMe=je,Object.defineProperties(d,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=auth-sdk.umd.js.map
