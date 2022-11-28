(function(c,m){typeof exports=="object"&&typeof module!="undefined"?m(exports,require("react"),require("react-redux"),require("axios"),require("qs"),require("react-dom"),require("styled-components"),require("antd")):typeof define=="function"&&define.amd?define(["exports","react","react-redux","axios","qs","react-dom","styled-components","antd"],m):(c=typeof globalThis!="undefined"?globalThis:c||self,m(c.AuthSDK={},c.React,c.ReactRedux,c.axios,c.Qs,c.ReactDOM,c.styled,c.antd))})(this,function(c,m,B,Ve,$e,We,W,p){"use strict";function x(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var u=x(m),Xe=x(Ve),j=x($e),fe=x(We),I=x(W);/*! *****************************************************************************
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
    ***************************************************************************** */var d=function(){return d=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},d.apply(this,arguments)};function X(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function A(e,t,n,r){function a(o){return o instanceof n?o:new n(function(l){l(o)})}return new(n||(n=Promise))(function(o,l){function f(s){try{i(r.next(s))}catch(h){l(h)}}function g(s){try{i(r.throw(s))}catch(h){l(h)}}function i(s){s.done?o(s.value):a(s.value).then(f,g)}i((r=r.apply(e,t||[])).next())})}function w(e,t){var n={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},r,a,o,l;return l={next:f(0),throw:f(1),return:f(2)},typeof Symbol=="function"&&(l[Symbol.iterator]=function(){return this}),l;function f(i){return function(s){return g([i,s])}}function g(i){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,a&&(o=i[0]&2?a.return:i[0]?a.throw||((o=a.return)&&o.call(a),0):a.next)&&!(o=o.call(a,i[1])).done)return o;switch(a=0,o&&(i=[i[0]&2,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return n.label++,{value:i[1],done:!1};case 5:n.label++,a=i[1],i=[0];continue;case 7:i=n.ops.pop(),n.trys.pop();continue;default:if(o=n.trys,!(o=o.length>0&&o[o.length-1])&&(i[0]===6||i[0]===2)){n=0;continue}if(i[0]===3&&(!o||i[1]>o[0]&&i[1]<o[3])){n.label=i[1];break}if(i[0]===6&&n.label<o[1]){n.label=o[1],o=i;break}if(o&&n.label<o[2]){n.label=o[2],n.ops.push(i);break}o[2]&&n.ops.pop(),n.trys.pop();continue}i=t.call(e,n)}catch(s){i=[6,s],a=0}finally{r=o=0}if(i[0]&5)throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}}function O(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var S=function(e,t){return Xe.default(d({url:e,withCredentials:!0,paramsSerializer:function(n){return j.default.stringify(n,{arrayFormat:"repeat",allowDots:!0})}},t))};function Y(e){if(!e)return{};var t=e.startsWith("//")?""+window.location.protocol+e:e,n={},r=["href","origin","protocol","host","hostname","port","pathname","search","hash"],a=/(([^:]+:)\/\/(([^:/?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/,o=a.exec(t);if(o)for(var l=r.length-1;l>=0;--l)n[r[l]]=o[l]?o[l]:"";return n}var Ze=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/user?requireAvatar=true"},Je=function(e){return e===void 0&&(e=window.location.origin),e+"/gateway/v1/login"},et=function(e){e===void 0&&(e=window.location.origin);var t=Y(e).host;return e+"/gateway/v1/op?host="+encodeURIComponent(t)},tt=function(e){return e+"/oauth/authorize"},ge=function(e){return e+"/djcsupport/domainname/getPlatformConfigure"},nt=function(e,t,n){return n||(t?e+"@"+t:"plat@"+e)},rt=function(e,t){return t||(e||window.location.origin)+"/login-app/login-success/index.html"},Z=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,o=e.djcGatewayBaseUrl,l=e.platId,f=e.dp,g=e.ui,i=e.registerNoHeader,s=e.title,h=e.clientId,E=e.loginSuccessRedirectUri,y=e.limitOrgTypes,C=e.errorMessage,U=e.extraParams;return A(void 0,void 0,void 0,function(){var L,b,P,N;return w(this,function(z){switch(z.label){case 0:return L=Y(n).host,b=l,l?[3,2]:[4,S(ge(o),{params:{orgDomainName:L}})];case 1:P=z.sent().data,b=P==null?void 0:P.platformCode,z.label=2;case 2:return b?[2,d(d({},U),{ui:g,register_no_header:i,title:s,client_id:nt(b,f,h),scope:r||a||L,login_sucess_redirect_uri:rt(n,E),redirect_uri:Je(n),is_fpa:!0,error_message:C,options:y&&{limitOrgTypes:y}})]:(N="\u672A\u67E5\u8BE2\u5230 "+L+" \u5BF9\u5E94\u7684\u5E73\u53F0\u4FE1\u606F, \u8BF7\u68C0\u67E5\u5E73\u53F0\u914D\u7F6E\u662F\u5426\u6B63\u786E",console.log(N),[2,Promise.reject(new Error(N))])}})})},at=function(e,t){return A(void 0,void 0,void 0,function(){var n;return w(this,function(r){switch(r.label){case 0:return[4,S(tt(e),{headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"},params:d(d({},t),{tenantId:"gmsoft-web"})})];case 1:return n=r.sent(),[2,(n==null?void 0:n.data)||{}]}})})},G=function(){try{return(top==null?void 0:top.document.querySelector("#mount-root"))||top.document.body}catch{return document.body}};function ot(e){return e&&e.parentNode?e.parentNode:G()}var J="gmsoft-ui-top-body-need-inject-css",ee=function(e){top[J]=e},it=function(){return top[J]===void 0&&ee(!0),top[J]},ut=W.createGlobalStyle(he||(he=O([`
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
`]))),lt=function(){m.useEffect(function(){return ee(!1),function(){ee(!0)}})},ct=function(){var e=m.useState(function(){return it()})[0];return lt(),e?u.default.createElement(ut,null):null},he,dt=G(),T=function(e){var t=e.children,n=e.width,r=e.getContainer,a=X(e,["children","width","getContainer"]);return a.visible!==!0?null:u.default.createElement(W.StyleSheetManager,{target:dt},u.default.createElement(u.default.Fragment,null,u.default.createElement(ct,null),u.default.createElement(p.Modal,d({getContainer:r||G,width:n},a),u.default.createElement(p.ConfigProvider,{getPopupContainer:ot},t))))},k=function(e){return function(t){return p.Modal[e](d({getContainer:G},t))}};T.info=k("info"),T.success=k("success"),T.error=k("error"),T.warning=k("warning"),T.confirm=k("confirm"),T.destroyAll=p.Modal.destroyAll;var K="ant",Q=function(){},st=I.default(T)(me||(me=O([`
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
`])),K),vt=function(e,t,n){Q&&Q();var r=document.createElement("div");document.body.appendChild(r);var a=function(){return fe.default.unmountComponentAtNode(r)};return Q=function(){t&&typeof t=="function"&&t(),a()},fe.default.render(u.default.createElement(st,{visible:!0,maskClosable:!0,closable:!1,footer:null,closeIcon:null,onCancel:Q,width:366},u.default.createElement("iframe",{title:"loginBox",className:"login-form-box",src:e,width:"360px",height:"440px",scrolling:"no",style:{margin:0,padding:0,display:"block"},frameBorder:"0"})),r),n&&(n.current=a),a},me,ft="@@GLOBAL_CONTEXT/SET";function gt(e,t){e&&e({type:ft,payload:{me:t}})}var ht="__platDomain__",mt=function(e){return e?e.findIndex(function(t){return String(t).endsWith("01")})!==-1:!1},pe=function(e){var t,n,r,a,o,l,f,g,i,s,h,E;if(!(!e||Object.getOwnPropertyNames(e).length===0))return d({admin:mt(e==null?void 0:e.roles),adminAreaId:(t=e==null?void 0:e.org)===null||t===void 0?void 0:t.areaId,adminAreaName:(n=e==null?void 0:e.org)===null||n===void 0?void 0:n.areaName,maintainPlatId:(r=e==null?void 0:e.additionalInformation)===null||r===void 0?void 0:r.mpi,orgId:(a=e==null?void 0:e.org)===null||a===void 0?void 0:a.orgId,orgName:(o=e==null?void 0:e.org)===null||o===void 0?void 0:o.orgName,orgType:(l=e==null?void 0:e.org)===null||l===void 0?void 0:l.orgType,userName:e==null?void 0:e.realName,userTypes:e!=null&&e.roles?e==null?void 0:e.roles.join(","):void 0,deptRole:(f=e==null?void 0:e.additionalInformation)===null||f===void 0?void 0:f.deptRole,isBidDown:(g=e==null?void 0:e.additionalInformation)===null||g===void 0?void 0:g.isBidDown,isSj:(i=e==null?void 0:e.additionalInformation)===null||i===void 0?void 0:i.isSj,orgClassNo:(s=e==null?void 0:e.additionalInformation)===null||s===void 0?void 0:s.orgClassNo,organClass:(h=e==null?void 0:e.additionalInformation)===null||h===void 0?void 0:h.organClass,userType:(E=e==null?void 0:e.additionalInformation)===null||E===void 0?void 0:E.userType},e)},H=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.dispatch;return A(void 0,void 0,void 0,function(){var o,l,f,g,i,s;return w(this,function(h){switch(h.label){case 0:return o=Y(n).host,l=r||o,[4,S(Ze(n),{params:(s={},s[ht]=l,s)})];case 1:return f=h.sent(),g=f.data,!g||Object.getOwnPropertyNames(g).length===0?[2,Promise.reject()]:(i=pe(f.data),window.location.origin.includes(n)&&gt(a,i),[2,i])}})})},Ee=function(e,t){return e===void 0&&(e=window.location.origin),A(void 0,void 0,void 0,function(){var n,r;return w(this,function(a){switch(a.label){case 0:return{}.VITE_DEPLOY==="PM"?[2,t+"/authing"]:[4,S(et(e))];case 1:return n=a.sent(),[2,(r=n==null?void 0:n.data)===null||r===void 0?void 0:r.op]}})})},Me=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,o=e.clientId,l=e.platId,f=e.dp,g=e.ui,i=e.registerNoHeader,s=e.title,h=e.djcGatewayBaseUrl,E=e.loginSuccessRedirectUri,y=e.limitOrgTypes,C=e.oauthState,U=e.onCancelLogin,L=e.closePopupRef,b=e.dispatch;return A(void 0,void 0,void 0,function(){var P,F,N,z,ie,ue,Qe,F,le,_,qe,ce,de,se,ve;return w(this,function(M){switch(M.label){case 0:P=r||a,M.label=1;case 1:return M.trys.push([1,3,,12]),[4,H({dispatch:b,origin:n,whoAmIHost:P})];case 2:return F=M.sent(),[2,F];case 3:return M.sent(),[4,Z({origin:n,whoAmIHost:P,djcGatewayBaseUrl:h,clientId:o,platId:l,dp:f,ui:g,registerNoHeader:i,title:s,loginSuccessRedirectUri:E,limitOrgTypes:y,extraParams:C})];case 4:return N=M.sent(),[4,Ee(n,h)];case 5:z=M.sent(),M.label=6;case 6:return M.trys.push([6,10,,11]),[4,at(z,{response_type:"code",client_id:N.client_id,redirect_uri:N.redirect_uri,scope:N.scope,options:N.options,state:JSON.stringify(N)})];case 7:return ie=M.sent(),ue=ie.location,Qe=ie.res,Qe!==0?[3,9]:[4,H({dispatch:b,origin:n,whoAmIHost:P}).catch(function(){console.error("\u670D\u52A1\u5668\u9519\u8BEF, \u767B\u5F55\u6210\u529F, \u4F46\u83B7\u53D6\u767B\u5F55\u7528\u6237\u4FE1\u606F\u5931\u8D25!")})];case 8:return F=M.sent(),[2,F];case 9:return ue?[2,vt(ue,U,L)]:(console.log("login error, mode=popup, authorize not response location"),[3,11]);case 10:return le=M.sent(),_=le,qe=((de=(ce=_==null?void 0:_.response)===null||ce===void 0?void 0:ce.data)===null||de===void 0?void 0:de.error_message)||((ve=(se=_==null?void 0:_.response)===null||se===void 0?void 0:se.data)===null||ve===void 0?void 0:ve.message)||_.message||"\u670D\u52A1\u5668\u7AEF\u9519\u8BEF",console.error(qe,le),[3,11];case 11:return[3,12];case 12:return[2]}})})},pt=function(e){return e.then(function(t){return{value:t,status:"resolved"}},function(t){return{error:t,status:"rejected"}})},Et=function(e,t){return t===void 0&&(t=5e3),new Promise(function(n,r){var a=new Image(0,0);a.onload=n,a.onerror=r,a.src=e,setTimeout(function(){r()},t)})},Mt=function(e){e===void 0&&(e=[]);var t=e.filter(function(n){return n}).map(function(n){return Et(n)});return Promise.all(t.map(pt))},At=function(e,t,n){return A(void 0,void 0,void 0,function(){var r;return w(this,function(a){switch(a.label){case 0:return[4,S(e+"/logout",{method:"DELETE",params:{success_uri:t}})];case 1:return r=a.sent().data,n&&n.length>0?[4,Mt(n)]:[3,3];case 2:a.sent(),a.label=3;case 3:return window.open(r.location,"_top"),[2]}})})},Ae=function(e){var t=e.djcGatewayBaseUrl,n=e.logoutRedirectUrl,r=e.otherLogoutUrls,a=e.origin;return A(void 0,void 0,void 0,function(){var o;return w(this,function(l){switch(l.label){case 0:return[4,Ee(a,t)];case 1:return o=l.sent(),[4,At(o,n,r)];case 2:return l.sent(),[2]}})})},we=function(e){var t=e.authPageOrigin,n=e.origin,r=e.ui,a=e.dp,o=e.djcGatewayBaseUrl,l=e.noHeader;return A(void 0,void 0,void 0,function(){var f,g,i;return w(this,function(s){switch(s.label){case 0:return f=t+"/register/select-type",g=null,[4,S(ge(o),{params:{orgDomainName:n?Y(n).host:window.location.host}})];case 1:return i=s.sent().data,g=i==null?void 0:i.platformCode,window.open(""+f+j.default.stringify({ui:r,platId:g,dp:a,noHeader:l},{addQueryPrefix:!0,encode:!1}),"_blank"),[2]}})})},wt=function(e){return A(void 0,void 0,void 0,function(){var t;return w(this,function(n){switch(n.label){case 0:return[4,Z(e)];case 1:return t=n.sent(),[2,j.default.stringify(t,{addQueryPrefix:!0})]}})})},Ot="globalContext",te=function(e){return e[Ot].me},Oe=function(e){var t=e.origin,n=t===void 0?window.location.origin:t,r=e.whoAmIHost,a=e.whoAmIhost,o=e.dispatch;return H({dispatch:o,origin:n,whoAmIHost:r||a})},De=function(e){return A(void 0,void 0,void 0,function(){var t,n=e.loginPage,r=X(e,["loginPage"]);return w(this,function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,Oe(r)];case 1:return t=a.sent(),[2,t];case 2:return a.sent(),window.open(n,"_top"),[3,3];case 3:return[2]}})})},R=u.default.createContext({authPageOrigin:"",djcGatewayBaseUrl:"",toCenterPage:function(){}}),Dt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA0OCA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ4IDI0LjAyNjRDNDggMzcuMjY3MyAzNy4yNTQxIDQ4LjAwMzEgMjMuOTk3NSA0OC4wMDMxQzEwLjc0MjEgNDguMDAzMSAwIDM3LjI2NzMgMCAyNC4wMjY0QzAgMTMuODYzIDYuMzI2MDUgNS4xNzk4NyAxNS4yNjAyIDEuNjkwMzNDMTcuOTU5NiAwLjYwMTM3NiAyMC45MDg3IDAgMjMuOTk4MSAwQzI3LjA5MTMgMCAzMC4wMzc5IDAuNjAwNzY5IDMyLjczOTggMS42OTAzM0M0MS42NzM0IDUuMTc5ODcgNDggMTMuODYzIDQ4IDI0LjAyNjRaTTE0Ljc3MzMgMTguOTY5OUMxNC43NzMzIDIzLjAxMDUgMTYuODQzNiAyNi41MDg4IDE5Ljg1MzEgMjguMjIxMUMyMS4xMDEyIDI4LjkzMTQgMjIuNTA2NSAyOS4zNDA5IDIzLjk5NzUgMjkuMzQwOUMyNS40MzYxIDI5LjM0MDkgMjYuNzkyNSAyOC45NTc4IDI4LjAwNzkgMjguMjk2QzMxLjA4ODUgMjYuNjE2MyAzMy4yMjU1IDIzLjA3NTMgMzMuMjI1NSAxOC45NzA1QzMzLjIyNTUgMTMuMjU1MyAyOS4wODY4IDguNjAzMjggMjMuOTk3NSA4LjYwMzI4QzE4LjkxMTQgOC42MDI2NyAxNC43NzMzIDEzLjI1NDcgMTQuNzczMyAxOC45Njk5Wk0yNC4wOTUgNDYuNDQ5NEMzMS4xMDY3IDQ2LjQ0OTQgMzcuMzYxNiA0My4yMjQ3IDQxLjQ2MTMgMzguMTc4M0M0MC45NzcgMzQuMTk3NSAzNy4wOTggMzAuODA4NiAzMS42MDgxIDI5LjExODJDMjkuNTM0NyAzMC45ODM1IDI2Ljg4NTYgMzIuMTA1OCAyMy45OTY4IDMyLjEwNThDMjEuMDQzOSAzMi4xMDU4IDE4LjM0MDggMzAuOTIzMSAxNi4yNDcyIDI4Ljk3NjdDMTAuOTA2OSAzMC41MDA5IDYuOTk1MzIgMzMuNjA5OSA2LjA3ODE4IDM3LjMzNTNDMTAuMTQ2NCA0Mi44NjE3IDE2LjcwMzMgNDYuNDQ5NCAyNC4wOTUgNDYuNDQ5NFoiIGZpbGw9IiNDRUNGRTAiLz4KPC9zdmc+Cg==",Ne=function(e){var t=e.path,n=e.className,r=m.useContext(R).djcGatewayBaseUrl,a=m.useMemo(function(){return t?r+"/files?business=avatar&filePath="+t+"&fileName=file&attachment=false&contentType=image/png":Dt},[r,t]);return u.default.createElement(p.Avatar,{className:n,src:a})},q=function(e){return e.theme.textColorSecondary||"#697b8c"},Ie=function(e){return e.theme.linkColorHover||"#1890ff"},Nt=I.default.a(ye||(ye=O([`
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
`])),q,q,q,q,Ie,Ie),It=function(){try{return window.top.location.href}catch{return window.location.href}},yt=function(){var e=m.useContext(R),t=e.logoutRedirectUrl,n=X(e,["logoutRedirectUrl"]),r=m.useCallback(function(){return A(void 0,void 0,void 0,function(){return w(this,function(a){switch(a.label){case 0:return[4,Ae(d(d({},n),{logoutRedirectUrl:t||It()}))];case 1:return a.sent(),[2]}})})},[n,t]);return u.default.createElement(Nt,{onClick:r},u.default.createElement("span",null,"\u9000\u51FA"),u.default.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4393",width:"20",height:"20"},u.default.createElement("path",{d:"M593.92 838.513v-95.355a40.96 40.96 0 1 1 81.92 0v95.355c0 45.26-35.226 83.087-80.22 83.087H203.1c-44.994 0-80.22-37.827-80.22-83.087V185.487c0-45.26 35.226-83.087 80.22-83.087h392.52c44.994 0 80.22 37.827 80.22 83.087v193.946a40.96 40.96 0 1 1-81.92 0V185.487c0-1.024 0.061-1.147 0.901-1.167H203.9c0.84 0 0.901 0.164 0.901 1.167v653.026c0 1.024-0.061 1.147-0.901 1.167H594.82c-0.84 0-0.901-0.164-0.901-1.167z","p-id":"4394"}),u.default.createElement("path",{d:"M471.04 512h327.68q40.96 0 40.96 40.96t-40.96 40.96H471.04q-40.96 0-40.96-40.96T471.04 512z","p-id":"4395"}),u.default.createElement("path",{d:"M811.199 422.828L912.57 524.2q28.963 28.963 0 57.926t-57.926 0l-101.37-101.37q-28.964-28.964 0-57.927 28.962-28.963 57.925 0z","p-id":"4396"}),u.default.createElement("path",{d:"M753.273 625.575l101.37-101.37q28.964-28.964 57.927 0 28.963 28.962 0 57.925L811.2 683.501q-28.964 28.963-57.927 0t0-57.926z","p-id":"4397"})))},ye,Pt=p.Typography.Paragraph,Ct=I.default.div(Ce||(Ce=O([`
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
`])),K,K,K),_t=I.default(Ne)(_e||(_e=O([`
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
`]))),Pe=I.default(Pt).attrs({ellipsis:!0})(Te||(Te=O([`
  &&& {
    margin: 0;
  }
