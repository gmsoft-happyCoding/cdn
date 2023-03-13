(function(d,m){typeof exports=="object"&&typeof module!="undefined"?m(exports,require("react"),require("react-redux"),require("qs"),require("axios"),require("react-dom"),require("styled-components"),require("antd")):typeof define=="function"&&define.amd?define(["exports","react","react-redux","qs","axios","react-dom","styled-components","antd"],m):(d=typeof globalThis!="undefined"?globalThis:d||self,m(d.AuthSDK={},d.React,d.ReactRedux,d.Qs,d.axios,d.ReactDOM,d.styled,d.antd))})(this,function(d,m,R,Fe,Ye,Ge,W,E){"use strict";function x(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var l=x(m),_=x(Fe),Ke=x(Ye),oe=x(Ge),D=x(W);/*! *****************************************************************************
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
    ***************************************************************************** */var s=function(){return s=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s.apply(this,arguments)};function X(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function p(e,t,n,r){function a(i){return i instanceof n?i:new n(function(u){u(i)})}return new(n||(n=Promise))(function(i,u){function f(c){try{o(r.next(c))}catch(h){u(h)}}function g(c){try{o(r.throw(c))}catch(h){u(h)}}function o(c){c.done?i(c.value):a(c.value).then(f,g)}o((r=r.apply(e,t||[])).next())})}function A(e,t){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,a,i,u;return u={next:f(0),throw:f(1),return:f(2)},typeof Symbol=="function"&&(u[Symbol.iterator]=function(){return this}),u;function f(o){return function(c){return g([o,c])}}function g(o){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,a&&(i=o[0]&2?a.return:o[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,o[1])).done)return i;switch(a=0,i&&(o=[o[0]&2,i.value]),o[0]){case 0:case 1:i=o;break;case 4:return n.label++,{value:o[1],done:!1};case 5:n.label++,a=o[1],o=[0];continue;case 7:o=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(o[0]===6||o[0]===2)){n=0;continue}if(o[0]===3&&(!i||o[1]>i[0]&&o[1]<i[3])){n.label=o[1];break}if(o[0]===6&&n.label<i[1]){n.label=i[1],i=o;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(o);break}i[2]&&n.ops.pop(),n.trys.pop();continue}o=t.call(e,n)}catch(c){o=[6,c],a=0}finally{r=i=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}}function w(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var Z=function(e,t){e===void 0&&(e="Auth"),t===void 0&&(t="Auth");try{if(document.cookie&&document.cookie.length>0){var n=document.cookie.split(/\s*;\s*/);if(n&&n.length>0){var r=n.find(function(i){return i.startsWith(e)}),a=r?r.split("=")[1]:null;return a&&t?t+" "+a:a}}return null}catch{return null}},qe=function(e){var t=e===void 0?{}:e,n=t.platDomain,r=n===void 0?window.location.host:n,a=t.platDomainKey,i=a===void 0?"__platDomain__":a,u=t.notSetPlatDomain,f=u===void 0?!1:u,g=t.authCookieKey,o=g===void 0?"Auth":g,c=t.authHeaderKey,h=c===void 0?"Authorization":c,M=t.authScheme,N=M===void 0?"Auth":M,I=t.notSetAuthHeader,P=I===void 0?!1:I;return{platDomain:r,platDomainKey:i,notSetPlatDomain:f,authCookieKey:o,authHeaderKey:h,authScheme:N,notSetAuthHeader:P}},U=function(e){return function(t){var n,r,a,i,u=qe(e),f=u.platDomain,g=u.platDomainKey,o=u.notSetPlatDomain,c=u.authCookieKey,h=u.authHeaderKey,M=u.authScheme,N=u.notSetAuthHeader,I=o||!f||t.params&&t.params[g]||((a=t==null?void 0:t.url)===null||a===void 0?void 0:a.indexOf(g+"="))!==-1?t.params:s(s({},t.params),(n={},n[g]=f,n)),P=Z(c,M),y=N||!P||((i=t==null?void 0:t.headers)===null||i===void 0?void 0:i[h])?t.headers:s(s({},t.headers),(r={},r[h]=P,r));return s(s({},t),{params:I,headers:y})}},Qe=function(e){var t="tokenInterceptor";return window.angular&&window.angular.module(t,[]).factory(t,function(){return{request:function(n){return n.url.indexOf(".tpl")!==-1&&(n.withCredentials=!1),n.url.indexOf(".html")===-1?U(e)(n):n}}}).config(["$httpProvider",function(r){r.interceptors.push(t)}]),t},Ve=function(e,t,n){t===void 0&&(t="__auth__"),n===void 0&&(n="Auth");var r=Z(n,"");return r?""+e+(e.indexOf("?")!==-1?"&":"?")+t+"="+r:e},B=Ke.default.create({withCredentials:!0,paramsSerializer:function(e){return _.default.stringify(e,{arrayFormat:"repeat",allowDots:!0})}}),ue=B.interceptors.request.use(U()),$e=function(e){B.interceptors.request.eject(ue),ue=B.interceptors.request.use(U(e))},z=function(e,t){return B(s({url:e},t))};function F(e){if(!e)return{};var t=e.startsWith("//")?""+window.location.protocol+e:e,n={},r=["href","origin","protocol","host","hostname","port","pathname","search","hash"],a=/(([^:]+:)\/\/(([^:/?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/,i=a.exec(t);if(i)for(var u=r.length-1;u>=0;--u)n[r[u]]=i[u]?i[u]:"";return n}var We=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/user?requireAvatar=true"},Xe=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/login"},Ze=function(e){e===void 0&&(e=window.location.origin);var t=F(e).host;return e+"/gateway/v1/op?host="+encodeURIComponent(t)},le=function(e){return e+"/djcsupport/domainname/getPlatformConfigure"},Je=function(e,t,n){return n||(t?e+"@"+t:"plat@"+e)},et=function(e,t){return t||(e||window.location.origin)+"/login-app/login-success/index.html"},de=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,i=e.djcGatewayBaseUrl,u=e.platId,f=e.dp,g=e.ui,o=e.registerNoHeader,c=e.title,h=e.clientId,M=e.loginSuccessRedirectUri,N=e.limitOrgTypes,I=e.errorMessage,P=e.extraParams;return p(void 0,void 0,void 0,function(){var y,b,j,T;return A(this,function(S){switch(S.label){case 0:return y=F(n).host,b=u,u?[3,2]:[4,z(le(i),{params:{orgDomainName:y}})];case 1:j=S.sent().data,b=j==null?void 0:j.platformCode,S.label=2;case 2:return b?[2,s(s({},P),{ui:g,register_no_header:o,title:c,origin:n,client_id:Je(b,f,h),scope:r||a||y,login_sucess_redirect_uri:et(n,M),redirect_uri:Xe(n),is_fpa:!0,error_message:I,options:N&&{limitOrgTypes:N}})]:(T="\u672A\u67E5\u8BE2\u5230 "+y+" \u5BF9\u5E94\u7684\u5E73\u53F0\u4FE1\u606F, \u8BF7\u68C0\u67E5\u5E73\u53F0\u914D\u7F6E\u662F\u5426\u6B63\u786E",console.log(T),[2,Promise.reject(new Error(T))])}})})},ce=function(e){return p(void 0,void 0,void 0,function(){var t;return A(this,function(n){switch(n.label){case 0:return[4,de(e)];case 1:return t=n.sent(),[2,_.default.stringify(t,{addQueryPrefix:!0})]}})})},Y=function(){try{return(top==null?void 0:top.document.querySelector("#mount-root"))||top.document.body}catch{return document.body}};function tt(e){return e&&e.parentNode?e.parentNode:Y()}var J="gmsoft-ui-top-body-need-inject-css",ee=function(e){top[J]=e},nt=function(){return top[J]===void 0&&ee(!0),top[J]},rt=W.createGlobalStyle(se||(se=w([`
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
`]))),at=function(){m.useEffect(function(){return ee(!1),function(){ee(!0)}})},it=function(){var e=m.useState(function(){return nt()})[0];return at(),e?l.default.createElement(rt,null):null},se,ot=Y(),C=function(e){var t=e.children,n=e.width,r=e.getContainer,a=X(e,["children","width","getContainer"]);return a.visible!==!0?null:l.default.createElement(W.StyleSheetManager,{target:ot},l.default.createElement(l.default.Fragment,null,l.default.createElement(it,null),l.default.createElement(E.Modal,s({getContainer:r||Y,width:n},a),l.default.createElement(E.ConfigProvider,{getPopupContainer:tt},t))))},k=function(e){return function(t){return E.Modal[e](s({getContainer:Y},t))}};C.info=k("info"),C.success=k("success"),C.error=k("error"),C.warning=k("warning"),C.confirm=k("confirm"),C.destroyAll=E.Modal.destroyAll;var G="ant",K=function(){},ut=D.default(C)(ve||(ve=w([`
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
`])),G),lt=function(e,t,n){K&&K();var r=document.createElement("div");document.body.appendChild(r);var a=function(){return oe.default.unmountComponentAtNode(r)};return K=function(){t&&typeof t=="function"&&t(),a()},oe.default.render(l.default.createElement(ut,{visible:!0,maskClosable:!0,closable:!1,footer:null,closeIcon:null,onCancel:K,width:366},l.default.createElement("iframe",{title:"loginBox",className:"login-form-box",src:e,width:"360px",height:"440px",scrolling:"no",style:{margin:0,padding:0,display:"block"},frameBorder:"0"})),r),n&&(n.current=a),a},ve,dt="@@GLOBAL_CONTEXT/SET";function ct(e,t){e&&e({type:dt,payload:{me:t}})}var st="__platDomain__",vt=function(e){return e?e.findIndex(function(t){return String(t).endsWith("01")})!==-1:!1},fe=function(e){var t,n,r,a,i,u,f,g,o,c,h,M;if(!(!e||Object.getOwnPropertyNames(e).length===0))return s({admin:vt(e==null?void 0:e.roles),adminAreaId:(t=e==null?void 0:e.org)===null||t===void 0?void 0:t.areaId,adminAreaName:(n=e==null?void 0:e.org)===null||n===void 0?void 0:n.areaName,maintainPlatId:(r=e==null?void 0:e.additionalInformation)===null||r===void 0?void 0:r.mpi,orgId:(a=e==null?void 0:e.org)===null||a===void 0?void 0:a.orgId,orgName:(i=e==null?void 0:e.org)===null||i===void 0?void 0:i.orgName,orgType:(u=e==null?void 0:e.org)===null||u===void 0?void 0:u.orgType,userName:e==null?void 0:e.realName,userTypes:e!=null&&e.roles?e==null?void 0:e.roles.join(","):void 0,deptRole:(f=e==null?void 0:e.additionalInformation)===null||f===void 0?void 0:f.deptRole,isBidDown:(g=e==null?void 0:e.additionalInformation)===null||g===void 0?void 0:g.isBidDown,isSj:(o=e==null?void 0:e.additionalInformation)===null||o===void 0?void 0:o.isSj,orgClassNo:(c=e==null?void 0:e.additionalInformation)===null||c===void 0?void 0:c.orgClassNo,organClass:(h=e==null?void 0:e.additionalInformation)===null||h===void 0?void 0:h.organClass,userType:(M=e==null?void 0:e.additionalInformation)===null||M===void 0?void 0:M.userType},e)},q=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.dispatch;return p(void 0,void 0,void 0,function(){var i,u,f,g,o,c;return A(this,function(h){switch(h.label){case 0:return i=F(n).host,u=r||i,[4,z(We(n),{params:(c={},c[st]=u,c)})];case 1:return f=h.sent(),g=f.data,!g||Object.getOwnPropertyNames(g).length===0?[2,Promise.reject()]:(o=fe(f.data),window.location.origin.includes(n)&&ct(a,o),[2,o])}})})},ge=function(e){var t=e.authPageOrigin,n=e.origin,r=n===void 0?window.location.origin:n,a=e.whoAmIHost,i=e.whoAmIhost,u=e.clientId,f=e.platId,g=e.dp,o=e.ui,c=e.registerNoHeader,h=e.title,M=e.djcGatewayBaseUrl,N=e.loginSuccessRedirectUri,I=e.limitOrgTypes,P=e.oauthState,y=e.onCancelLogin,b=e.closePopupRef,j=e.dispatch;return p(void 0,void 0,void 0,function(){var T,S,Ue,Be;return A(this,function(L){switch(L.label){case 0:T=a||i,L.label=1;case 1:return L.trys.push([1,3,,5]),[4,q({dispatch:j,origin:r,whoAmIHost:T})];case 2:return S=L.sent(),[2,S];case 3:return L.sent(),[4,ce({origin:r,whoAmIHost:T,djcGatewayBaseUrl:M,clientId:u,platId:f,dp:g,ui:o,registerNoHeader:c,title:h,loginSuccessRedirectUri:N,limitOrgTypes:I,extraParams:P})];case 4:return Ue=L.sent(),Be=t+"/oauth-login"+Ue,[2,lt(Be,y,b)];case 5:return[2]}})})},ft=function(e,t){return e===void 0&&(e=window.location.origin),p(void 0,void 0,void 0,function(){var n,r;return A(this,function(a){switch(a.label){case 0:return{}.VITE_DEPLOY==="PM"?[2,t+"/authing"]:[4,z(Ze(e))];case 1:return n=a.sent(),[2,(r=n==null?void 0:n.data)===null||r===void 0?void 0:r.op]}})})},gt=function(e){return e.then(function(t){return{value:t,status:"resolved"}},function(t){return{error:t,status:"rejected"}})},ht=function(e,t){return t===void 0&&(t=5e3),new Promise(function(n,r){var a=new Image(0,0);a.onload=n,a.onerror=r,a.src=e,setTimeout(function(){r()},t)})},mt=function(e){e===void 0&&(e=[]);var t=e.filter(function(n){return n}).map(function(n){return ht(n)});return Promise.all(t.map(gt))},Et=function(e,t,n){return p(void 0,void 0,void 0,function(){var r;return A(this,function(a){switch(a.label){case 0:return[4,z(e+"/logout",{method:"DELETE",params:{success_uri:t}})];case 1:return r=a.sent().data,n&&n.length>0?[4,mt(n)]:[3,3];case 2:a.sent(),a.label=3;case 3:return window.open(r.location,"_top"),[2]}})})},he=function(e){var t=e.djcGatewayBaseUrl,n=e.logoutRedirectUrl,r=e.otherLogoutUrls,a=e.origin;return p(void 0,void 0,void 0,function(){var i;return A(this,function(u){switch(u.label){case 0:return[4,ft(a,t)];case 1:return i=u.sent(),[4,Et(i,n,r)];case 2:return u.sent(),[2]}})})},me=function(e){var t=e.authPageOrigin,n=e.origin,r=e.ui,a=e.dp,i=e.djcGatewayBaseUrl,u=e.noHeader;return p(void 0,void 0,void 0,function(){var f,g,o;return A(this,function(c){switch(c.label){case 0:return f=t+"/register/select-type",g=null,[4,z(le(i),{params:{orgDomainName:n?F(n).host:window.location.host}})];case 1:return o=c.sent().data,g=o==null?void 0:o.platformCode,window.open(""+f+_.default.stringify({ui:r,platId:g,dp:a,noHeader:u},{addQueryPrefix:!0,encode:!1}),"_blank"),[2]}})})},Ee="globalContext",te=function(e){return e&&e[Ee]?e[Ee].me:void 0},Me=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,i=e.dispatch;return q({dispatch:i,origin:n,whoAmIHost:r||a})},pe=function(e){return p(void 0,void 0,void 0,function(){var t,n=e.loginPage,r=X(e,["loginPage"]);return A(this,function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,Me(r)];case 1:return t=a.sent(),[2,t];case 2:return a.sent(),window.open(n,"_top"),[3,3];case 3:return[2]}})})},H=l.default.createContext({authPageOrigin:"",djcGatewayBaseUrl:"",toCenterPage:function(){}}),Mt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA0OCA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ4IDI0LjAyNjRDNDggMzcuMjY3MyAzNy4yNTQxIDQ4LjAwMzEgMjMuOTk3NSA0OC4wMDMxQzEwLjc0MjEgNDguMDAzMSAwIDM3LjI2NzMgMCAyNC4wMjY0QzAgMTMuODYzIDYuMzI2MDUgNS4xNzk4NyAxNS4yNjAyIDEuNjkwMzNDMTcuOTU5NiAwLjYwMTM3NiAyMC45MDg3IDAgMjMuOTk4MSAwQzI3LjA5MTMgMCAzMC4wMzc5IDAuNjAwNzY5IDMyLjczOTggMS42OTAzM0M0MS42NzM0IDUuMTc5ODcgNDggMTMuODYzIDQ4IDI0LjAyNjRaTTE0Ljc3MzMgMTguOTY5OUMxNC43NzMzIDIzLjAxMDUgMTYuODQzNiAyNi41MDg4IDE5Ljg1MzEgMjguMjIxMUMyMS4xMDEyIDI4LjkzMTQgMjIuNTA2NSAyOS4zNDA5IDIzLjk5NzUgMjkuMzQwOUMyNS40MzYxIDI5LjM0MDkgMjYuNzkyNSAyOC45NTc4IDI4LjAwNzkgMjguMjk2QzMxLjA4ODUgMjYuNjE2MyAzMy4yMjU1IDIzLjA3NTMgMzMuMjI1NSAxOC45NzA1QzMzLjIyNTUgMTMuMjU1MyAyOS4wODY4IDguNjAzMjggMjMuOTk3NSA4LjYwMzI4QzE4LjkxMTQgOC42MDI2NyAxNC43NzMzIDEzLjI1NDcgMTQuNzczMyAxOC45Njk5Wk0yNC4wOTUgNDYuNDQ5NEMzMS4xMDY3IDQ2LjQ0OTQgMzcuMzYxNiA0My4yMjQ3IDQxLjQ2MTMgMzguMTc4M0M0MC45NzcgMzQuMTk3NSAzNy4wOTggMzAuODA4NiAzMS42MDgxIDI5LjExODJDMjkuNTM0NyAzMC45ODM1IDI2Ljg4NTYgMzIuMTA1OCAyMy45OTY4IDMyLjEwNThDMjEuMDQzOSAzMi4xMDU4IDE4LjM0MDggMzAuOTIzMSAxNi4yNDcyIDI4Ljk3NjdDMTAuOTA2OSAzMC41MDA5IDYuOTk1MzIgMzMuNjA5OSA2LjA3ODE4IDM3LjMzNTNDMTAuMTQ2NCA0Mi44NjE3IDE2LjcwMzMgNDYuNDQ5NCAyNC4wOTUgNDYuNDQ5NFoiIGZpbGw9IiNDRUNGRTAiLz4KPC9zdmc+Cg==",Ae=function(e){var t=e.path,n=e.className,r=m.useContext(H).djcGatewayBaseUrl,a=m.useMemo(function(){return t?r+"/files?business=avatar&filePath="+t+"&fileName=file&attachment=false&contentType=image/png":Mt},[r,t]);return l.default.createElement(E.Avatar,{className:n,src:a})},Q=function(e){return e.theme.textColorSecondary||"#697b8c"},we=function(e){return e.theme.linkColorHover||"#1890ff"},pt=D.default.a(Oe||(Oe=w([`
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
`])),Q,Q,Q,Q,we,we),At=function(){try{return window.top.location.href}catch{return window.location.href}},wt=function(){var e=m.useContext(H),t=e.logoutRedirectUrl,n=X(e,["logoutRedirectUrl"]),r=m.useCallback(function(){return p(void 0,void 0,void 0,function(){return A(this,function(a){switch(a.label){case 0:return[4,he(s(s({},n),{logoutRedirectUrl:t||At()}))];case 1:return a.sent(),[2]}})})},[n,t]);return l.default.createElement(pt,{onClick:r},l.default.createElement("span",null,"\u9000\u51FA"),l.default.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4393",width:"20",height:"20"},l.default.createElement("path",{d:"M593.92 838.513v-95.355a40.96 40.96 0 1 1 81.92 0v95.355c0 45.26-35.226 83.087-80.22 83.087H203.1c-44.994 0-80.22-37.827-80.22-83.087V185.487c0-45.26 35.226-83.087 80.22-83.087h392.52c44.994 0 80.22 37.827 80.22 83.087v193.946a40.96 40.96 0 1 1-81.92 0V185.487c0-1.024 0.061-1.147 0.901-1.167H203.9c0.84 0 0.901 0.164 0.901 1.167v653.026c0 1.024-0.061 1.147-0.901 1.167H594.82c-0.84 0-0.901-0.164-0.901-1.167z","p-id":"4394"}),l.default.createElement("path",{d:"M471.04 512h327.68q40.96 0 40.96 40.96t-40.96 40.96H471.04q-40.96 0-40.96-40.96T471.04 512z","p-id":"4395"}),l.default.createElement("path",{d:"M811.199 422.828L912.57 524.2q28.963 28.963 0 57.926t-57.926 0l-101.37-101.37q-28.964-28.964 0-57.927 28.962-28.963 57.925 0z","p-id":"4396"}),l.default.createElement("path",{d:"M753.273 625.575l101.37-101.37q28.964-28.964 57.927 0 28.963 28.962 0 57.925L811.2 683.501q-28.964 28.963-57.927 0t0-57.926z","p-id":"4397"})))},Oe,Ot=E.Typography.Paragraph,Dt=D.default.div(Ne||(Ne=w([`
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
`])),G,G,G),Nt=D.default(Ae)(Ie||(Ie=w([`
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
`]))),De=D.default(Ot).attrs({ellipsis:!0})(Pe||(Pe=w([`
  &&& {
    margin: 0;
  }
