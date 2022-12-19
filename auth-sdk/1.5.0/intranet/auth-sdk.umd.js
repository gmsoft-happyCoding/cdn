(function(d,m){typeof exports=="object"&&typeof module!="undefined"?m(exports,require("react"),require("react-redux"),require("axios"),require("qs"),require("react-dom"),require("styled-components"),require("antd")):typeof define=="function"&&define.amd?define(["exports","react","react-redux","axios","qs","react-dom","styled-components","antd"],m):(d=typeof globalThis!="undefined"?globalThis:d||self,m(d.AuthSDK={},d.React,d.ReactRedux,d.axios,d.Qs,d.ReactDOM,d.styled,d.antd))})(this,function(d,m,B,Xe,Ze,Je,X,p){"use strict";function z(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var l=z(m),et=z(Xe),L=z(Ze),me=z(Je),I=z(X);/*! *****************************************************************************
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
    ***************************************************************************** */var s=function(){return s=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s.apply(this,arguments)};function Z(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function A(e,t,n,r){function a(i){return i instanceof n?i:new n(function(u){u(i)})}return new(n||(n=Promise))(function(i,u){function f(c){try{o(r.next(c))}catch(h){u(h)}}function g(c){try{o(r.throw(c))}catch(h){u(h)}}function o(c){c.done?i(c.value):a(c.value).then(f,g)}o((r=r.apply(e,t||[])).next())})}function w(e,t){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,a,i,u;return u={next:f(0),throw:f(1),return:f(2)},typeof Symbol=="function"&&(u[Symbol.iterator]=function(){return this}),u;function f(o){return function(c){return g([o,c])}}function g(o){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,a&&(i=o[0]&2?a.return:o[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,o[1])).done)return i;switch(a=0,i&&(o=[o[0]&2,i.value]),o[0]){case 0:case 1:i=o;break;case 4:return n.label++,{value:o[1],done:!1};case 5:n.label++,a=o[1],o=[0];continue;case 7:o=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(o[0]===6||o[0]===2)){n=0;continue}if(o[0]===3&&(!i||o[1]>i[0]&&o[1]<i[3])){n.label=o[1];break}if(o[0]===6&&n.label<i[1]){n.label=i[1],i=o;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(o);break}i[2]&&n.ops.pop(),n.trys.pop();continue}o=t.call(e,n)}catch(c){o=[6,c],a=0}finally{r=i=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}}function O(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var J=function(e,t){e===void 0&&(e="Auth"),t===void 0&&(t="Auth");try{if(document.cookie&&document.cookie.length>0){var n=document.cookie.split(/\s*;\s*/);if(n&&n.length>0){var r=n.find(function(i){return i.startsWith(e)}),a=r?r.split("=")[1]:null;return a&&t?t+" "+a:a}}return null}catch{return null}},tt=function(e){var t=e===void 0?{}:e,n=t.platDomain,r=n===void 0?window.location.host:n,a=t.platDomainKey,i=a===void 0?"__platDomain__":a,u=t.notSetPlatDomain,f=u===void 0?!1:u,g=t.authCookieKey,o=g===void 0?"Auth":g,c=t.authHeaderKey,h=c===void 0?"Authorization":c,E=t.authScheme,_=E===void 0?"Auth":E,C=t.notSetAuthHeader,P=C===void 0?!1:C;return{platDomain:r,platDomainKey:i,notSetPlatDomain:f,authCookieKey:o,authHeaderKey:h,authScheme:_,notSetAuthHeader:P}},Y=function(e){return function(t){var n,r,a,i,u=tt(e),f=u.platDomain,g=u.platDomainKey,o=u.notSetPlatDomain,c=u.authCookieKey,h=u.authHeaderKey,E=u.authScheme,_=u.notSetAuthHeader,C=o||!f||t.params&&t.params[g]||((a=t==null?void 0:t.url)===null||a===void 0?void 0:a.indexOf(g+"="))!==-1?t.params:s(s({},t.params),(n={},n[g]=f,n)),P=J(c,E),T=_||!P||((i=t==null?void 0:t.headers)===null||i===void 0?void 0:i[h])?t.headers:s(s({},t.headers),(r={},r[h]=P,r));return s(s({},t),{params:C,headers:T})}},nt=function(e){var t="tokenInterceptor";return window.angular&&window.angular.module(t,[]).factory(t,function(){return{request:function(n){return n.url.indexOf(".tpl")!==-1&&(n.withCredentials=!1),n.url.indexOf(".html")===-1?Y(e)(n):n}}}).config(["$httpProvider",function(r){r.interceptors.push(t)}]),t},rt=function(e,t,n){t===void 0&&(t="__auth__"),n===void 0&&(n="Auth");var r=J(n,"");return r?""+e+(e.indexOf("?")!==-1?"&":"?")+t+"="+r:e},G=et.default.create({withCredentials:!0,paramsSerializer:function(e){return L.default.stringify(e,{arrayFormat:"repeat",allowDots:!0})}}),pe=G.interceptors.request.use(Y()),at=function(e){G.interceptors.request.eject(pe),pe=G.interceptors.request.use(Y(e))},k=function(e,t){return G(s({url:e},t))};function ee(e){if(!e)return{};var t=e.startsWith("//")?""+window.location.protocol+e:e,n={},r=["href","origin","protocol","host","hostname","port","pathname","search","hash"],a=/(([^:]+:)\/\/(([^:/?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/,i=a.exec(t);if(i)for(var u=r.length-1;u>=0;--u)n[r[u]]=i[u]?i[u]:"";return n}var it=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/user?requireAvatar=true"},ot=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/login"},ut=function(e){return e+"/oauth/authorize"},Ee=function(e){return e+"/djcsupport/domainname/getPlatformConfigure"},lt=function(e,t,n){return n||(t?e+"@"+t:"plat@"+e)},dt=function(e,t){return t||(e||window.location.origin)+"/login-app/login-success/index.html"},te=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,i=e.djcGatewayBaseUrl,u=e.platId,f=e.dp,g=e.ui,o=e.registerNoHeader,c=e.title,h=e.clientId,E=e.loginSuccessRedirectUri,_=e.limitOrgTypes,C=e.errorMessage,P=e.extraParams;return A(void 0,void 0,void 0,function(){var T,S,y,N;return w(this,function(x){switch(x.label){case 0:return T=ee(n).host,S=u,u?[3,2]:[4,k(Ee(i),{params:{orgDomainName:T}})];case 1:y=x.sent().data,S=y==null?void 0:y.platformCode,x.label=2;case 2:return S?[2,s(s({},P),{ui:g,register_no_header:o,title:c,origin:n,client_id:lt(S,f,h),scope:r||a||T,login_sucess_redirect_uri:dt(n,E),redirect_uri:ot(n),is_fpa:!0,error_message:C,options:_&&{limitOrgTypes:_}})]:(N="\u672A\u67E5\u8BE2\u5230 "+T+" \u5BF9\u5E94\u7684\u5E73\u53F0\u4FE1\u606F, \u8BF7\u68C0\u67E5\u5E73\u53F0\u914D\u7F6E\u662F\u5426\u6B63\u786E",console.log(N),[2,Promise.reject(new Error(N))])}})})},ct=function(e,t){return A(void 0,void 0,void 0,function(){var n;return w(this,function(r){switch(r.label){case 0:return[4,k(ut(e),{headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"},params:t})];case 1:return n=r.sent(),[2,(n==null?void 0:n.data)||{}]}})})},K=function(){try{return(top==null?void 0:top.document.querySelector("#mount-root"))||top.document.body}catch{return document.body}};function st(e){return e&&e.parentNode?e.parentNode:K()}var ne="gmsoft-ui-top-body-need-inject-css",re=function(e){top[ne]=e},vt=function(){return top[ne]===void 0&&re(!0),top[ne]},ft=X.createGlobalStyle(Me||(Me=O([`
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
`]))),gt=function(){m.useEffect(function(){return re(!1),function(){re(!0)}})},ht=function(){var e=m.useState(function(){return vt()})[0];return gt(),e?l.default.createElement(ft,null):null},Me,mt=K(),j=function(e){var t=e.children,n=e.width,r=e.getContainer,a=Z(e,["children","width","getContainer"]);return a.visible!==!0?null:l.default.createElement(X.StyleSheetManager,{target:mt},l.default.createElement(l.default.Fragment,null,l.default.createElement(ht,null),l.default.createElement(p.Modal,s({getContainer:r||K,width:n},a),l.default.createElement(p.ConfigProvider,{getPopupContainer:st},t))))},H=function(e){return function(t){return p.Modal[e](s({getContainer:K},t))}};j.info=H("info"),j.success=H("success"),j.error=H("error"),j.warning=H("warning"),j.confirm=H("confirm"),j.destroyAll=p.Modal.destroyAll;var q="ant",Q=function(){},pt=I.default(j)(Ae||(Ae=O([`
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
`])),q),Et=function(e,t,n){Q&&Q();var r=document.createElement("div");document.body.appendChild(r);var a=function(){return me.default.unmountComponentAtNode(r)};return Q=function(){t&&typeof t=="function"&&t(),a()},me.default.render(l.default.createElement(pt,{visible:!0,maskClosable:!0,closable:!1,footer:null,closeIcon:null,onCancel:Q,width:366},l.default.createElement("iframe",{title:"loginBox",className:"login-form-box",src:e,width:"360px",height:"440px",scrolling:"no",style:{margin:0,padding:0,display:"block"},frameBorder:"0"})),r),n&&(n.current=a),a},Ae,Mt="@@GLOBAL_CONTEXT/SET";function At(e,t){e&&e({type:Mt,payload:{me:t}})}var wt="__platDomain__",Ot=function(e){return e?e.findIndex(function(t){return String(t).endsWith("01")})!==-1:!1},we=function(e){var t,n,r,a,i,u,f,g,o,c,h,E;if(!(!e||Object.getOwnPropertyNames(e).length===0))return s({admin:Ot(e==null?void 0:e.roles),adminAreaId:(t=e==null?void 0:e.org)===null||t===void 0?void 0:t.areaId,adminAreaName:(n=e==null?void 0:e.org)===null||n===void 0?void 0:n.areaName,maintainPlatId:(r=e==null?void 0:e.additionalInformation)===null||r===void 0?void 0:r.mpi,orgId:(a=e==null?void 0:e.org)===null||a===void 0?void 0:a.orgId,orgName:(i=e==null?void 0:e.org)===null||i===void 0?void 0:i.orgName,orgType:(u=e==null?void 0:e.org)===null||u===void 0?void 0:u.orgType,userName:e==null?void 0:e.realName,userTypes:e!=null&&e.roles?e==null?void 0:e.roles.join(","):void 0,deptRole:(f=e==null?void 0:e.additionalInformation)===null||f===void 0?void 0:f.deptRole,isBidDown:(g=e==null?void 0:e.additionalInformation)===null||g===void 0?void 0:g.isBidDown,isSj:(o=e==null?void 0:e.additionalInformation)===null||o===void 0?void 0:o.isSj,orgClassNo:(c=e==null?void 0:e.additionalInformation)===null||c===void 0?void 0:c.orgClassNo,organClass:(h=e==null?void 0:e.additionalInformation)===null||h===void 0?void 0:h.organClass,userType:(E=e==null?void 0:e.additionalInformation)===null||E===void 0?void 0:E.userType},e)},R=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.dispatch;return A(void 0,void 0,void 0,function(){var i,u,f,g,o,c;return w(this,function(h){switch(h.label){case 0:return i=ee(n).host,u=r||i,[4,k(it(n),{params:(c={},c[wt]=u,c)})];case 1:return f=h.sent(),g=f.data,!g||Object.getOwnPropertyNames(g).length===0?[2,Promise.reject()]:(o=we(f.data),window.location.origin.includes(n)&&At(a,o),[2,o])}})})},Oe=function(e,t){return A(void 0,void 0,void 0,function(){var n,r;return w(this,function(a){switch(a.label){case 0:return[2,t+"/authing"];case 1:return n=a.sent(),[2,(r=n==null?void 0:n.data)===null||r===void 0?void 0:r.op]}})})},De=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,i=e.clientId,u=e.platId,f=e.dp,g=e.ui,o=e.registerNoHeader,c=e.title,h=e.djcGatewayBaseUrl,E=e.loginSuccessRedirectUri,_=e.limitOrgTypes,C=e.oauthState,P=e.onCancelLogin,T=e.closePopupRef,S=e.dispatch;return A(void 0,void 0,void 0,function(){var y,F,N,x,de,ce,$e,F,se,b,We,ve,fe,ge,he;return w(this,function(M){switch(M.label){case 0:y=r||a,M.label=1;case 1:return M.trys.push([1,3,,12]),[4,R({dispatch:S,origin:n,whoAmIHost:y})];case 2:return F=M.sent(),[2,F];case 3:return M.sent(),[4,te({origin:n,whoAmIHost:y,djcGatewayBaseUrl:h,clientId:i,platId:u,dp:f,ui:g,registerNoHeader:o,title:c,loginSuccessRedirectUri:E,limitOrgTypes:_,extraParams:C})];case 4:return N=M.sent(),[4,Oe(n,h)];case 5:x=M.sent(),M.label=6;case 6:return M.trys.push([6,10,,11]),[4,ct(x,{response_type:"code",client_id:N.client_id,redirect_uri:N.redirect_uri,scope:N.scope,options:N.options,state:JSON.stringify(N)})];case 7:return de=M.sent(),ce=de.location,$e=de.res,$e!==0?[3,9]:[4,R({dispatch:S,origin:n,whoAmIHost:y}).catch(function(){console.error("\u670D\u52A1\u5668\u9519\u8BEF, \u767B\u5F55\u6210\u529F, \u4F46\u83B7\u53D6\u767B\u5F55\u7528\u6237\u4FE1\u606F\u5931\u8D25!")})];case 8:return F=M.sent(),[2,F];case 9:return ce?[2,Et(ce,P,T)]:(console.log("login error, mode=popup, authorize not response location"),[3,11]);case 10:return se=M.sent(),b=se,We=((fe=(ve=b==null?void 0:b.response)===null||ve===void 0?void 0:ve.data)===null||fe===void 0?void 0:fe.error_message)||((he=(ge=b==null?void 0:b.response)===null||ge===void 0?void 0:ge.data)===null||he===void 0?void 0:he.message)||b.message||"\u670D\u52A1\u5668\u7AEF\u9519\u8BEF",console.error(We,se),[3,11];case 11:return[3,12];case 12:return[2]}})})},Dt=function(e){return e.then(function(t){return{value:t,status:"resolved"}},function(t){return{error:t,status:"rejected"}})},Nt=function(e,t){return t===void 0&&(t=5e3),new Promise(function(n,r){var a=new Image(0,0);a.onload=n,a.onerror=r,a.src=e,setTimeout(function(){r()},t)})},It=function(e){e===void 0&&(e=[]);var t=e.filter(function(n){return n}).map(function(n){return Nt(n)});return Promise.all(t.map(Dt))},yt=function(e,t,n){return A(void 0,void 0,void 0,function(){var r;return w(this,function(a){switch(a.label){case 0:return[4,k(e+"/logout",{method:"DELETE",params:{success_uri:t}})];case 1:return r=a.sent().data,n&&n.length>0?[4,It(n)]:[3,3];case 2:a.sent(),a.label=3;case 3:return window.open(r.location,"_top"),[2]}})})},Ne=function(e){var t=e.djcGatewayBaseUrl,n=e.logoutRedirectUrl,r=e.otherLogoutUrls,a=e.origin;return A(void 0,void 0,void 0,function(){var i;return w(this,function(u){switch(u.label){case 0:return[4,Oe(a,t)];case 1:return i=u.sent(),[4,yt(i,n,r)];case 2:return u.sent(),[2]}})})},Ie=function(e){var t=e.authPageOrigin,n=e.origin,r=e.ui,a=e.dp,i=e.djcGatewayBaseUrl,u=e.noHeader;return A(void 0,void 0,void 0,function(){var f,g,o;return w(this,function(c){switch(c.label){case 0:return f=t+"/register/select-type",g=null,[4,k(Ee(i),{params:{orgDomainName:n?ee(n).host:window.location.host}})];case 1:return o=c.sent().data,g=o==null?void 0:o.platformCode,window.open(""+f+L.default.stringify({ui:r,platId:g,dp:a,noHeader:u},{addQueryPrefix:!0,encode:!1}),"_blank"),[2]}})})},_t=function(e){return A(void 0,void 0,void 0,function(){var t;return w(this,function(n){switch(n.label){case 0:return[4,te(e)];case 1:return t=n.sent(),[2,L.default.stringify(t,{addQueryPrefix:!0})]}})})},ye="globalContext",ae=function(e){return e&&e[ye]?e[ye].me:void 0},_e=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,i=e.dispatch;return R({dispatch:i,origin:n,whoAmIHost:r||a})},Ce=function(e){return A(void 0,void 0,void 0,function(){var t,n=e.loginPage,r=Z(e,["loginPage"]);return w(this,function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,_e(r)];case 1:return t=a.sent(),[2,t];case 2:return a.sent(),window.open(n,"_top"),[3,3];case 3:return[2]}})})},U=l.default.createContext({authPageOrigin:"",djcGatewayBaseUrl:"",toCenterPage:function(){}}),Ct="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA0OCA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ4IDI0LjAyNjRDNDggMzcuMjY3MyAzNy4yNTQxIDQ4LjAwMzEgMjMuOTk3NSA0OC4wMDMxQzEwLjc0MjEgNDguMDAzMSAwIDM3LjI2NzMgMCAyNC4wMjY0QzAgMTMuODYzIDYuMzI2MDUgNS4xNzk4NyAxNS4yNjAyIDEuNjkwMzNDMTcuOTU5NiAwLjYwMTM3NiAyMC45MDg3IDAgMjMuOTk4MSAwQzI3LjA5MTMgMCAzMC4wMzc5IDAuNjAwNzY5IDMyLjczOTggMS42OTAzM0M0MS42NzM0IDUuMTc5ODcgNDggMTMuODYzIDQ4IDI0LjAyNjRaTTE0Ljc3MzMgMTguOTY5OUMxNC43NzMzIDIzLjAxMDUgMTYuODQzNiAyNi41MDg4IDE5Ljg1MzEgMjguMjIxMUMyMS4xMDEyIDI4LjkzMTQgMjIuNTA2NSAyOS4zNDA5IDIzLjk5NzUgMjkuMzQwOUMyNS40MzYxIDI5LjM0MDkgMjYuNzkyNSAyOC45NTc4IDI4LjAwNzkgMjguMjk2QzMxLjA4ODUgMjYuNjE2MyAzMy4yMjU1IDIzLjA3NTMgMzMuMjI1NSAxOC45NzA1QzMzLjIyNTUgMTMuMjU1MyAyOS4wODY4IDguNjAzMjggMjMuOTk3NSA4LjYwMzI4QzE4LjkxMTQgOC42MDI2NyAxNC43NzMzIDEzLjI1NDcgMTQuNzczMyAxOC45Njk5Wk0yNC4wOTUgNDYuNDQ5NEMzMS4xMDY3IDQ2LjQ0OTQgMzcuMzYxNiA0My4yMjQ3IDQxLjQ2MTMgMzguMTc4M0M0MC45NzcgMzQuMTk3NSAzNy4wOTggMzAuODA4NiAzMS42MDgxIDI5LjExODJDMjkuNTM0NyAzMC45ODM1IDI2Ljg4NTYgMzIuMTA1OCAyMy45OTY4IDMyLjEwNThDMjEuMDQzOSAzMi4xMDU4IDE4LjM0MDggMzAuOTIzMSAxNi4yNDcyIDI4Ljk3NjdDMTAuOTA2OSAzMC41MDA5IDYuOTk1MzIgMzMuNjA5OSA2LjA3ODE4IDM3LjMzNTNDMTAuMTQ2NCA0Mi44NjE3IDE2LjcwMzMgNDYuNDQ5NCAyNC4wOTUgNDYuNDQ5NFoiIGZpbGw9IiNDRUNGRTAiLz4KPC9zdmc+Cg==",Pe=function(e){var t=e.path,n=e.className,r=m.useContext(U).djcGatewayBaseUrl,a=m.useMemo(function(){return t?r+"/files?business=avatar&filePath="+t+"&fileName=file&attachment=false&contentType=image/png":Ct},[r,t]);return l.default.createElement(p.Avatar,{className:n,src:a})},V=function(e){return e.theme.textColorSecondary||"#697b8c"},Te=function(e){return e.theme.linkColorHover||"#1890ff"},Pt=I.default.a(be||(be=O([`
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
`])),V,V,V,V,Te,Te),Tt=function(){try{return window.top.location.href}catch{return window.location.href}},bt=function(){var e=m.useContext(U),t=e.logoutRedirectUrl,n=Z(e,["logoutRedirectUrl"]),r=m.useCallback(function(){return A(void 0,void 0,void 0,function(){return w(this,function(a){switch(a.label){case 0:return[4,Ne(s(s({},n),{logoutRedirectUrl:t||Tt()}))];case 1:return a.sent(),[2]}})})},[n,t]);return l.default.createElement(Pt,{onClick:r},l.default.createElement("span",null,"\u9000\u51FA"),l.default.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4393",width:"20",height:"20"},l.default.createElement("path",{d:"M593.92 838.513v-95.355a40.96 40.96 0 1 1 81.92 0v95.355c0 45.26-35.226 83.087-80.22 83.087H203.1c-44.994 0-80.22-37.827-80.22-83.087V185.487c0-45.26 35.226-83.087 80.22-83.087h392.52c44.994 0 80.22 37.827 80.22 83.087v193.946a40.96 40.96 0 1 1-81.92 0V185.487c0-1.024 0.061-1.147 0.901-1.167H203.9c0.84 0 0.901 0.164 0.901 1.167v653.026c0 1.024-0.061 1.147-0.901 1.167H594.82c-0.84 0-0.901-0.164-0.901-1.167z","p-id":"4394"}),l.default.createElement("path",{d:"M471.04 512h327.68q40.96 0 40.96 40.96t-40.96 40.96H471.04q-40.96 0-40.96-40.96T471.04 512z","p-id":"4395"}),l.default.createElement("path",{d:"M811.199 422.828L912.57 524.2q28.963 28.963 0 57.926t-57.926 0l-101.37-101.37q-28.964-28.964 0-57.927 28.962-28.963 57.925 0z","p-id":"4396"}),l.default.createElement("path",{d:"M753.273 625.575l101.37-101.37q28.964-28.964 57.927 0 28.963 28.962 0 57.925L811.2 683.501q-28.964 28.963-57.927 0t0-57.926z","p-id":"4397"})))},be,jt=p.Typography.Paragraph,St=I.default.div(Se||(Se=O([`
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
`])),q,q,q),Lt=I.default(Pe)(Le||(Le=O([`
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
`]))),je=I.default(jt).attrs({ellipsis:!0})(xe||(xe=O([`
  &&& {
    margin: 0;
  }
`],[`
  &&& {
    margin: 0;
  }
`]))),xt=I.default(je)(ze||(ze=O([`
  font-size: 16px;
  font-weight: 700;
`],[`
  font-size: 16px;
  font-weight: 700;
`]))),zt=function(e){var t,n,r,a=e.me,i=m.useContext(U).toCenterPage;return l.default.createElement(St,null,l.default.createElement(p.Menu,{mode:"vertical"},l.default.createElement(p.Menu.Item,{key:"avatar"},l.default.createElement(Lt,{path:(t=a.additionalInformation)===null||t===void 0?void 0:t.avatar})),l.default.createElement(p.Menu.Item,{key:"name"},a.realName&&l.default.createElement("a",{onClick:i},l.default.createElement(xt,null,a.realName)),((n=a.org)===null||n===void 0?void 0:n.orgName)&&l.default.createElement(je,null,(r=a.org)===null||r===void 0?void 0:r.orgName)),l.default.createElement(p.Menu.Divider,null),l.default.createElement(p.Menu.Item,{key:"logout"},l.default.createElement(bt,null))))},Se,Le,xe,ze,kt=I.default(Pe)(ke||(ke=O([`
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
`]))),Ht=p.Typography.Text,Rt=I.default(Ht)(He||(He=O([`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`],[`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`]))),Ut=function(e){var t,n=e.me;return l.default.createElement(p.Popover,{placement:"bottom",autoAdjustOverflow:!1,content:l.default.createElement(zt,{me:n})},l.default.createElement(kt,{path:(t=n.additionalInformation)===null||t===void 0?void 0:t.avatar}),l.default.createElement(Rt,{ellipsis:!0},n.realName))},ke,He,Ft=function(){var e=m.useContext(U),t=m.useCallback(function(){Ie(e)},[e]);return l.default.createElement("a",{className:"register",onClick:t},"\u6CE8\u518C")},Re=function(){return B.useSelector(ae)},Bt=function(){var e=Re(),t=B.useDispatch();return m.useEffect(function(){e||R({dispatch:t}).catch(function(){})},[e,t]),e},Yt=p.Typography.Text,Gt=I.default(Yt).attrs({type:"secondary"})(Ue||(Ue=O([`
  margin: 0 8px;
`],[`
  margin: 0 8px;
`]))),Ue,Fe=function(e){var t=e.className,n=e.children,r=Bt();return l.default.createElement(U.Provider,{value:e},l.default.createElement("div",{className:t},r?l.default.createElement(Ut,{me:r}):l.default.createElement(l.default.Fragment,null,n,l.default.createElement(Gt,null,"\u6216"),l.default.createElement(Ft,null))))},Be=function(e){var t=e.login;return l.default.createElement("a",{className:"login",onClick:t},"\u767B\u5F55")},Kt=function(e){var t=e.loginPage,n=B.useDispatch(),r=m.useCallback(function(){Ce(s(s({},e),{dispatch:n}))},[n,e]);return l.default.createElement(Fe,s({},e,{logoutRedirectUrl:t}),l.default.createElement(Be,{login:r}))},qt=function(e){var t=B.useDispatch(),n=m.useCallback(function(){De(s(s({},e),{dispatch:t}))},[t,e]);return l.default.createElement(Fe,s({},e),l.default.createElement(Be,{login:n}))},v;(function(e){e[e.PLATFORM=1]="PLATFORM",e[e.APPROVAL=2]="APPROVAL",e[e.STOCK=3]="STOCK",e[e.AGENT=4]="AGENT",e[e.PROVIDER=5]="PROVIDER",e[e.FINANCE=7]="FINANCE",e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(v||(v={}));var Qt=v,D=function(e){switch(e){case v.PLATFORM:return"platform";case v.APPROVAL:return"approval";case v.STOCK:return"stock";case v.AGENT:return"agent";case v.PROVIDER:return"provider";case v.FINANCE:return"finance";case v.EMPLOYEE:return"employee";case v.EXPERT:return"expert";case v.TEACHER:return"teacher";default:return""}},Vt=[{label:"\u5E73\u53F0\u8FD0\u8425",value:v.PLATFORM},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:v.APPROVAL},{label:"\u91C7\u8D2D\u5355\u4F4D",value:v.STOCK},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:v.AGENT},{label:"\u4F9B\u5E94\u5546",value:v.PROVIDER},{label:"\u91D1\u878D\u673A\u6784",value:v.FINANCE},{label:"\u5355\u4F4D\u6210\u5458",value:v.EMPLOYEE},{label:"\u4E13\u5BB6",value:v.EXPERT},{label:"\u6559\u5E08",value:v.TEACHER}],$t=[{label:"\u5E73\u53F0\u8FD0\u8425",value:D(v.PLATFORM).toUpperCase()},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:D(v.APPROVAL).toUpperCase()},{label:"\u91C7\u8D2D\u5355\u4F4D",value:D(v.STOCK).toUpperCase()},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:D(v.AGENT).toUpperCase()},{label:"\u4F9B\u5E94\u5546",value:D(v.PROVIDER).toUpperCase()},{label:"\u91D1\u878D\u673A\u6784",value:D(v.FINANCE).toUpperCase()},{label:"\u5355\u4F4D\u6210\u5458",value:D(v.EMPLOYEE).toUpperCase()},{label:"\u4E13\u5BB6",value:D(v.EXPERT).toUpperCase()},{label:"\u6559\u5E08",value:D(v.TEACHER).toUpperCase()}],ie;(function(e){e[e.ORG_ADMIN=101]="ORG_ADMIN",e[e.ORG_CHIEF=151]="ORG_CHIEF",e[e.SYS_RIGHT=102]="SYS_RIGHT",e[e.SYS_DUTY_MONITOR=104]="SYS_DUTY_MONITOR",e[e.SYS_DUTY=105]="SYS_DUTY",e[e.SYS_COM_ADMIN=107]="SYS_COM_ADMIN",e[e.SYS_GMSOFT_ADMIN=108]="SYS_GMSOFT_ADMIN",e[e.APPROVAL_ADMIN=201]="APPROVAL_ADMIN",e[e.APPROVAL_OPER=202]="APPROVAL_OPER",e[e.APPROVAL_LEADER=203]="APPROVAL_LEADER",e[e.STOCK_ADMIN=301]="STOCK_ADMIN",e[e.STOCK_OPER=302]="STOCK_OPER",e[e.STOCK_LEADER=303]="STOCK_LEADER",e[e.STOCK_FIN=304]="STOCK_FIN",e[e.AGENT_ADMIN=401]="AGENT_ADMIN",e[e.AGENT_OPER=402]="AGENT_OPER",e[e.AGENT_LEADER=403]="AGENT_LEADER",e[e.PROVIDER_ADMIN=501]="PROVIDER_ADMIN",e[e.PROVIDER_OPER=502]="PROVIDER_OPER",e[e.FINANC_ADMIN=701]="FINANC_ADMIN",e[e.FINANC_OPER=702]="FINANC_OPER"})(ie||(ie={}));var Wt=ie,oe;(function(e){e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(oe||(oe={}));var Xt=oe,ue;(function(e){e.DJC="DJC",e.XCJ="XCJ",e.ZCJ="ZCJ",e.PM="PM",e.ZRTD="ZRTD"})(ue||(ue={}));var Zt=ue,$="__token__",W="__token_param_key__",Ye="__token__",Jt=function(e,t){var n;try{e&&t&&(window[W]=e,window[$]=t,window.history.replaceState(s(s({},window.history.state),(n={},n[W]=e,n[$]=t,n)),""))}catch{}},Ge=function(){try{return window[W]||window.history.state[W]||Ye}catch{return Ye}},Ke=function(){try{return window[$]||window.history.state[$]}catch{return null}},le=function(e){var t=L.default.parse(window.location.search,{ignoreQueryPrefix:!0})||{},n=e||Ge(),r=t[n]||Ke();return Jt(n,r),r},qe=function(){var e,t=Ge(),n=Ke();return n?(e={},e[t]=n,e):null},Qe=function(e){le(e)},en=function(e){var t=e.url,n=e.target,r=n===void 0?"_self":n,a=e.extraParams,i=e.qsStringifyOptions,u=qe();if(u){var f=t.split("?"),g=f[0],o=f[1],c=L.default.stringify(s(s(s({},L.default.parse(o)),a),u),s({arrayFormat:"repeat",allowDots:!0},i)),h=[g,c].join("?");window.open(h,r)}},tn="Authorization",Ve=function(e,t){var n,r=e.tokenParamKey,a=e.authHeaderKey;t===void 0&&(t={});var i=le(r);if(i){var u=s(s({},t.headers),(n={},n[a||tn]=i,n));return s(s({},t),{headers:u})}return t};function nn(e){return Qe(e.tokenParamKey),function(t){return Ve(e,t)}}function rn(e){return Qe(e.tokenParamKey),window.angular.module("HTInterceptor",[]).factory("HTInterceptor",function(){return{request:function(t){return Ve(e,t)}}}).config(["$httpProvider",function(n){n.interceptors.push("HTInterceptor")}]),"HTInterceptor"}d.LoginByPageOrRegister=Kt,d.LoginByPopupOrRegister=qt,d.OrgIdentityStringOptions=$t,d.OrgIdentityType=Qt,d.OrgIdentityTypeOptions=Vt,d.RoleType=Wt,d.UIType=Zt,d.UserIdentity=Xt,d.angularHTInterceptor=rn,d.angularTokenInterceptor=nt,d.axiosHTInterceptor=nn,d.axiosTokenInterceptor=Y,d.buildLoginParams=te,d.buildLoginQueryString=_t,d.compatibilityMe=we,d.getOrgIdentityString=D,d.getToken=J,d.getTokenLegacy=le,d.getTokenWithKey=qe,d.jumpWithToken=en,d.loginByPage=Ce,d.loginByPopup=De,d.logout=Ne,d.meSelector=ae,d.meSeletor=ae,d.register=Ie,d.requestMe=R,d.requestMeTrySSO=_e,d.updateSelfTokenInterceptor=at,d.urlWithToken=rt,d.useMe=Re,Object.defineProperties(d,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=auth-sdk.umd.js.map