`],[`
  &&& {
    margin: 0;
  }
`]))),Tt=I.default(Pe)(be||(be=O([`
  font-size: 16px;
  font-weight: 700;
`],[`
  font-size: 16px;
  font-weight: 700;
`]))),bt=function(e){var t,n,r,a=e.me,o=m.useContext(R).toCenterPage;return u.default.createElement(Ct,null,u.default.createElement(p.Menu,{mode:"vertical"},u.default.createElement(p.Menu.Item,{key:"avatar"},u.default.createElement(_t,{path:(t=a.additionalInformation)===null||t===void 0?void 0:t.avatar})),u.default.createElement(p.Menu.Item,{key:"name"},a.realName&&u.default.createElement("a",{onClick:o},u.default.createElement(Tt,null,a.realName)),((n=a.org)===null||n===void 0?void 0:n.orgName)&&u.default.createElement(Pe,null,(r=a.org)===null||r===void 0?void 0:r.orgName)),u.default.createElement(p.Menu.Divider,null),u.default.createElement(p.Menu.Item,{key:"logout"},u.default.createElement(yt,null))))},Ce,_e,Te,be,jt=I.default(Ne)(je||(je=O([`
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
`]))),St=p.Typography.Text,Lt=I.default(St)(Se||(Se=O([`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`],[`
  &&& {
    max-width: 150px;
    vertical-align: middle;
  }
