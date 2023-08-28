(function(d,m){typeof exports=="object"&&typeof module!="undefined"?m(exports,require("react"),require("react-redux"),require("qs"),require("axios"),require("react-dom"),require("styled-components"),require("antd")):typeof define=="function"&&define.amd?define(["exports","react","react-redux","qs","axios","react-dom","styled-components","antd"],m):(d=typeof globalThis!="undefined"?globalThis:d||self,m(d.AuthSDK={},d.React,d.ReactRedux,d.Qs,d.axios,d.ReactDOM,d.styled,d.antd))})(this,function(d,m,B,Ye,Ge,Ke,Z,p){"use strict";function z(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var l=z(m),_=z(Ye),qe=z(Ge),le=z(Ke),D=z(Z);/*! *****************************************************************************
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
    ***************************************************************************** */var s=function(){return s=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s.apply(this,arguments)};function J(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function M(e,t,n,r){function a(i){return i instanceof n?i:new n(function(u){u(i)})}return new(n||(n=Promise))(function(i,u){function f(c){try{o(r.next(c))}catch(h){u(h)}}function g(c){try{o(r.throw(c))}catch(h){u(h)}}function o(c){c.done?i(c.value):a(c.value).then(f,g)}o((r=r.apply(e,t||[])).next())})}function A(e,t){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,a,i,u;return u={next:f(0),throw:f(1),return:f(2)},typeof Symbol=="function"&&(u[Symbol.iterator]=function(){return this}),u;function f(o){return function(c){return g([o,c])}}function g(o){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,a&&(i=o[0]&2?a.return:o[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,o[1])).done)return i;switch(a=0,i&&(o=[o[0]&2,i.value]),o[0]){case 0:case 1:i=o;break;case 4:return n.label++,{value:o[1],done:!1};case 5:n.label++,a=o[1],o=[0];continue;case 7:o=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(o[0]===6||o[0]===2)){n=0;continue}if(o[0]===3&&(!i||o[1]>i[0]&&o[1]<i[3])){n.label=o[1];break}if(o[0]===6&&n.label<i[1]){n.label=i[1],i=o;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(o);break}i[2]&&n.ops.pop(),n.trys.pop();continue}o=t.call(e,n)}catch(c){o=[6,c],a=0}finally{r=i=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}}function O(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var ee=function(e,t){e===void 0&&(e="Auth"),t===void 0&&(t="Auth");try{if(document.cookie&&document.cookie.length>0){var n=document.cookie.split(/\s*;\s*/);if(n&&n.length>0){var r=n.find(function(i){return i.startsWith(e)}),a=r?r.split("=")[1]:null;return a&&t?t+" "+a:a}}return null}catch{return null}},Qe=function(e){var t=e===void 0?{}:e,n=t.platDomain,r=n===void 0?window.location.host:n,a=t.platDomainKey,i=a===void 0?"__platDomain__":a,u=t.notSetPlatDomain,f=u===void 0?!1:u,g=t.authCookieKey,o=g===void 0?"Auth":g,c=t.authHeaderKey,h=c===void 0?"Authorization":c,E=t.authScheme,I=E===void 0?"Auth":E,N=t.notSetAuthHeader,y=N===void 0?!1:N;return{platDomain:r,platDomainKey:i,notSetPlatDomain:f,authCookieKey:o,authHeaderKey:h,authScheme:I,notSetAuthHeader:y}},F=function(e){return function(t){var n,r,a,i,u=Qe(e),f=u.platDomain,g=u.platDomainKey,o=u.notSetPlatDomain,c=u.authCookieKey,h=u.authHeaderKey,E=u.authScheme,I=u.notSetAuthHeader,N=o||!f||t.params&&t.params[g]||((a=t==null?void 0:t.url)===null||a===void 0?void 0:a.indexOf(g+"="))!==-1?t.params:s(s({},t.params),(n={},n[g]=f,n)),y=ee(c,E),U=I||!y||((i=t==null?void 0:t.headers)===null||i===void 0?void 0:i[h])?t.headers:s(s({},t.headers),(r={},r[h]=y,r));return s(s({},t),{params:N,headers:U})}},Ve=function(e){var t="tokenInterceptor";return window.angular&&window.angular.module(t,[]).factory(t,function(){return{request:function(n){return n.url.indexOf(".tpl")!==-1&&(n.withCredentials=!1),n.url.indexOf(".html")===-1?F(e)(n):n}}}).config(["$httpProvider",function(r){r.interceptors.push(t)}]),t},$e=function(e,t,n){t===void 0&&(t="__auth__"),n===void 0&&(n="Auth");var r=ee(n,"");return r?""+e+(e.indexOf("?")!==-1?"&":"?")+t+"="+r:e},Y=qe.default.create({withCredentials:!0,paramsSerializer:function(e){return _.default.stringify(e,{arrayFormat:"repeat",allowDots:!0})}}),de=Y.interceptors.request.use(F()),We=function(e){Y.interceptors.request.eject(de),de=Y.interceptors.request.use(F(e))},k=function(e,t){return Y(s({url:e},t))};function G(e){if(!e)return{};var t=e.startsWith("//")?""+window.location.protocol+e:e,n={},r=["href","origin","protocol","host","hostname","port","pathname","search","hash"],a=/(([^:]+:)\/\/(([^:/?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/,i=a.exec(t);if(i)for(var u=r.length-1;u>=0;--u)n[r[u]]=i[u]?i[u]:"";return n}var Xe=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/user?requireAvatar=true"},Ze=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/login"},Je=function(e){e===void 0&&(e=window.location.origin);var t=G(e).host;return e+"/gateway/v1/op?host="+encodeURIComponent(t)},ce=function(e){return e+"/djcsupport/domainname/getPlatformConfigure"},et=function(e,t,n){return n||(t?e+"@"+t:"plat@"+e)},tt=function(e,t){return t||(e||window.location.origin)+"/login-app/login-success/index.html"},se=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,i=e.djcGatewayBaseUrl,u=e.platId,f=e.dp,g=e.ui,o=e.registerNoHeader,c=e.title,h=e.clientId,E=e.loginSuccessRedirectUri,I=e.limitOrgType,N=e.preferOrgType,y=e.errorMessage,U=e.extraParams;return M(void 0,void 0,void 0,function(){var b,j,S,C,P;return A(this,function(L){switch(L.label){case 0:return b=G(n).host,j=u,u?[3,2]:[4,k(ce(i),{params:{orgDomainName:b}})];case 1:S=L.sent().data,j=S==null?void 0:S.platformCode,L.label=2;case 2:return j?(P={},I&&(P.limitOrgType=I),N&&(P.preferOrgType=N),[2,s(s({},U),{ui:g,register_no_header:o,title:c,origin:n,client_id:et(j,f,h),scope:r||a||b,login_sucess_redirect_uri:tt(n,E),redirect_uri:Ze(n),is_fpa:!0,error_message:y,options:Object.keys(P).length>0?JSON.stringify(P):void 0})]):(C="\u672A\u67E5\u8BE2\u5230 "+b+" \u5BF9\u5E94\u7684\u5E73\u53F0\u4FE1\u606F, \u8BF7\u68C0\u67E5\u5E73\u53F0\u914D\u7F6E\u662F\u5426\u6B63\u786E",console.log(C),[2,Promise.reject(new Error(C))])}})})},ve=function(e){return M(void 0,void 0,void 0,function(){var t;return A(this,function(n){switch(n.label){case 0:return[4,se(e)];case 1:return t=n.sent(),[2,_.default.stringify(t,{addQueryPrefix:!0})]}})})},K=function(){try{return(top==null?void 0:top.document.querySelector("#mount-root"))||top.document.body}catch{return document.body}};function nt(e){return e&&e.parentNode?e.parentNode:K()}var te="gmsoft-ui-top-body-need-inject-css",ne=function(e){top[te]=e},rt=function(){return top[te]===void 0&&ne(!0),top[te]},at=Z.createGlobalStyle(fe||(fe=O([`
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
`]))),it=function(){m.useEffect(function(){return ne(!1),function(){ne(!0)}})},ot=function(){var e=m.useState(function(){return rt()})[0];return it(),e?l.default.createElement(at,null):null},fe,ut=K(),T=function(e){var t=e.children,n=e.width,r=e.getContainer,a=J(e,["children","width","getContainer"]);return a.visible!==!0?null:l.default.createElement(Z.StyleSheetManager,{target:ut},l.default.createElement(l.default.Fragment,null,l.default.createElement(ot,null),l.default.createElement(p.Modal,s({getContainer:r||K,width:n},a),l.default.createElement(p.ConfigProvider,{getPopupContainer:nt},t))))},H=function(e){return function(t){return p.Modal[e](s({getContainer:K},t))}};T.info=H("info"),T.success=H("success"),T.error=H("error"),T.warning=H("warning"),T.confirm=H("confirm"),T.destroyAll=p.Modal.destroyAll;var q="ant",Q=function(){},lt=D.default(T)(ge||(ge=O([`
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
`])),q),dt=function(e,t,n){Q&&Q();var r=document.createElement("div");document.body.appendChild(r);var a=function(){return le.default.unmountComponentAtNode(r)};return Q=function(){t&&typeof t=="function"&&t(),a()},le.default.render(l.default.createElement(lt,{visible:!0,maskClosable:!0,closable:!1,footer:null,closeIcon:null,onCancel:Q,width:366},l.default.createElement("iframe",{title:"loginBox",className:"login-form-box",src:e,width:"360px",height:"440px",scrolling:"no",style:{margin:0,padding:0,display:"block"},frameBorder:"0"})),r),n&&(n.current=a),a},ge,ct="@@GLOBAL_CONTEXT/SET";function st(e,t){e&&e({type:ct,payload:{me:t}})}var vt="__platDomain__",ft=function(e){return e?e.findIndex(function(t){return String(t).endsWith("01")})!==-1:!1},he=function(e){var t,n,r,a,i,u,f,g,o,c,h,E;if(!(!e||Object.getOwnPropertyNames(e).length===0))return s({admin:ft(e==null?void 0:e.roles),adminAreaId:(t=e==null?void 0:e.org)===null||t===void 0?void 0:t.areaId,adminAreaName:(n=e==null?void 0:e.org)===null||n===void 0?void 0:n.areaName,maintainPlatId:(r=e==null?void 0:e.additionalInformation)===null||r===void 0?void 0:r.mpi,orgId:(a=e==null?void 0:e.org)===null||a===void 0?void 0:a.orgId,orgName:(i=e==null?void 0:e.org)===null||i===void 0?void 0:i.orgName,orgType:(u=e==null?void 0:e.org)===null||u===void 0?void 0:u.orgType,userName:e==null?void 0:e.realName,userTypes:e!=null&&e.roles?e==null?void 0:e.roles.join(","):void 0,deptRole:(f=e==null?void 0:e.additionalInformation)===null||f===void 0?void 0:f.deptRole,isBidDown:(g=e==null?void 0:e.additionalInformation)===null||g===void 0?void 0:g.isBidDown,isSj:(o=e==null?void 0:e.additionalInformation)===null||o===void 0?void 0:o.isSj,orgClassNo:(c=e==null?void 0:e.additionalInformation)===null||c===void 0?void 0:c.orgClassNo,organClass:(h=e==null?void 0:e.additionalInformation)===null||h===void 0?void 0:h.organClass,userType:(E=e==null?void 0:e.additionalInformation)===null||E===void 0?void 0:E.userType},e)},V=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.dispatch;return M(void 0,void 0,void 0,function(){var i,u,f,g,o,c;return A(this,function(h){switch(h.label){case 0:return i=G(n).host,u=r||i,[4,k(Xe(n),{params:(c={},c[vt]=u,c)})];case 1:return f=h.sent(),g=f.data,!g||Object.getOwnPropertyNames(g).length===0?[2,Promise.reject()]:(o=he(f.data),window.location.origin.includes(n)&&st(a,o),[2,o])}})})},me=function(e){var t=e.authPageOrigin,n=e.origin,r=n===void 0?window.location.origin:n,a=e.whoAmIHost,i=e.whoAmIhost,u=e.clientId,f=e.platId,g=e.dp,o=e.ui,c=e.registerNoHeader,h=e.title,E=e.djcGatewayBaseUrl,I=e.loginSuccessRedirectUri,N=e.limitOrgType,y=e.preferOrgType,U=e.oauthState,b=e.onCancelLogin,j=e.closePopupRef,S=e.dispatch;return M(void 0,void 0,void 0,function(){var C,P,L,Fe;return A(this,function(x){switch(x.label){case 0:C=a||i,x.label=1;case 1:return x.trys.push([1,3,,5]),[4,V({dispatch:S,origin:r,whoAmIHost:C})];case 2:return P=x.sent(),[2,P];case 3:return x.sent(),[4,ve({origin:r,whoAmIHost:C,djcGatewayBaseUrl:E,clientId:u,platId:f,dp:g,ui:o,registerNoHeader:c,title:h,loginSuccessRedirectUri:I,limitOrgType:N,preferOrgType:y,extraParams:U})];case 4:return L=x.sent(),Fe=t+"/oauth-login"+L,[2,dt(Fe,b,j)];case 5:return[2]}})})},gt=function(e,t){return e===void 0&&(e=window.location.origin),M(void 0,void 0,void 0,function(){var n,r;return A(this,function(a){switch(a.label){case 0:return{}.VITE_DEPLOY==="PM"?[2,t+"/authing"]:[4,k(Je(e))];case 1:return n=a.sent(),[2,(r=n==null?void 0:n.data)===null||r===void 0?void 0:r.op]}})})},ht=function(e){return e.then(function(t){return{value:t,status:"resolved"}},function(t){return{error:t,status:"rejected"}})},mt=function(e,t){return t===void 0&&(t=5e3),new Promise(function(n,r){var a=new Image(0,0);a.onload=n,a.onerror=r,a.src=e,setTimeout(function(){r()},t)})},pt=function(e){e===void 0&&(e=[]);var t=e.filter(function(n){return n}).map(function(n){return mt(n)});return Promise.all(t.map(ht))},Et=function(e,t,n){return M(void 0,void 0,void 0,function(){var r;return A(this,function(a){switch(a.label){case 0:return[4,k(e+"/logout",{method:"DELETE",params:{success_uri:t}})];case 1:return r=a.sent().data,n&&n.length>0?[4,pt(n)]:[3,3];case 2:a.sent(),a.label=3;case 3:return window.open(r.location,"_top"),[2]}})})},pe=function(e){var t=e.djcGatewayBaseUrl,n=e.logoutRedirectUrl,r=e.otherLogoutUrls,a=e.origin;return M(void 0,void 0,void 0,function(){var i;return A(this,function(u){switch(u.label){case 0:return[4,gt(a,t)];case 1:return i=u.sent(),[4,Et(i,n,r)];case 2:return u.sent(),[2]}})})},Ee=function(e){var t=e.authPageOrigin,n=e.origin,r=e.ui,a=e.dp,i=e.djcGatewayBaseUrl,u=e.noHeader;return M(void 0,void 0,void 0,function(){var f,g,o;return A(this,function(c){switch(c.label){case 0:return f=t+"/register/select-type",g=null,[4,k(ce(i),{params:{orgDomainName:n?G(n).host:window.location.host}})];case 1:return o=c.sent().data,g=o==null?void 0:o.platformCode,window.open(""+f+_.default.stringify({ui:r,platId:g,dp:a,noHeader:u},{addQueryPrefix:!0,encode:!1}),"_blank"),[2]}})})},Me="globalContext",re=function(e){return e&&e[Me]?e[Me].me:void 0},Ae=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,i=e.dispatch;return V({dispatch:i,origin:n,whoAmIHost:r||a})},Oe=function(e){return M(void 0,void 0,void 0,function(){var t,n=e.loginPage,r=J(e,["loginPage"]);return A(this,function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,Ae(r)];case 1:return t=a.sent(),[2,t];case 2:return a.sent(),window.open(n,"_top"),[3,3];case 3:return[2]}})})},R=l.default.createContext({authPageOrigin:"",djcGatewayBaseUrl:"",toCenterPage:function(){}}),Mt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA0OCA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ4IDI0LjAyNjRDNDggMzcuMjY3MyAzNy4yNTQxIDQ4LjAwMzEgMjMuOTk3NSA0OC4wMDMxQzEwLjc0MjEgNDguMDAzMSAwIDM3LjI2NzMgMCAyNC4wMjY0QzAgMTMuODYzIDYuMzI2MDUgNS4xNzk4NyAxNS4yNjAyIDEuNjkwMzNDMTcuOTU5NiAwLjYwMTM3NiAyMC45MDg3IDAgMjMuOTk4MSAwQzI3LjA5MTMgMCAzMC4wMzc5IDAuNjAwNzY5IDMyLjczOTggMS42OTAzM0M0MS42NzM0IDUuMTc5ODcgNDggMTMuODYzIDQ4IDI0LjAyNjRaTTE0Ljc3MzMgMTguOTY5OUMxNC43NzMzIDIzLjAxMDUgMTYuODQzNiAyNi41MDg4IDE5Ljg1MzEgMjguMjIxMUMyMS4xMDEyIDI4LjkzMTQgMjIuNTA2NSAyOS4zNDA5IDIzLjk5NzUgMjkuMzQwOUMyNS40MzYxIDI5LjM0MDkgMjYuNzkyNSAyOC45NTc4IDI4LjAwNzkgMjguMjk2QzMxLjA4ODUgMjYuNjE2MyAzMy4yMjU1IDIzLjA3NTMgMzMuMjI1NSAxOC45NzA1QzMzLjIyNTUgMTMuMjU1MyAyOS4wODY4IDguNjAzMjggMjMuOTk3NSA4LjYwMzI4QzE4LjkxMTQgOC42MDI2NyAxNC43NzMzIDEzLjI1NDcgMTQuNzczMyAxOC45Njk5Wk0yNC4wOTUgNDYuNDQ5NEMzMS4xMDY3IDQ2LjQ0OTQgMzcuMzYxNiA0My4yMjQ3IDQxLjQ2MTMgMzguMTc4M0M0MC45NzcgMzQuMTk3NSAzNy4wOTggMzAuODA4NiAzMS42MDgxIDI5LjExODJDMjkuNTM0NyAzMC45ODM1IDI2Ljg4NTYgMzIuMTA1OCAyMy45OTY4IDMyLjEwNThDMjEuMDQzOSAzMi4xMDU4IDE4LjM0MDggMzAuOTIzMSAxNi4yNDcyIDI4Ljk3NjdDMTAuOTA2OSAzMC41MDA5IDYuOTk1MzIgMzMuNjA5OSA2LjA3ODE4IDM3LjMzNTNDMTAuMTQ2NCA0Mi44NjE3IDE2LjcwMzMgNDYuNDQ5NCAyNC4wOTUgNDYuNDQ5NFoiIGZpbGw9IiNDRUNGRTAiLz4KPC9zdmc+Cg==",we=function(e){var t=e.path,n=e.className,r=m.useContext(R).djcGatewayBaseUrl,a=m.useMemo(function(){return t?r+"/files?business=avatar&filePath="+t+"&fileName=file&attachment=false&contentType=image/png":Mt},[r,t]);return l.default.createElement(p.Avatar,{className:n,src:a})},$=function(e){return e.theme.textColorSecondary||"#697b8c"},De=function(e){return e.theme.linkColorHover||"#1890ff"},At=D.default.a(Ne||(Ne=O([`
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
`])),$,$,$,$,De,De),Ot=function(){try{return window.top.location.href}catch{return window.location.href}},wt=function(){var e=m.useContext(R),t=e.logoutRedirectUrl,n=J(e,["logoutRedirectUrl"]),r=m.useCallback(function(){return M(void 0,void 0,void 0,function(){return A(this,function(a){switch(a.label){case 0:return[4,pe(s(s({},n),{logoutRedirectUrl:t||Ot()}))];case 1:return a.sent(),[2]}})})},[n,t]);return l.default.createElement(At,{onClick:r},l.default.createElement("span",null,"\u9000\u51FA"),l.default.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4393",width:"20",height:"20"},l.default.createElement("path",{d:"M593.92 838.513v-95.355a40.96 40.96 0 1 1 81.92 0v95.355c0 45.26-35.226 83.087-80.22 83.087H203.1c-44.994 0-80.22-37.827-80.22-83.087V185.487c0-45.26 35.226-83.087 80.22-83.087h392.52c44.994 0 80.22 37.827 80.22 83.087v193.946a40.96 40.96 0 1 1-81.92 0V185.487c0-1.024 0.061-1.147 0.901-1.167H203.9c0.84 0 0.901 0.164 0.901 1.167v653.026c0 1.024-0.061 1.147-0.901 1.167H594.82c-0.84 0-0.901-0.164-0.901-1.167z","p-id":"4394"}),l.default.createElement("path",{d:"M471.04 512h327.68q40.96 0 40.96 40.96t-40.96 40.96H471.04q-40.96 0-40.96-40.96T471.04 512z","p-id":"4395"}),l.default.createElement("path",{d:"M811.199 422.828L912.57 524.2q28.963 28.963 0 57.926t-57.926 0l-101.37-101.37q-28.964-28.964 0-57.927 28.962-28.963 57.925 0z","p-id":"4396"}),l.default.createElement("path",{d:"M753.273 625.575l101.37-101.37q28.964-28.964 57.927 0 28.963 28.962 0 57.925L811.2 683.501q-28.964 28.963-57.927 0t0-57.926z","p-id":"4397"})))},Ne,Dt=p.Typography.Paragraph,Nt=D.default.div(ye||(ye=O([`
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
`])),q,q,q),It=D.default(we)(Pe||(Pe=O([`
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
`]))),Ie=D.default(Dt).attrs({ellipsis:!0})(Te||(Te=O([`
  &&& {
    margin: 0;
  }
