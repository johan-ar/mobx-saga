import{stdChannel as t,runSaga as a}from"@redux-saga/core";import{runInAction as e}from"mobx";import{put as o}from"redux-saga/effects";function r(t,a,e,o){Object.defineProperty(t,a,{get:e,set:o,enumerable:!0,configurable:!0})}function n(t,a){let e;return e=a?{[t](...e){const o=a(...e);return{type:t,payload:o.payload,..."meta"in o&&{meta:o.meta},..."error"in o&&{meta:o.error}}}}[t]:{[t]:a=>({type:t,payload:a})}[t],e.type=t,e.toString=()=>t,e.match=a=>a.type===t,e}r({},"createAction",(()=>n));function c(o){const r=o.channel||t(),n=(t,...a)=>e((()=>t(o.store,...a))),c={channel:r,dispatch({payload:{mutation:t,args:a}}){n(t,...a)},getState:()=>o.store,sagaMonitor:o.monitor};return{commit:n,channel:r,dispatch:r.put,run:(t,...e)=>a(c,t,...e)}}r({},"createMobXSaga",(()=>c));function i(t,...a){return o({type:`@mutation/${t.name||"_"}`,payload:{mutation:t,args:a}})}r({},"commit",(()=>i));export{n as createAction,c as createMobXSaga,i as commit};
//# sourceMappingURL=index.mjs.map