`],[`
  &&& {
    margin: 0;
  }
`]))),It=D.default(De)(ye||(ye=w([`
  font-size: 16px;
  font-weight: 700;
`],[`
  font-size: 16px;
  font-weight: 700;
`]))),Pt=function(e){var t,n,r,a=e.me,i=m.useContext(H).toCenterPage;return l.default.createElement(Dt,null,l.default.createElement(E.Menu,{mode:"vertical"},l.default.createElement(E.Menu.Item,{key:"avatar"},l.default.createElement(Nt,{path:(t=a.additionalInformation)===null||t===void 0?void 0:t.avatar})),l.default.createElement(E.Menu.Item,{key:"name"},a.realName&&l.default.createElement("a",{onClick:i},l.default.createElement(It,null,a.realName)),((n=a.org)===null||n===void 0?void 0:n.orgName)&&l.default.createElement(De,null,(r=a.org)===null||r===void 0?void 0:r.orgName)),l.default.createElement(E.Menu.Divider,null),l.default.createElement(E.Menu.Item,{key:"logout"},l.default.createElement(wt,null))))},Ne,Ie,Pe,ye,yt=D.default(Ae)(Ce||(Ce=w([`
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
`]))),Ct=E.Typography.Text,Tt=D.default(Ct)(Te||(Te=w([`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`],[`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`]))),_t=function(e){var t,n=e.me;return l.default.createElement(E.Popover,{placement:"bottom",autoAdjustOverflow:!1,content:l.default.createElement(Pt,{me:n})},l.default.createElement(yt,{path:(t=n.additionalInformation)===null||t===void 0?void 0:t.avatar}),l.default.createElement(Tt,{ellipsis:!0},n.realName))},Ce,Te,bt=function(){var e=m.useContext(H),t=m.useCallback(function(){me(e)},[e]);return l.default.createElement("a",{className:"register",onClick:t},"\u6CE8\u518C")},_e=function(){return R.useSelector(te)},jt=function(){var e=_e(),t=R.useDispatch();return m.useEffect(function(){e||q({dispatch:t}).catch(function(){})},[e,t]),e},St=E.Typography.Text,Lt=D.default(St).attrs({type:"secondary"})(be||(be=w([`
  margin: 0 8px;