`],[`
  &&& {
    margin: 0;
  }
`]))),yt=D.default(Ie)(Ce||(Ce=O([`
  font-size: 16px;
  font-weight: 700;
`],[`
  font-size: 16px;
  font-weight: 700;
`]))),Pt=function(e){var t,n,r,a=e.me,i=m.useContext(R).toCenterPage;return l.default.createElement(Nt,null,l.default.createElement(p.Menu,{mode:"vertical"},l.default.createElement(p.Menu.Item,{key:"avatar"},l.default.createElement(It,{path:(t=a.additionalInformation)===null||t===void 0?void 0:t.avatar})),l.default.createElement(p.Menu.Item,{key:"name"},a.realName&&l.default.createElement("a",{onClick:i},l.default.createElement(yt,null,a.realName)),((n=a.org)===null||n===void 0?void 0:n.orgName)&&l.default.createElement(Ie,null,(r=a.org)===null||r===void 0?void 0:r.orgName)),l.default.createElement(p.Menu.Divider,null),l.default.createElement(p.Menu.Item,{key:"logout"},l.default.createElement(wt,null))))},ye,Pe,Te,Ce,Tt=D.default(we)(_e||(_e=O([`
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
`]))),Ct=p.Typography.Text,_t=D.default(Ct)(be||(be=O([`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`],[`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`]))),bt=function(e){var t,n=e.me;return l.default.createElement(p.Popover,{placement:"bottom",autoAdjustOverflow:!1,content:l.default.createElement(Pt,{me:n})},l.default.createElement(Tt,{path:(t=n.additionalInformation)===null||t===void 0?void 0:t.avatar}),l.default.createElement(_t,{ellipsis:!0},n.realName))},_e,be,jt=function(){var e=m.useContext(R),t=m.useCallback(function(){Ee(e)},[e]);return l.default.createElement("a",{className:"register",onClick:t},"\u6CE8\u518C")},je=function(){return B.useSelector(re)},St=function(){var e=je(),t=B.useDispatch();return m.useEffect(function(){e||V({dispatch:t}).catch(function(){})},[e,t]),e},Lt=p.Typography.Text,xt=D.default(Lt).attrs({type:"secondary"})(Se||(Se=O([`
  margin: 0 8px;
