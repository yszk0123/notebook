parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"T1T2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CounterPage=void 0;var e=u(require("react")),t=require("../../../app/components/layouts/CenterLayout"),n=require("../../../app/components/layouts/VerticalStackLayout"),a=require("../../../app/styled-components"),r=require("../../../components/Button"),l=require("../../../components/Text");function u(e){return e&&e.__esModule?e:{default:e}}const o=(0,a.styled)(t.CenterLayout)`
  margin-top: ${({theme:e})=>e.space};
`,c=(0,a.styled)(l.Text)`
  display: flex;
  justify-content: center;
  margin: ${({theme:e})=>e.space};
`,i=a.styled.div`
  display: flex;
  justify-content: center;
  margin: ${({theme:e})=>e.space};

  & > ${r.Button} {
    margin: 0 ${({theme:e})=>e.space};
  }
`,s=({count:t,loading:a,increment:u,incrementByTen:s})=>a?e.default.createElement(l.Text,null,"Loading..."):e.default.createElement(o,null,e.default.createElement(n.VerticalStackLayout,null,e.default.createElement(c,null,"Count: ",t),e.default.createElement(i,null,e.default.createElement(r.Button,{onClick:u},"Increment"),e.default.createElement(r.Button,{onClick:s},"Increment by 10"))));exports.CounterPage=s;
},{"react":"1n8/","../../../app/components/layouts/CenterLayout":"DIPD","../../../app/components/layouts/VerticalStackLayout":"D5Nm","../../../app/styled-components":"KtUO","../../../components/Button":"UI9U","../../../components/Text":"5Mw3"}],"awti":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CounterContainer=void 0;var e=require("react-redux"),n=require("./components/CounterPage"),t=require("./counter-type"),r=require("./CounterEffect");function o(e){const{count:n}=e.counter,{loading:t}=e.routing;return{count:n,loading:t}}const c={increment:t.counterActions.increment,incrementByTen:r.counterEffects.incrementByTen},u=(0,e.connect)(o,c)(n.CounterPage);exports.CounterContainer=u;
},{"react-redux":"jYI/","./components/CounterPage":"T1T2","./counter-type":"Co6U","./CounterEffect":"eH/Q"}]},{},[], null)
//# sourceMappingURL=/notebook/CounterContainer.fe0fcecd.map