`]))),zt=function(e){var t,n=e.me;return u.default.createElement(p.Popover,{placement:"bottom",autoAdjustOverflow:!1,content:u.default.createElement(bt,{me:n})},u.default.createElement(jt,{path:(t=n.additionalInformation)===null||t===void 0?void 0:t.avatar}),u.default.createElement(Lt,{ellipsis:!0},n.realName))},je,Se,xt=function(){var e=m.useContext(R),t=m.useCallback(function(){we(e)},[e]);return u.default.createElement("a",{className:"register",onClick:t},"\u6CE8\u518C")},Le=function(){return B.useSelector(te)},kt=function(){var e=Le(),t=B.useDispatch();return m.useEffect(function(){e||H({dispatch:t}).catch(function(){})},[e,t]),e},Ht=p.Typography.Text,Rt=I.default(Ht).attrs({type:"secondary"})(ze||(ze=O([`
  margin: 0 8px;
`],[`
  margin: 0 8px;
`]))),ze,xe=function(e){var t=e.className,n=e.children,r=kt();return u.default.createElement(R.Provider,{value:e},u.default.createElement("div",{className:t},r?u.default.createElement(zt,{me:r}):u.default.createElement(u.default.Fragment,null,n,u.default.createElement(Rt,null,"\u6216"),u.default.createElement(xt,null))))},ke=function(e){var t=e.login;return u.default.createElement("a",{className:"login",onClick:t},"\u767B\u5F55")},Ut=function(e){var t=e.loginPage,n=B.useDispatch(),r=m.useCallback(function(){De(d(d({},e),{dispatch:n}))},[n,e]);return u.default.createElement(xe,d({},e,{logoutRedirectUrl:t}),u.default.createElement(ke,{login:r}))},Ft=function(e){var t=B.useDispatch(),n=m.useCallback(function(){Me(d(d({},e),{dispatch:t}))},[t,e]);return u.default.createElement(xe,d({},e),u.default.createElement(ke,{login:n}))},He=function(e,t){try{if(document.cookie&&document.cookie.length>0){var n=document.cookie.split(/\s*;\s*/);if(n&&n.length>0){var r=n.find(function(o){return o.startsWith(e)}),a=r?r.split("=")[1]:null;return a&&t?t+" "+a:a}}return null}catch{return null}},Bt=function(e){var t=e===void 0?{}:e,n=t.platDomain,r=n===void 0?window.location.host:n,a=t.platDomainKey,o=a===void 0?"__platDomain__":a,l=t.notSetPlatDomain,f=l===void 0?!1:l,g=t.authCookieKey,i=g===void 0?"Auth":g,s=t.authHeaderKey,h=s===void 0?"Authorization":s,E=t.authScheme,y=E===void 0?"Auth":E,C=t.notSetAuthHeader,U=C===void 0?!1:C;return{platDomain:r,platDomainKey:o,notSetPlatDomain:f,authCookieKey:i,authHeaderKey:h,authScheme:y,notSetAuthHeader:U}},Re=function(e){return function(t){var n,r,a=Bt(e),o=a.platDomain,l=a.platDomainKey,f=a.notSetPlatDomain,g=a.authCookieKey,i=a.authHeaderKey,s=a.authScheme,h=a.notSetAuthHeader,E=f||!o||t.params&&t.params[l]?t.params:d(d({},t.params),(n={},n[l]=o,n)),y=He(g,s),C=h||!y||t.headers[i]?t.headers:d(d({},t.headers),(r={},r[i]=y,r));return d(d({},t),{params:E,headers:C})}},Yt=function(e){var t="tokenInterceptor";return window.angular&&window.angular.module(t,[]).factory(t,function(){return{request:function(n){return Re(e)(n)}}}).config(["$httpProvider",function(r){r.interceptors.push(t)}]),t},Gt=function(e,t,n){t===void 0&&(t="__auth__"),n===void 0&&(n="Auth");var r=He(n);return""+e+(e.indexOf("?")!==-1?"&":"?")+t+"="+r},v;(function(e){e[e.PLATFORM=1]="PLATFORM",e[e.APPROVAL=2]="APPROVAL",e[e.STOCK=3]="STOCK",e[e.AGENT=4]="AGENT",e[e.PROVIDER=5]="PROVIDER",e[e.FINANCE=7]="FINANCE",e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(v||(v={}));var Kt=v,D=function(e){switch(e){case v.PLATFORM:return"platform";case v.APPROVAL:return"approval";case v.STOCK:return"stock";case v.AGENT:return"agent";case v.PROVIDER:return"provider";case v.FINANCE:return"finance";case v.EMPLOYEE:return"employee";case v.EXPERT:return"expert";case v.TEACHER:return"teacher";default:return""}},Qt=[{label:"\u5E73\u53F0\u8FD0\u8425",value:v.PLATFORM},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:v.APPROVAL},{label:"\u91C7\u8D2D\u5355\u4F4D",value:v.STOCK},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:v.AGENT},{label:"\u4F9B\u5E94\u5546",value:v.PROVIDER},{label:"\u91D1\u878D\u673A\u6784",value:v.FINANCE},{label:"\u5355\u4F4D\u6210\u5458",value:v.EMPLOYEE},{label:"\u4E13\u5BB6",value:v.EXPERT},{label:"\u6559\u5E08",value:v.TEACHER}],qt=[{label:"\u5E73\u53F0\u8FD0\u8425",value:D(v.PLATFORM).toUpperCase()},{label:"\u4E3B\u7BA1\u5355\u4F4D",value:D(v.APPROVAL).toUpperCase()},{label:"\u91C7\u8D2D\u5355\u4F4D",value:D(v.STOCK).toUpperCase()},{label:"\u91C7\u8D2D\u4EE3\u7406\u673A\u6784",value:D(v.AGENT).toUpperCase()},{label:"\u4F9B\u5E94\u5546",value:D(v.PROVIDER).toUpperCase()},{label:"\u91D1\u878D\u673A\u6784",value:D(v.FINANCE).toUpperCase()},{label:"\u5355\u4F4D\u6210\u5458",value:D(v.EMPLOYEE).toUpperCase()},{label:"\u4E13\u5BB6",value:D(v.EXPERT).toUpperCase()},{label:"\u6559\u5E08",value:D(v.TEACHER).toUpperCase()}],ne;(function(e){e[e.ORG_ADMIN=101]="ORG_ADMIN",e[e.ORG_CHIEF=151]="ORG_CHIEF",e[e.SYS_RIGHT=102]="SYS_RIGHT",e[e.SYS_DUTY_MONITOR=104]="SYS_DUTY_MONITOR",e[e.SYS_DUTY=105]="SYS_DUTY",e[e.SYS_COM_ADMIN=107]="SYS_COM_ADMIN",e[e.SYS_GMSOFT_ADMIN=108]="SYS_GMSOFT_ADMIN",e[e.APPROVAL_ADMIN=201]="APPROVAL_ADMIN",e[e.APPROVAL_OPER=202]="APPROVAL_OPER",e[e.APPROVAL_LEADER=203]="APPROVAL_LEADER",e[e.STOCK_ADMIN=301]="STOCK_ADMIN",e[e.STOCK_OPER=302]="STOCK_OPER",e[e.STOCK_LEADER=303]="STOCK_LEADER",e[e.STOCK_FIN=304]="STOCK_FIN",e[e.AGENT_ADMIN=401]="AGENT_ADMIN",e[e.AGENT_OPER=402]="AGENT_OPER",e[e.AGENT_LEADER=403]="AGENT_LEADER",e[e.PROVIDER_ADMIN=501]="PROVIDER_ADMIN",e[e.PROVIDER_OPER=502]="PROVIDER_OPER",e[e.FINANC_ADMIN=701]="FINANC_ADMIN",e[e.FINANC_OPER=702]="FINANC_OPER"})(ne||(ne={}));var Vt=ne,re;(function(e){e[e.EMPLOYEE=101]="EMPLOYEE",e[e.EXPERT=102]="EXPERT",e[e.TEACHER=103]="TEACHER"})(re||(re={}));var $t=re,ae;(function(e){e.DJC="DJC",e.XCJ="XCJ",e.ZCJ="ZCJ",e.PM="PM",e.ZRTD="ZRTD"})(ae||(ae={}));var Wt=ae,V="__token__",$="__token_param_key__",Ue="__token__",Xt=function(e,t){var n;try{e&&t&&(window[$]=e,window[V]=t,window.history.replaceState(d(d({},window.history.state),(n={},n[$]=e,n[V]=t,n)),""))}catch{}},Fe=function(){try{return window[$]||window.history.state[$]||Ue}catch{return Ue}},Be=function(){try{return window[V]||window.history.state[V]}catch{return null}},oe=function(e){var t=j.default.parse(window.location.search,{ignoreQueryPrefix:!0})||{},n=e||Fe(),r=t[n]||Be();return Xt(n,r),r},Ye=function(){var e,t=Fe(),n=Be();return n?(e={},e[t]=n,e):null},Ge=function(e){oe(e)},Zt=function(e){var t=e.url,n=e.target,r=n===void 0?"_self":n,a=e.extraParams,o=e.qsStringifyOptions,l=Ye();if(l){var f=t.split("?"),g=f[0],i=f[1],s=j.default.stringify(d(d(d({},j.default.parse(i)),a),l),d({arrayFormat:"repeat",allowDots:!0},o)),h=[g,s].join("?");window.open(h,r)}},Jt="Authorization",Ke=function(e,t){var n,r=e.tokenParamKey,a=e.authHeaderKey;t===void 0&&(t={});var o=oe(r);if(o){var l=d(d({},t.headers),(n={},n[a||Jt]=o,n));return d(d({},t),{headers:l})}return t};function en(e){return Ge(e.tokenParamKey),function(t){return Ke(e,t)}}function tn(e){return Ge(e.tokenParamKey),window.angular.module("HTInterceptor",[]).factory("HTInterceptor",function(){return{request:function(t){return Ke(e,t)}}}).config(["$httpProvider",function(n){n.interceptors.push("HTInterceptor")}]),"HTInterceptor"}c.LoginByPageOrRegister=Ut,c.LoginByPopupOrRegister=Ft,c.OrgIdentityStringOptions=qt,c.OrgIdentityType=Kt,c.OrgIdentityTypeOptions=Qt,c.RoleType=Vt,c.UIType=Wt,c.UserIdentity=$t,c.angularHTInterceptor=tn,c.angularTokenInterceptor=Yt,c.axiosHTInterceptor=en,c.axiosTokenInterceptor=Re,c.buildLoginParams=Z,c.buildLoginQueryString=wt,c.compatibilityMe=pe,c.getOrgIdentityString=D,c.getToken=oe,c.getTokenWithKey=Ye,c.jumpWithToken=Zt,c.loginByPage=De,c.loginByPopup=Me,c.logout=Ae,c.meSelector=te,c.meSeletor=te,c.register=we,c.requestMe=H,c.requestMeTrySSO=Oe,c.urlWithToken=Gt,c.useMe=Le,Object.defineProperties(c,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=auth-sdk.umd.js.map