`],[`
  margin: 0 8px;
`]))),Se,Le=function(e){var t=e.className,n=e.children,r=St();return l.default.createElement(R.Provider,{value:e},l.default.createElement("div",{className:t},r?l.default.createElement(bt,{me:r}):l.default.createElement(l.default.Fragment,null,n,l.default.createElement(xt,null,"\u6216"),l.default.createElement(jt,null))))},xe=function(e){var t=e.login;return l.default.createElement("a",{className:"login",onClick:t},"\u767B\u5F55")},zt=function(e){var t=e.loginPage,n=B.useDispatch(),r=m.useCallback(function(){Oe(s(s({},e),{dispatch:n}))},[n,e]);return l.default.createElement(Le,s({},e,{logoutRedirectUrl:t}),l.default.createElement(xe,{login:r}))},kt=function(e){var t=B.useDispatch(),n=m.useCallback(function(){me(s(s({},e),{dispatch:t}))},[t,e]);return l.default.createElement(Le,s({},e),l.default.createElement(xe,{login:n}))},v;(function(e){e[e.PLATFORM=1]="PLATFORM",e[e.APPROVAL=2]="APPROVAL",e[e.STOCK=3]="STOCK",e[e.AGENT=4]="AGENT",e[e.PROVIDER=5]="PROVIDER",e[e.FINANCE=7]="FINANCE",e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(v||(v={}));var Ht=v,w=function(e){switch(e){case v.PLATFORM:return"platform";case v.APPROVAL:return"approval";case v.STOCK:return"stock";case v.AGENT:return"agent";case v.PROVIDER:return"provider";case v.FINANCE:return"finance";case v.EMPLOYEE:return"employee";case v.EXPERT:return"expert";case v.TEACHER:return"teacher";default:return""}},Rt=[{label:"\u5E73\u53F0\u8FD0\u8425",value:v.PLATFORM},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:v.APPROVAL},{label:"\u91C7\u8D2D\u5355\u4F4D",value:v.STOCK},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:v.AGENT},{label:"\u4F9B\u5E94\u5546",value:v.PROVIDER},{label:"\u91D1\u878D\u673A\u6784",value:v.FINANCE},{label:"\u5355\u4F4D\u6210\u5458",value:v.EMPLOYEE},{label:"\u4E13\u5BB6",value:v.EXPERT},{label:"\u6559\u5E08",value:v.TEACHER}],Ut=[{label:"\u5E73\u53F0\u8FD0\u8425",value:w(v.PLATFORM).toUpperCase()},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:w(v.APPROVAL).toUpperCase()},{label:"\u91C7\u8D2D\u5355\u4F4D",value:w(v.STOCK).toUpperCase()},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:w(v.AGENT).toUpperCase()},{label:"\u4F9B\u5E94\u5546",value:w(v.PROVIDER).toUpperCase()},{label:"\u91D1\u878D\u673A\u6784",value:w(v.FINANCE).toUpperCase()},{label:"\u5355\u4F4D\u6210\u5458",value:w(v.EMPLOYEE).toUpperCase()},{label:"\u4E13\u5BB6",value:w(v.EXPERT).toUpperCase()},{label:"\u6559\u5E08",value:w(v.TEACHER).toUpperCase()}],ae;(function(e){e[e.ORG_ADMIN=101]="ORG_ADMIN",e[e.ORG_CHIEF=151]="ORG_CHIEF",e[e.SYS_RIGHT=102]="SYS_RIGHT",e[e.SYS_DUTY_MONITOR=104]="SYS_DUTY_MONITOR",e[e.SYS_DUTY=105]="SYS_DUTY",e[e.SYS_COM_ADMIN=107]="SYS_COM_ADMIN",e[e.SYS_GMSOFT_ADMIN=108]="SYS_GMSOFT_ADMIN",e[e.APPROVAL_ADMIN=201]="APPROVAL_ADMIN",e[e.APPROVAL_OPER=202]="APPROVAL_OPER",e[e.APPROVAL_LEADER=203]="APPROVAL_LEADER",e[e.STOCK_ADMIN=301]="STOCK_ADMIN",e[e.STOCK_OPER=302]="STOCK_OPER",e[e.STOCK_LEADER=303]="STOCK_LEADER",e[e.STOCK_FIN=304]="STOCK_FIN",e[e.AGENT_ADMIN=401]="AGENT_ADMIN",e[e.AGENT_OPER=402]="AGENT_OPER",e[e.AGENT_LEADER=403]="AGENT_LEADER",e[e.PROVIDER_ADMIN=501]="PROVIDER_ADMIN",e[e.PROVIDER_OPER=502]="PROVIDER_OPER",e[e.FINANC_ADMIN=701]="FINANC_ADMIN",e[e.FINANC_OPER=702]="FINANC_OPER"})(ae||(ae={}));var Bt=ae,ie;(function(e){e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(ie||(ie={}));var Ft=ie,oe;(function(e){e.DJC="DJC",e.XCJ="XCJ",e.ZCJ="ZCJ",e.PM="PM",e.ZRTD="ZRTD"})(oe||(oe={}));var Yt=oe,W="__token__",X="__token_param_key__",ze="__token__",Gt=function(e,t){var n;try{e&&t&&(window[X]=e,window[W]=t,window.history.replaceState(s(s({},window.history.state),(n={},n[X]=e,n[W]=t,n)),""))}catch{}},ke=function(){try{return window[X]||window.history.state[X]||ze}catch{return ze}},He=function(){try{return window[W]||window.history.state[W]}catch{return null}},ue=function(e){var t=_.default.parse(window.location.search,{ignoreQueryPrefix:!0})||{},n=e||ke(),r=t[n]||He();return Gt(n,r),r},Re=function(){var e,t=ke(),n=He();return n?(e={},e[t]=n,e):null},Ue=function(e){ue(e)},Kt=function(e){var t=e.url,n=e.target,r=n===void 0?"_self":n,a=e.extraParams,i=e.qsStringifyOptions,u=Re();if(u){var f=t.split("?"),g=f[0],o=f[1],c=_.default.stringify(s(s(s({},_.default.parse(o)),a),u),s({arrayFormat:"repeat",allowDots:!0},i)),h=[g,c].join("?");window.open(h,r)}},qt="Authorization",Be=function(e,t){var n,r=e.tokenParamKey,a=e.authHeaderKey;t===void 0&&(t={});var i=ue(r);if(i){var u=s(s({},t.headers),(n={},n[a||qt]=i,n));return s(s({},t),{headers:u})}return t};function Qt(e){return Ue(e.tokenParamKey),function(t){return Be(e,t)}}function Vt(e){return Ue(e.tokenParamKey),window.angular.module("HTInterceptor",[]).factory("HTInterceptor",function(){return{request:function(t){return Be(e,t)}}}).config(["$httpProvider",function(n){n.interceptors.push("HTInterceptor")}]),"HTInterceptor"}d.LoginByPageOrRegister=zt,d.LoginByPopupOrRegister=kt,d.OrgIdentityStringOptions=Ut,d.OrgIdentityType=Ht,d.OrgIdentityTypeOptions=Rt,d.RoleType=Bt,d.UIType=Yt,d.UserIdentity=Ft,d.angularHTInterceptor=Vt,d.angularTokenInterceptor=Ve,d.axiosHTInterceptor=Qt,d.axiosTokenInterceptor=F,d.buildLoginParams=se,d.buildLoginQueryString=ve,d.compatibilityMe=he,d.getOrgIdentityString=w,d.getToken=ee,d.getTokenLegacy=ue,d.getTokenWithKey=Re,d.jumpWithToken=Kt,d.loginByPage=Oe,d.loginByPopup=me,d.logout=pe,d.meSelector=re,d.meSeletor=re,d.register=Ee,d.requestMe=V,d.requestMeTrySSO=Ae,d.updateSelfTokenInterceptor=We,d.urlWithToken=$e,d.useMe=je,Object.defineProperties(d,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=auth-sdk.umd.js.map
