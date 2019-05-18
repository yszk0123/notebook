parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"iq2S":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.VerticalStackLayout=void 0;var e=require("../../styled-components");const t=e.styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;exports.VerticalStackLayout=t;
},{"../../styled-components":"Y5zh"}],"T1T2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CounterPage=void 0;var e=o(require("react")),t=require("../../../application/components/layouts/CenterLayout"),n=require("../../../application/components/layouts/VerticalStackLayout"),a=require("../../../application/styled-components"),l=require("../../../components/Button"),r=require("../../../components/Text");function o(e){return e&&e.__esModule?e:{default:e}}const u=(0,a.styled)(t.CenterLayout)`
  margin-top: ${({theme:e})=>e.space};
`,c=(0,a.styled)(r.Text)`
  display: flex;
  justify-content: center;
  margin: ${({theme:e})=>e.space};
`,i=a.styled.div`
  display: flex;
  justify-content: center;
  margin: ${({theme:e})=>e.space};

  & > ${l.Button} {
    margin: 0 ${({theme:e})=>e.space};
  }
`,s=({count:t,loading:a,increment:o,incrementByTen:s})=>a?e.default.createElement(r.Text,null,"Loading..."):e.default.createElement(u,null,e.default.createElement(n.VerticalStackLayout,null,e.default.createElement(c,null,"Count: ",t),e.default.createElement(i,null,e.default.createElement(l.Button,{onClick:o},"Increment"),e.default.createElement(l.Button,{onClick:s},"Increment by 10"))));exports.CounterPage=s;
},{"react":"1n8/","../../../application/components/layouts/CenterLayout":"AzRY","../../../application/components/layouts/VerticalStackLayout":"iq2S","../../../application/styled-components":"Y5zh","../../../components/Button":"UI9U","../../../components/Text":"5Mw3"}],"2fdV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.counterSideEffects=void 0;var e=require("./CounterActions");const t=()=>async(t,n,r)=>{t(e.counterActions.incrementBy({n:9})),t(e.counterActions.increment())},n={incrementByTen:t};exports.counterSideEffects=n;
},{"./CounterActions":"EUt3"}],"awti":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CounterContainer=void 0;var e=require("react-redux"),n=require("./components/CounterPage"),t=require("./CounterActions"),r=require("./CounterSideEffect");function o(e){const{count:n}=e.counter,{loading:t}=e.routing;return{count:n,loading:t}}const c={increment:t.counterActions.increment,incrementByTen:r.counterSideEffects.incrementByTen},u=(0,e.connect)(o,c)(n.CounterPage);exports.CounterContainer=u;
},{"react-redux":"jYI/","./components/CounterPage":"T1T2","./CounterActions":"EUt3","./CounterSideEffect":"2fdV"}]},{},[], null)
//# sourceMappingURL=/notebook/CounterContainer.81270789.js.map