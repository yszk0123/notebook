parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"T1T2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CounterPage=void 0;var e=s(require("react")),t=require(".."),n=require("../../../app/components/layouts/CenterLayout"),r=require("../../../app/components/layouts/VerticalStackLayout"),o=i(require("../../../app/useRedux")),u=require("../../../components/Button"),a=require("../../../components/Text"),c=require("../../../styled-components"),l=require("../counter-type");function i(e){return e&&e.__esModule?e:{default:e}}function s(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}const p=(0,c.styled)(n.CenterLayout)`
  margin-top: ${({theme:e})=>e.space};
`,d=(0,c.styled)(a.Text)`
  display: flex;
  justify-content: center;
  margin: ${({theme:e})=>e.space};
`,f=c.styled.div`
  display: flex;
  justify-content: center;
  margin: ${({theme:e})=>e.space};

  & > ${u.Button} {
    margin: 0 ${({theme:e})=>e.space};
  }
`,m=()=>{const[{count:n,loading:c},i]=(0,o.default)(y),s=(0,e.useCallback)(()=>i(l.counterActions.increment()),[i]),m=(0,e.useCallback)(()=>i(t.counterEffects.incrementByTen()),[i]);return c?e.default.createElement(a.Text,null,"Loading..."):e.default.createElement(p,null,e.default.createElement(r.VerticalStackLayout,null,e.default.createElement(d,null,"Count: ",n),e.default.createElement(f,null,e.default.createElement(u.Button,{onClick:s},"Increment"),e.default.createElement(u.Button,{onClick:m},"Increment by 10"))))};function y(e){const{count:t}=e.counter,{loading:n}=e.routing;return{count:t,loading:n}}exports.CounterPage=m;
},{"react":"1n8/","..":"2GD6","../../../app/components/layouts/CenterLayout":"DIPD","../../../app/components/layouts/VerticalStackLayout":"D5Nm","../../../app/useRedux":"fg82","../../../components/Button":"UI9U","../../../components/Text":"5Mw3","../../../styled-components":"SO6s","../counter-type":"Co6U"}]},{},[], null)
//# sourceMappingURL=/notebook/CounterPage.ed0bc6dc.map