`],[`
  margin: 0 8px;
`]))),be,je=function(e){var t=e.className,n=e.children,r=jt();return l.default.createElement(H.Provider,{value:e},l.default.createElement("div",{className:t},r?l.default.createElement(_t,{me:r}):l.default.createElement(l.default.Fragment,null,n,l.default.createElement(Lt,null,"\u6216"),l.default.createElement(bt,null))))},Se=function(e){var t=e.login;return l.default.createElement("a",{className:"login",onClick:t},"\u767B\u5F55")},xt=function(e){var t=e.loginPage,n=R.useDispatch(),r=m.useCallback(function(){pe(s(s({},e),{dispatch:n}))},[n,e]);return l.default.createElement(je,s({},e,{logoutRedirectUrl:t}),l.default.createElement(Se,{login:r}))},zt=function(e){var t=R.useDispatch(),n=m.useCallback(function(){ge(s(s({},e),{dispatch:t}))},[t,e]);return l.default.createElement(je,s({},e),l.default.createElement(Se,{login:n}))},v;(function(e){e[e.PLATFORM=1]="PLATFORM",e[e.APPROVAL=2]="APPROVAL",e[e.STOCK=3]="STOCK",e[e.AGENT=4]="AGENT",e[e.PROVIDER=5]="PROVIDER",e[e.FINANCE=7]="FINANCE",e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(v||(v={}));var kt=v,O=function(e){switch(e){case v.PLATFORM:return"platform";case v.APPROVAL:return"approval";case v.STOCK:return"stock";case v.AGENT:return"agent";case v.PROVIDER:return"provider";case v.FINANCE:return"finance";case v.EMPLOYEE:return"employee";case v.EXPERT:return"expert";case v.TEACHER:return"teacher";default:return""}},Ht=[{label:"\u5E73\u53F0\u8FD0\u8425",value:v.PLATFORM},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:v.APPROVAL},{label:"\u91C7\u8D2D\u5355\u4F4D",value:v.STOCK},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:v.AGENT},{label:"\u4F9B\u5E94\u5546",value:v.PROVIDER},{label:"\u91D1\u878D\u673A\u6784",value:v.FINANCE},{label:"\u5355\u4F4D\u6210\u5458",value:v.EMPLOYEE},{label:"\u4E13\u5BB6",value:v.EXPERT},{label:"\u6559\u5E08",value:v.TEACHER}],Rt=[{label:"\u5E73\u53F0\u8FD0\u8425",value:O(v.PLATFORM).toUpperCase()},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:O(v.APPROVAL).toUpperCase()},{label:"\u91C7\u8D2D\u5355\u4F4D",value:O(v.STOCK).toUpperCase()},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:O(v.AGENT).toUpperCase()},{label:"\u4F9B\u5E94\u5546",value:O(v.PROVIDER).toUpperCase()},{label:"\u91D1\u878D\u673A\u6784",value:O(v.FINANCE).toUpperCase()},{label:"\u5355\u4F4D\u6210\u5458",value:O(v.EMPLOYEE).toUpperCase()},{label:"\u4E13\u5BB6",value:O(v.EXPERT).toUpperCase()},{label:"\u6559\u5E08",value:O(v.TEACHER).toUpperCase()}],ne;(function(e){e[e.ORG_ADMIN=101]="ORG_ADMIN",e[e.ORG_CHIEF=151]="ORG_CHIEF",e[e.SYS_RIGHT=102]="SYS_RIGHT",e[e.SYS_DUTY_MONITOR=104]="SYS_DUTY_MONITOR",e[e.SYS_DUTY=105]="SYS_DUTY",e[e.SYS_COM_ADMIN=107]="SYS_COM_ADMIN",e[e.SYS_GMSOFT_ADMIN=108]="SYS_GMSOFT_ADMIN",e[e.APPROVAL_ADMIN=201]="APPROVAL_ADMIN",e[e.APPROVAL_OPER=202]="APPROVAL_OPER",e[e.APPROVAL_LEADER=203]="APPROVAL_LEADER",e[e.STOCK_ADMIN=301]="STOCK_ADMIN",e[e.STOCK_OPER=302]="STOCK_OPER",e[e.STOCK_LEADER=303]="STOCK_LEADER",e[e.STOCK_FIN=304]="STOCK_FIN",e[e.AGENT_ADMIN=401]="AGENT_ADMIN",e[e.AGENT_OPER=402]="AGENT_OPER",e[e.AGENT_LEADER=403]="AGENT_LEADER",e[e.PROVIDER_ADMIN=501]="PROVIDER_ADMIN",e[e.PROVIDER_OPER=502]="PROVIDER_OPER",e[e.FINANC_ADMIN=701]="FINANC_ADMIN",e[e.FINANC_OPER=702]="FINANC_OPER"})(ne||(ne={}));var Ut=ne,re;(function(e){e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(re||(re={}));var Bt=re,ae;(function(e){e.DJC="DJC",e.XCJ="XCJ",e.ZCJ="ZCJ",e.PM="PM",e.ZRTD="ZRTD"})(ae||(ae={}));var Ft=ae,V="__token__",$="__token_param_key__",Le="__token__",Yt=function(e,t){var n;try{e&&t&&(window[$]=e,window[V]=t,window.history.replaceState(s(s({},window.history.state),(n={},n[$]=e,n[V]=t,n)),""))}catch{}},xe=function(){try{return window[$]||window.history.state[$]||Le}catch{return Le}},ze=function(){try{return window[V]||window.history.state[V]}catch{return null}},ie=function(e){var t=_.default.parse(window.location.search,{ignoreQueryPrefix:!0})||{},n=e||xe(),r=t[n]||ze();return Yt(n,r),r},ke=function(){var e,t=xe(),n=ze();return n?(e={},e[t]=n,e):null},He=function(e){ie(e)},Gt=function(e){var t=e.url,n=e.target,r=n===void 0?"_self":n,a=e.extraParams,i=e.qsStringifyOptions,u=ke();if(u){var f=t.split("?"),g=f[0],o=f[1],c=_.default.stringify(s(s(s({},_.default.parse(o)),a),u),s({arrayFormat:"repeat",allowDots:!0},i)),h=[g,c].join("?");window.open(h,r)}},Kt="Authorization",Re=function(e,t){var n,r=e.tokenParamKey,a=e.authHeaderKey;t===void 0&&(t={});var i=ie(r);if(i){var u=s(s({},t.headers),(n={},n[a||Kt]=i,n));return s(s({},t),{headers:u})}return t};function qt(e){return He(e.tokenParamKey),function(t){return Re(e,t)}}function Qt(e){return He(e.tokenParamKey),window.angular.module("HTInterceptor",[]).factory("HTInterceptor",function(){return{request:function(t){return Re(e,t)}}}).config(["$httpProvider",function(n){n.interceptors.push("HTInterceptor")}]),"HTInterceptor"}d.LoginByPageOrRegister=xt,d.LoginByPopupOrRegister=zt,d.OrgIdentityStringOptions=Rt,d.OrgIdentityType=kt,d.OrgIdentityTypeOptions=Ht,d.RoleType=Ut,d.UIType=Ft,d.UserIdentity=Bt,d.angularHTInterceptor=Qt,d.angularTokenInterceptor=Qe,d.axiosHTInterceptor=qt,d.axiosTokenInterceptor=U,d.buildLoginParams=de,d.buildLoginQueryString=ce,d.compatibilityMe=fe,d.getOrgIdentityString=O,d.getToken=Z,d.getTokenLegacy=ie,d.getTokenWithKey=ke,d.jumpWithToken=Gt,d.loginByPage=pe,d.loginByPopup=ge,d.logout=he,d.meSelector=te,d.meSeletor=te,d.register=me,d.requestMe=q,d.requestMeTrySSO=Me,d.updateSelfTokenInterceptor=$e,d.urlWithToken=Ve,d.useMe=_e,Object.defineProperties(d,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=auth-sdk.umd.js.map
