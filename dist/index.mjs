import{stdChannel as t,runSaga as a}from"@redux-saga/core";import{runInAction as e}from"mobx";import{put as n}from"redux-saga/effects";function o(t,a,e,n){Object.defineProperty(t,a,{get:e,set:n,enumerable:!0,configurable:!0})}function r(t,a){let e;return e=a?{[t](...e){const n=a(...e);return n.type=t,n}}[t]:{[t]:a=>({type:t,payload:a})}[t],e.type=t,e.toString=()=>t,e.match=a=>a.type===t,e}o({},"createAction",(()=>r));function c(n){const o=n.channel||t(),r=(t,...a)=>e((()=>t(n.store,...a))),c={channel:o,dispatch({payload:{mutation:t,args:a}}){r(t,...a)},getState:()=>n.store,sagaMonitor:n.monitor};return{commit:r,channel:o,dispatch:o.put,run:(t,...e)=>a(c,t,...e)}}o({},"createMobXSaga",(()=>c));function i(t,...a){return n({type:`@mutation/${t.name||"_"}`,payload:{mutation:t,args:a}})}o({},"commit",(()=>i));export{r as createAction,c as createMobXSaga,i as commit};
//# sourceMappingURL=index.mjs.map
