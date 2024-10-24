(function(d,m){typeof exports=="object"&&typeof module!="undefined"?m(exports,require("react"),require("react-redux"),require("axios"),require("qs"),require("react-dom"),require("styled-components"),require("antd")):typeof define=="function"&&define.amd?define(["exports","react","react-redux","axios","qs","react-dom","styled-components","antd"],m):(d=typeof globalThis!="undefined"?globalThis:d||self,m(d.AuthSDK={},d.React,d.ReactRedux,d.axios,d.Qs,d.ReactDOM,d.styled,d.antd))})(this,function(d,m,B,Xe,Ze,Je,Z,p){"use strict";function k(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var l=k(m),et=k(Xe),L=k(Ze),me=k(Je),I=k(Z);/*! *****************************************************************************
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
    ***************************************************************************** */var s=function(){return s=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},s.apply(this,arguments)};function J(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function A(e,t,n,r){function a(o){return o instanceof n?o:new n(function(u){u(o)})}return new(n||(n=Promise))(function(o,u){function f(c){try{i(r.next(c))}catch(h){u(h)}}function g(c){try{i(r.throw(c))}catch(h){u(h)}}function i(c){c.done?o(c.value):a(c.value).then(f,g)}i((r=r.apply(e,t||[])).next())})}function w(e,t){var n={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},r,a,o,u;return u={next:f(0),throw:f(1),return:f(2)},typeof Symbol=="function"&&(u[Symbol.iterator]=function(){return this}),u;function f(i){return function(c){return g([i,c])}}function g(i){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,a&&(o=i[0]&2?a.return:i[0]?a.throw||((o=a.return)&&o.call(a),0):a.next)&&!(o=o.call(a,i[1])).done)return o;switch(a=0,o&&(i=[i[0]&2,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return n.label++,{value:i[1],done:!1};case 5:n.label++,a=i[1],i=[0];continue;case 7:i=n.ops.pop(),n.trys.pop();continue;default:if(o=n.trys,!(o=o.length>0&&o[o.length-1])&&(i[0]===6||i[0]===2)){n=0;continue}if(i[0]===3&&(!o||i[1]>o[0]&&i[1]<o[3])){n.label=i[1];break}if(i[0]===6&&n.label<o[1]){n.label=o[1],o=i;break}if(o&&n.label<o[2]){n.label=o[2],n.ops.push(i);break}o[2]&&n.ops.pop(),n.trys.pop();continue}i=t.call(e,n)}catch(c){i=[6,c],a=0}finally{r=o=0}if(i[0]&5)throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}}function O(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var ee=function(e,t){e===void 0&&(e="Auth"),t===void 0&&(t="Auth");try{if(document.cookie&&document.cookie.length>0){var n=document.cookie.split(/\s*;\s*/);if(n&&n.length>0){var r=n.find(function(o){return o.startsWith(e)}),a=r?r.split("=")[1]:null;return a&&t?t+" "+a:a}}return null}catch{return null}},tt=function(e){var t=e===void 0?{}:e,n=t.platDomain,r=n===void 0?window.location.host:n,a=t.platDomainKey,o=a===void 0?"__platDomain__":a,u=t.notSetPlatDomain,f=u===void 0?!1:u,g=t.authCookieKey,i=g===void 0?"Auth":g,c=t.authHeaderKey,h=c===void 0?"Authorization":c,E=t.authScheme,_=E===void 0?"Auth":E,P=t.notSetAuthHeader,C=P===void 0?!1:P;return{platDomain:r,platDomainKey:o,notSetPlatDomain:f,authCookieKey:i,authHeaderKey:h,authScheme:_,notSetAuthHeader:C}},Y=function(e){return function(t){var n,r,a,o,u=tt(e),f=u.platDomain,g=u.platDomainKey,i=u.notSetPlatDomain,c=u.authCookieKey,h=u.authHeaderKey,E=u.authScheme,_=u.notSetAuthHeader,P=i||!f||t.params&&t.params[g]||((a=t==null?void 0:t.url)===null||a===void 0?void 0:a.indexOf(g+"="))!==-1?t.params:s(s({},t.params),(n={},n[g]=f,n)),C=ee(c,E),T=_||!C||((o=t==null?void 0:t.headers)===null||o===void 0?void 0:o[h])?t.headers:s(s({},t.headers),(r={},r[h]=C,r));return s(s({},t),{params:P,headers:T})}},nt=function(e){var t="tokenInterceptor";return window.angular&&window.angular.module(t,[]).factory(t,function(){return{request:function(n){return n.url.indexOf(".tpl")!==-1&&(n.withCredentials=!1),n.url.indexOf(".html")===-1?Y(e)(n):n}}}).config(["$httpProvider",function(r){r.interceptors.push(t)}]),t},rt=function(e,t,n){t===void 0&&(t="__auth__"),n===void 0&&(n="Auth");var r=ee(n,"");return r?""+e+(e.indexOf("?")!==-1?"&":"?")+t+"="+r:e},G=et.default.create({withCredentials:!0,paramsSerializer:function(e){return L.default.stringify(e,{arrayFormat:"repeat",allowDots:!0})}}),pe=G.interceptors.request.use(Y()),at=function(e){G.interceptors.request.eject(pe),pe=G.interceptors.request.use(Y(e))},x=function(e,t){return G(s({url:e},t))};function K(e){if(!e)return{};var t=e.startsWith("//")?""+window.location.protocol+e:e,n={},r=["href","origin","protocol","host","hostname","port","pathname","search","hash"],a=/(([^:]+:)\/\/(([^:/?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/,o=a.exec(t);if(o)for(var u=r.length-1;u>=0;--u)n[r[u]]=o[u]?o[u]:"";return n}var ot=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/user?requireAvatar=true"},it=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/login"},ut=function(e){e===void 0&&(e=window.location.origin);var t=K(e).host;return e+"/gateway/v1/op?host="+encodeURIComponent(t)},lt=function(e){return e+"/oauth/authorize"},Ee=function(e){return e+"/djcsupport/domainname/getPlatformConfigure"},dt=function(e,t,n){return n||(t?e+"@"+t:"plat@"+e)},ct=function(e,t){return t||(e||window.location.origin)+"/login-app/login-success/index.html"},te=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,o=e.djcGatewayBaseUrl,u=e.platId,f=e.dp,g=e.ui,i=e.registerNoHeader,c=e.title,h=e.clientId,E=e.loginSuccessRedirectUri,_=e.limitOrgTypes,P=e.errorMessage,C=e.extraParams;return A(void 0,void 0,void 0,function(){var T,S,y,N;return w(this,function(z){switch(z.label){case 0:return T=K(n).host,S=u,u?[3,2]:[4,x(Ee(o),{params:{orgDomainName:T}})];case 1:y=z.sent().data,S=y==null?void 0:y.platformCode,z.label=2;case 2:return S?[2,s(s({},C),{ui:g,register_no_header:i,title:c,origin:n,client_id:dt(S,f,h),scope:r||a||T,login_sucess_redirect_uri:ct(n,E),redirect_uri:it(n),is_fpa:!0,error_message:P,options:_&&{limitOrgTypes:_}})]:(N="\u672A\u67E5\u8BE2\u5230 "+T+" \u5BF9\u5E94\u7684\u5E73\u53F0\u4FE1\u606F, \u8BF7\u68C0\u67E5\u5E73\u53F0\u914D\u7F6E\u662F\u5426\u6B63\u786E",console.log(N),[2,Promise.reject(new Error(N))])}})})},st=function(e,t){return A(void 0,void 0,void 0,function(){var n;return w(this,function(r){switch(r.label){case 0:return[4,x(lt(e),{headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"},params:t})];case 1:return n=r.sent(),[2,(n==null?void 0:n.data)||{}]}})})},q=function(){try{return(top==null?void 0:top.document.querySelector("#mount-root"))||top.document.body}catch{return document.body}};function vt(e){return e&&e.parentNode?e.parentNode:q()}var ne="gmsoft-ui-top-body-need-inject-css",re=function(e){top[ne]=e},ft=function(){return top[ne]===void 0&&re(!0),top[ne]},gt=Z.createGlobalStyle(Me||(Me=O([`
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
`]))),ht=function(){m.useEffect(function(){return re(!1),function(){re(!0)}})},mt=function(){var e=m.useState(function(){return ft()})[0];return ht(),e?l.default.createElement(gt,null):null},Me,pt=q(),j=function(e){var t=e.children,n=e.width,r=e.getContainer,a=J(e,["children","width","getContainer"]);return a.visible!==!0?null:l.default.createElement(Z.StyleSheetManager,{target:pt},l.default.createElement(l.default.Fragment,null,l.default.createElement(mt,null),l.default.createElement(p.Modal,s({getContainer:r||q,width:n},a),l.default.createElement(p.ConfigProvider,{getPopupContainer:vt},t))))},H=function(e){return function(t){return p.Modal[e](s({getContainer:q},t))}};j.info=H("info"),j.success=H("success"),j.error=H("error"),j.warning=H("warning"),j.confirm=H("confirm"),j.destroyAll=p.Modal.destroyAll;var Q="ant",V=function(){},Et=I.default(j)(Ae||(Ae=O([`
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
`])),Q),Mt=function(e,t,n){V&&V();var r=document.createElement("div");document.body.appendChild(r);var a=function(){return me.default.unmountComponentAtNode(r)};return V=function(){t&&typeof t=="function"&&t(),a()},me.default.render(l.default.createElement(Et,{visible:!0,maskClosable:!0,closable:!1,footer:null,closeIcon:null,onCancel:V,width:366},l.default.createElement("iframe",{title:"loginBox",className:"login-form-box",src:e,width:"360px",height:"440px",scrolling:"no",style:{margin:0,padding:0,display:"block"},frameBorder:"0"})),r),n&&(n.current=a),a},Ae,At="@@GLOBAL_CONTEXT/SET";function wt(e,t){e&&e({type:At,payload:{me:t}})}var Ot="__platDomain__",Dt=function(e){return e?e.findIndex(function(t){return String(t).endsWith("01")})!==-1:!1},we=function(e){var t,n,r,a,o,u,f,g,i,c,h,E;if(!(!e||Object.getOwnPropertyNames(e).length===0))return s({admin:Dt(e==null?void 0:e.roles),adminAreaId:(t=e==null?void 0:e.org)===null||t===void 0?void 0:t.areaId,adminAreaName:(n=e==null?void 0:e.org)===null||n===void 0?void 0:n.areaName,maintainPlatId:(r=e==null?void 0:e.additionalInformation)===null||r===void 0?void 0:r.mpi,orgId:(a=e==null?void 0:e.org)===null||a===void 0?void 0:a.orgId,orgName:(o=e==null?void 0:e.org)===null||o===void 0?void 0:o.orgName,orgType:(u=e==null?void 0:e.org)===null||u===void 0?void 0:u.orgType,userName:e==null?void 0:e.realName,userTypes:e!=null&&e.roles?e==null?void 0:e.roles.join(","):void 0,deptRole:(f=e==null?void 0:e.additionalInformation)===null||f===void 0?void 0:f.deptRole,isBidDown:(g=e==null?void 0:e.additionalInformation)===null||g===void 0?void 0:g.isBidDown,isSj:(i=e==null?void 0:e.additionalInformation)===null||i===void 0?void 0:i.isSj,orgClassNo:(c=e==null?void 0:e.additionalInformation)===null||c===void 0?void 0:c.orgClassNo,organClass:(h=e==null?void 0:e.additionalInformation)===null||h===void 0?void 0:h.organClass,userType:(E=e==null?void 0:e.additionalInformation)===null||E===void 0?void 0:E.userType},e)},R=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.dispatch;return A(void 0,void 0,void 0,function(){var o,u,f,g,i,c;return w(this,function(h){switch(h.label){case 0:return o=K(n).host,u=r||o,[4,x(ot(n),{params:(c={},c[Ot]=u,c)})];case 1:return f=h.sent(),g=f.data,!g||Object.getOwnPropertyNames(g).length===0?[2,Promise.reject()]:(i=we(f.data),window.location.origin.includes(n)&&wt(a,i),[2,i])}})})},Oe=function(e,t){return e===void 0&&(e=window.location.origin),A(void 0,void 0,void 0,function(){var n,r;return w(this,function(a){switch(a.label){case 0:return{}.VITE_DEPLOY==="PM"?[2,t+"/authing"]:[4,x(ut(e))];case 1:return n=a.sent(),[2,(r=n==null?void 0:n.data)===null||r===void 0?void 0:r.op]}})})},De=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,o=e.clientId,u=e.platId,f=e.dp,g=e.ui,i=e.registerNoHeader,c=e.title,h=e.djcGatewayBaseUrl,E=e.loginSuccessRedirectUri,_=e.limitOrgTypes,P=e.oauthState,C=e.onCancelLogin,T=e.closePopupRef,S=e.dispatch;return A(void 0,void 0,void 0,function(){var y,F,N,z,de,ce,$e,F,se,b,We,ve,fe,ge,he;return w(this,function(M){switch(M.label){case 0:y=r||a,M.label=1;case 1:return M.trys.push([1,3,,12]),[4,R({dispatch:S,origin:n,whoAmIHost:y})];case 2:return F=M.sent(),[2,F];case 3:return M.sent(),[4,te({origin:n,whoAmIHost:y,djcGatewayBaseUrl:h,clientId:o,platId:u,dp:f,ui:g,registerNoHeader:i,title:c,loginSuccessRedirectUri:E,limitOrgTypes:_,extraParams:P})];case 4:return N=M.sent(),[4,Oe(n,h)];case 5:z=M.sent(),M.label=6;case 6:return M.trys.push([6,10,,11]),[4,st(z,{response_type:"code",client_id:N.client_id,redirect_uri:N.redirect_uri,scope:N.scope,options:N.options,state:JSON.stringify(N)})];case 7:return de=M.sent(),ce=de.location,$e=de.res,$e!==0?[3,9]:[4,R({dispatch:S,origin:n,whoAmIHost:y}).catch(function(){console.error("\u670D\u52A1\u5668\u9519\u8BEF, \u767B\u5F55\u6210\u529F, \u4F46\u83B7\u53D6\u767B\u5F55\u7528\u6237\u4FE1\u606F\u5931\u8D25!")})];case 8:return F=M.sent(),[2,F];case 9:return ce?[2,Mt(ce,C,T)]:(console.log("login error, mode=popup, authorize not response location"),[3,11]);case 10:return se=M.sent(),b=se,We=((fe=(ve=b==null?void 0:b.response)===null||ve===void 0?void 0:ve.data)===null||fe===void 0?void 0:fe.error_message)||((he=(ge=b==null?void 0:b.response)===null||ge===void 0?void 0:ge.data)===null||he===void 0?void 0:he.message)||b.message||"\u670D\u52A1\u5668\u7AEF\u9519\u8BEF",console.error(We,se),[3,11];case 11:return[3,12];case 12:return[2]}})})},Nt=function(e){return e.then(function(t){return{value:t,status:"resolved"}},function(t){return{error:t,status:"rejected"}})},It=function(e,t){return t===void 0&&(t=5e3),new Promise(function(n,r){var a=new Image(0,0);a.onload=n,a.onerror=r,a.src=e,setTimeout(function(){r()},t)})},yt=function(e){e===void 0&&(e=[]);var t=e.filter(function(n){return n}).map(function(n){return It(n)});return Promise.all(t.map(Nt))},_t=function(e,t,n){return A(void 0,void 0,void 0,function(){var r;return w(this,function(a){switch(a.label){case 0:return[4,x(e+"/logout",{method:"DELETE",params:{success_uri:t}})];case 1:return r=a.sent().data,n&&n.length>0?[4,yt(n)]:[3,3];case 2:a.sent(),a.label=3;case 3:return window.open(r.location,"_top"),[2]}})})},Ne=function(e){var t=e.djcGatewayBaseUrl,n=e.logoutRedirectUrl,r=e.otherLogoutUrls,a=e.origin;return A(void 0,void 0,void 0,function(){var o;return w(this,function(u){switch(u.label){case 0:return[4,Oe(a,t)];case 1:return o=u.sent(),[4,_t(o,n,r)];case 2:return u.sent(),[2]}})})},Ie=function(e){var t=e.authPageOrigin,n=e.origin,r=e.ui,a=e.dp,o=e.djcGatewayBaseUrl,u=e.noHeader;return A(void 0,void 0,void 0,function(){var f,g,i;return w(this,function(c){switch(c.label){case 0:return f=t+"/register/select-type",g=null,[4,x(Ee(o),{params:{orgDomainName:n?K(n).host:window.location.host}})];case 1:return i=c.sent().data,g=i==null?void 0:i.platformCode,window.open(""+f+L.default.stringify({ui:r,platId:g,dp:a,noHeader:u},{addQueryPrefix:!0,encode:!1}),"_blank"),[2]}})})},Pt=function(e){return A(void 0,void 0,void 0,function(){var t;return w(this,function(n){switch(n.label){case 0:return[4,te(e)];case 1:return t=n.sent(),[2,L.default.stringify(t,{addQueryPrefix:!0})]}})})},ye="globalContext",ae=function(e){return e&&e[ye]?e[ye].me:void 0},_e=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,o=e.dispatch;return R({dispatch:o,origin:n,whoAmIHost:r||a})},Pe=function(e){return A(void 0,void 0,void 0,function(){var t,n=e.loginPage,r=J(e,["loginPage"]);return w(this,function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,_e(r)];case 1:return t=a.sent(),[2,t];case 2:return a.sent(),window.open(n,"_top"),[3,3];case 3:return[2]}})})},U=l.default.createContext({authPageOrigin:"",djcGatewayBaseUrl:"",toCenterPage:function(){}}),Ct="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA0OCA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ4IDI0LjAyNjRDNDggMzcuMjY3MyAzNy4yNTQxIDQ4LjAwMzEgMjMuOTk3NSA0OC4wMDMxQzEwLjc0MjEgNDguMDAzMSAwIDM3LjI2NzMgMCAyNC4wMjY0QzAgMTMuODYzIDYuMzI2MDUgNS4xNzk4NyAxNS4yNjAyIDEuNjkwMzNDMTcuOTU5NiAwLjYwMTM3NiAyMC45MDg3IDAgMjMuOTk4MSAwQzI3LjA5MTMgMCAzMC4wMzc5IDAuNjAwNzY5IDMyLjczOTggMS42OTAzM0M0MS42NzM0IDUuMTc5ODcgNDggMTMuODYzIDQ4IDI0LjAyNjRaTTE0Ljc3MzMgMTguOTY5OUMxNC43NzMzIDIzLjAxMDUgMTYuODQzNiAyNi41MDg4IDE5Ljg1MzEgMjguMjIxMUMyMS4xMDEyIDI4LjkzMTQgMjIuNTA2NSAyOS4zNDA5IDIzLjk5NzUgMjkuMzQwOUMyNS40MzYxIDI5LjM0MDkgMjYuNzkyNSAyOC45NTc4IDI4LjAwNzkgMjguMjk2QzMxLjA4ODUgMjYuNjE2MyAzMy4yMjU1IDIzLjA3NTMgMzMuMjI1NSAxOC45NzA1QzMzLjIyNTUgMTMuMjU1MyAyOS4wODY4IDguNjAzMjggMjMuOTk3NSA4LjYwMzI4QzE4LjkxMTQgOC42MDI2NyAxNC43NzMzIDEzLjI1NDcgMTQuNzczMyAxOC45Njk5Wk0yNC4wOTUgNDYuNDQ5NEMzMS4xMDY3IDQ2LjQ0OTQgMzcuMzYxNiA0My4yMjQ3IDQxLjQ2MTMgMzguMTc4M0M0MC45NzcgMzQuMTk3NSAzNy4wOTggMzAuODA4NiAzMS42MDgxIDI5LjExODJDMjkuNTM0NyAzMC45ODM1IDI2Ljg4NTYgMzIuMTA1OCAyMy45OTY4IDMyLjEwNThDMjEuMDQzOSAzMi4xMDU4IDE4LjM0MDggMzAuOTIzMSAxNi4yNDcyIDI4Ljk3NjdDMTAuOTA2OSAzMC41MDA5IDYuOTk1MzIgMzMuNjA5OSA2LjA3ODE4IDM3LjMzNTNDMTAuMTQ2NCA0Mi44NjE3IDE2LjcwMzMgNDYuNDQ5NCAyNC4wOTUgNDYuNDQ5NFoiIGZpbGw9IiNDRUNGRTAiLz4KPC9zdmc+Cg==",Ce=function(e){var t=e.path,n=e.className,r=m.useContext(U).djcGatewayBaseUrl,a=m.useMemo(function(){return t?r+"/files?business=avatar&filePath="+t+"&fileName=file&attachment=false&contentType=image/png":Ct},[r,t]);return l.default.createElement(p.Avatar,{className:n,src:a})},$=function(e){return e.theme.textColorSecondary||"#697b8c"},Te=function(e){return e.theme.linkColorHover||"#1890ff"},Tt=I.default.a(be||(be=O([`
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
`])),$,$,$,$,Te,Te),bt=function(){try{return window.top.location.href}catch{return window.location.href}},jt=function(){var e=m.useContext(U),t=e.logoutRedirectUrl,n=J(e,["logoutRedirectUrl"]),r=m.useCallback(function(){return A(void 0,void 0,void 0,function(){return w(this,function(a){switch(a.label){case 0:return[4,Ne(s(s({},n),{logoutRedirectUrl:t||bt()}))];case 1:return a.sent(),[2]}})})},[n,t]);return l.default.createElement(Tt,{onClick:r},l.default.createElement("span",null,"\u9000\u51FA"),l.default.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4393",width:"20",height:"20"},l.default.createElement("path",{d:"M593.92 838.513v-95.355a40.96 40.96 0 1 1 81.92 0v95.355c0 45.26-35.226 83.087-80.22 83.087H203.1c-44.994 0-80.22-37.827-80.22-83.087V185.487c0-45.26 35.226-83.087 80.22-83.087h392.52c44.994 0 80.22 37.827 80.22 83.087v193.946a40.96 40.96 0 1 1-81.92 0V185.487c0-1.024 0.061-1.147 0.901-1.167H203.9c0.84 0 0.901 0.164 0.901 1.167v653.026c0 1.024-0.061 1.147-0.901 1.167H594.82c-0.84 0-0.901-0.164-0.901-1.167z","p-id":"4394"}),l.default.createElement("path",{d:"M471.04 512h327.68q40.96 0 40.96 40.96t-40.96 40.96H471.04q-40.96 0-40.96-40.96T471.04 512z","p-id":"4395"}),l.default.createElement("path",{d:"M811.199 422.828L912.57 524.2q28.963 28.963 0 57.926t-57.926 0l-101.37-101.37q-28.964-28.964 0-57.927 28.962-28.963 57.925 0z","p-id":"4396"}),l.default.createElement("path",{d:"M753.273 625.575l101.37-101.37q28.964-28.964 57.927 0 28.963 28.962 0 57.925L811.2 683.501q-28.964 28.963-57.927 0t0-57.926z","p-id":"4397"})))},be,St=p.Typography.Paragraph,Lt=I.default.div(Se||(Se=O([`
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
`])),Q,Q,Q),xt=I.default(Ce)(Le||(Le=O([`
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
`]))),je=I.default(St).attrs({ellipsis:!0})(xe||(xe=O([`
  &&& {
    margin: 0;
  }
`],[`
  &&& {
    margin: 0;
  }
`]))),zt=I.default(je)(ze||(ze=O([`
  font-size: 16px;
  font-weight: 700;
`],[`
  font-size: 16px;
  font-weight: 700;
`]))),kt=function(e){var t,n,r,a=e.me,o=m.useContext(U).toCenterPage;return l.default.createElement(Lt,null,l.default.createElement(p.Menu,{mode:"vertical"},l.default.createElement(p.Menu.Item,{key:"avatar"},l.default.createElement(xt,{path:(t=a.additionalInformation)===null||t===void 0?void 0:t.avatar})),l.default.createElement(p.Menu.Item,{key:"name"},a.realName&&l.default.createElement("a",{onClick:o},l.default.createElement(zt,null,a.realName)),((n=a.org)===null||n===void 0?void 0:n.orgName)&&l.default.createElement(je,null,(r=a.org)===null||r===void 0?void 0:r.orgName)),l.default.createElement(p.Menu.Divider,null),l.default.createElement(p.Menu.Item,{key:"logout"},l.default.createElement(jt,null))))},Se,Le,xe,ze,Ht=I.default(Ce)(ke||(ke=O([`
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
`]))),Rt=p.Typography.Text,Ut=I.default(Rt)(He||(He=O([`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`],[`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`]))),Ft=function(e){var t,n=e.me;return l.default.createElement(p.Popover,{placement:"bottom",autoAdjustOverflow:!1,content:l.default.createElement(kt,{me:n})},l.default.createElement(Ht,{path:(t=n.additionalInformation)===null||t===void 0?void 0:t.avatar}),l.default.createElement(Ut,{ellipsis:!0},n.realName))},ke,He,Bt=function(){var e=m.useContext(U),t=m.useCallback(function(){Ie(e)},[e]);return l.default.createElement("a",{className:"register",onClick:t},"\u6CE8\u518C")},Re=function(){return B.useSelector(ae)},Yt=function(){var e=Re(),t=B.useDispatch();return m.useEffect(function(){e||R({dispatch:t}).catch(function(){})},[e,t]),e},Gt=p.Typography.Text,Kt=I.default(Gt).attrs({type:"secondary"})(Ue||(Ue=O([`
  margin: 0 8px;
`],[`
  margin: 0 8px;
`]))),Ue,Fe=function(e){var t=e.className,n=e.children,r=Yt();return l.default.createElement(U.Provider,{value:e},l.default.createElement("div",{className:t},r?l.default.createElement(Ft,{me:r}):l.default.createElement(l.default.Fragment,null,n,l.default.createElement(Kt,null,"\u6216"),l.default.createElement(Bt,null))))},Be=function(e){var t=e.login;return l.default.createElement("a",{className:"login",onClick:t},"\u767B\u5F55")},qt=function(e){var t=e.loginPage,n=B.useDispatch(),r=m.useCallback(function(){Pe(s(s({},e),{dispatch:n}))},[n,e]);return l.default.createElement(Fe,s({},e,{logoutRedirectUrl:t}),l.default.createElement(Be,{login:r}))},Qt=function(e){var t=B.useDispatch(),n=m.useCallback(function(){De(s(s({},e),{dispatch:t}))},[t,e]);return l.default.createElement(Fe,s({},e),l.default.createElement(Be,{login:n}))},v;(function(e){e[e.PLATFORM=1]="PLATFORM",e[e.APPROVAL=2]="APPROVAL",e[e.STOCK=3]="STOCK",e[e.AGENT=4]="AGENT",e[e.PROVIDER=5]="PROVIDER",e[e.FINANCE=7]="FINANCE",e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(v||(v={}));var Vt=v,D=function(e){switch(e){case v.PLATFORM:return"platform";case v.APPROVAL:return"approval";case v.STOCK:return"stock";case v.AGENT:return"agent";case v.PROVIDER:return"provider";case v.FINANCE:return"finance";case v.EMPLOYEE:return"employee";case v.EXPERT:return"expert";case v.TEACHER:return"teacher";default:return""}},$t=[{label:"\u5E73\u53F0\u8FD0\u8425",value:v.PLATFORM},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:v.APPROVAL},{label:"\u91C7\u8D2D\u5355\u4F4D",value:v.STOCK},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:v.AGENT},{label:"\u4F9B\u5E94\u5546",value:v.PROVIDER},{label:"\u91D1\u878D\u673A\u6784",value:v.FINANCE},{label:"\u5355\u4F4D\u6210\u5458",value:v.EMPLOYEE},{label:"\u4E13\u5BB6",value:v.EXPERT},{label:"\u6559\u5E08",value:v.TEACHER}],Wt=[{label:"\u5E73\u53F0\u8FD0\u8425",value:D(v.PLATFORM).toUpperCase()},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:D(v.APPROVAL).toUpperCase()},{label:"\u91C7\u8D2D\u5355\u4F4D",value:D(v.STOCK).toUpperCase()},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:D(v.AGENT).toUpperCase()},{label:"\u4F9B\u5E94\u5546",value:D(v.PROVIDER).toUpperCase()},{label:"\u91D1\u878D\u673A\u6784",value:D(v.FINANCE).toUpperCase()},{label:"\u5355\u4F4D\u6210\u5458",value:D(v.EMPLOYEE).toUpperCase()},{label:"\u4E13\u5BB6",value:D(v.EXPERT).toUpperCase()},{label:"\u6559\u5E08",value:D(v.TEACHER).toUpperCase()}],oe;(function(e){e[e.ORG_ADMIN=101]="ORG_ADMIN",e[e.ORG_CHIEF=151]="ORG_CHIEF",e[e.SYS_RIGHT=102]="SYS_RIGHT",e[e.SYS_DUTY_MONITOR=104]="SYS_DUTY_MONITOR",e[e.SYS_DUTY=105]="SYS_DUTY",e[e.SYS_COM_ADMIN=107]="SYS_COM_ADMIN",e[e.SYS_GMSOFT_ADMIN=108]="SYS_GMSOFT_ADMIN",e[e.APPROVAL_ADMIN=201]="APPROVAL_ADMIN",e[e.APPROVAL_OPER=202]="APPROVAL_OPER",e[e.APPROVAL_LEADER=203]="APPROVAL_LEADER",e[e.STOCK_ADMIN=301]="STOCK_ADMIN",e[e.STOCK_OPER=302]="STOCK_OPER",e[e.STOCK_LEADER=303]="STOCK_LEADER",e[e.STOCK_FIN=304]="STOCK_FIN",e[e.AGENT_ADMIN=401]="AGENT_ADMIN",e[e.AGENT_OPER=402]="AGENT_OPER",e[e.AGENT_LEADER=403]="AGENT_LEADER",e[e.PROVIDER_ADMIN=501]="PROVIDER_ADMIN",e[e.PROVIDER_OPER=502]="PROVIDER_OPER",e[e.FINANC_ADMIN=701]="FINANC_ADMIN",e[e.FINANC_OPER=702]="FINANC_OPER"})(oe||(oe={}));var Xt=oe,ie;(function(e){e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(ie||(ie={}));var Zt=ie,ue;(function(e){e.DJC="DJC",e.XCJ="XCJ",e.ZCJ="ZCJ",e.PM="PM",e.ZRTD="ZRTD"})(ue||(ue={}));var Jt=ue,W="__token__",X="__token_param_key__",Ye="__token__",en=function(e,t){var n;try{e&&t&&(window[X]=e,window[W]=t,window.history.replaceState(s(s({},window.history.state),(n={},n[X]=e,n[W]=t,n)),""))}catch{}},Ge=function(){try{return window[X]||window.history.state[X]||Ye}catch{return Ye}},Ke=function(){try{return window[W]||window.history.state[W]}catch{return null}},le=function(e){var t=L.default.parse(window.location.search,{ignoreQueryPrefix:!0})||{},n=e||Ge(),r=t[n]||Ke();return en(n,r),r},qe=function(){var e,t=Ge(),n=Ke();return n?(e={},e[t]=n,e):null},Qe=function(e){le(e)},tn=function(e){var t=e.url,n=e.target,r=n===void 0?"_self":n,a=e.extraParams,o=e.qsStringifyOptions,u=qe();if(u){var f=t.split("?"),g=f[0],i=f[1],c=L.default.stringify(s(s(s({},L.default.parse(i)),a),u),s({arrayFormat:"repeat",allowDots:!0},o)),h=[g,c].join("?");window.open(h,r)}},nn="Authorization",Ve=function(e,t){var n,r=e.tokenParamKey,a=e.authHeaderKey;t===void 0&&(t={});var o=le(r);if(o){var u=s(s({},t.headers),(n={},n[a||nn]=o,n));return s(s({},t),{headers:u})}return t};function rn(e){return Qe(e.tokenParamKey),function(t){return Ve(e,t)}}function an(e){return Qe(e.tokenParamKey),window.angular.module("HTInterceptor",[]).factory("HTInterceptor",function(){return{request:function(t){return Ve(e,t)}}}).config(["$httpProvider",function(n){n.interceptors.push("HTInterceptor")}]),"HTInterceptor"}d.LoginByPageOrRegister=qt,d.LoginByPopupOrRegister=Qt,d.OrgIdentityStringOptions=Wt,d.OrgIdentityType=Vt,d.OrgIdentityTypeOptions=$t,d.RoleType=Xt,d.UIType=Jt,d.UserIdentity=Zt,d.angularHTInterceptor=an,d.angularTokenInterceptor=nt,d.axiosHTInterceptor=rn,d.axiosTokenInterceptor=Y,d.buildLoginParams=te,d.buildLoginQueryString=Pt,d.compatibilityMe=we,d.getOrgIdentityString=D,d.getToken=ee,d.getTokenLegacy=le,d.getTokenWithKey=qe,d.jumpWithToken=tn,d.loginByPage=Pe,d.loginByPopup=De,d.logout=Ne,d.meSelector=ae,d.meSeletor=ae,d.register=Ie,d.requestMe=R,d.requestMeTrySSO=_e,d.updateSelfTokenInterceptor=at,d.urlWithToken=rt,d.useMe=Re,Object.defineProperties(d,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=auth-sdk.umd.js.map
