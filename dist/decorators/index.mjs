import {channel as $C3GSL$channel, buffers as $C3GSL$buffers} from "redux-saga";
import {takeLeading as $C3GSL$takeLeading, takeLatest as $C3GSL$takeLatest, takeEvery as $C3GSL$takeEvery, fork as $C3GSL$fork, spawn as $C3GSL$spawn, throttle as $C3GSL$throttle, debounce as $C3GSL$debounce} from "redux-saga/effects";



const $72ca7c0ca4a086f6$var$register = $C3GSL$channel($C3GSL$buffers.expanding());
function $72ca7c0ca4a086f6$export$ab18f80dcccecca4(pattern, ...args) {
    return (_target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $72ca7c0ca4a086f6$var$register.put($C3GSL$takeLeading(pattern, descriptor.value, ...args));
        return descriptor;
    };
}
function $72ca7c0ca4a086f6$export$ca010cea618a298a(pattern, ...args) {
    return (_target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $72ca7c0ca4a086f6$var$register.put($C3GSL$takeLatest(pattern, descriptor.value, ...args));
        return descriptor;
    };
}
function $72ca7c0ca4a086f6$export$4e24be1e1c9d5c69(pattern, ...args) {
    return (_target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $72ca7c0ca4a086f6$var$register.put($C3GSL$takeEvery(pattern, descriptor.value, ...args));
        return descriptor;
    };
}
function $72ca7c0ca4a086f6$export$7a5058c6b79333e0(...args) {
    return (target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $72ca7c0ca4a086f6$var$register.put($C3GSL$fork([
            target,
            descriptor.value
        ], ...args));
    };
}
function $72ca7c0ca4a086f6$export$1713f5ac2bf0caf5(...args) {
    return (target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $72ca7c0ca4a086f6$var$register.put($C3GSL$spawn([
            target,
            descriptor.value
        ], ...args));
    };
}
function $72ca7c0ca4a086f6$export$de363e709c412c8a(ms, pattern, ...args) {
    return (_target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $72ca7c0ca4a086f6$var$register.put($C3GSL$throttle(ms, pattern, descriptor.value, ...args));
    };
}
function $72ca7c0ca4a086f6$export$61fc7d43ac8f84b0(ms, pattern, ...args) {
    return (_target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $72ca7c0ca4a086f6$var$register.put($C3GSL$debounce(ms, pattern, descriptor.value, ...args));
    };
}
var $72ca7c0ca4a086f6$export$2e2bcd8739ae039 = {
    takeLeading: $72ca7c0ca4a086f6$export$ab18f80dcccecca4,
    takeLatest: $72ca7c0ca4a086f6$export$ca010cea618a298a,
    takeEvery: $72ca7c0ca4a086f6$export$4e24be1e1c9d5c69,
    fork: $72ca7c0ca4a086f6$export$7a5058c6b79333e0,
    spawn: $72ca7c0ca4a086f6$export$1713f5ac2bf0caf5,
    throttle: $72ca7c0ca4a086f6$export$de363e709c412c8a,
    debounce: $72ca7c0ca4a086f6$export$61fc7d43ac8f84b0
};
function $72ca7c0ca4a086f6$export$76a87a685dfca8ea() {
    return $C3GSL$takeEvery($72ca7c0ca4a086f6$var$register, function* registerSagaMethod(effect) {
        try {
            yield effect;
        } catch (e) {
            console.error("[SagaDecorators] Error forking task", effect, e);
        }
    });
}


export {$72ca7c0ca4a086f6$export$ab18f80dcccecca4 as takeLeading, $72ca7c0ca4a086f6$export$ca010cea618a298a as takeLatest, $72ca7c0ca4a086f6$export$4e24be1e1c9d5c69 as takeEvery, $72ca7c0ca4a086f6$export$7a5058c6b79333e0 as fork, $72ca7c0ca4a086f6$export$1713f5ac2bf0caf5 as spawn, $72ca7c0ca4a086f6$export$de363e709c412c8a as throttle, $72ca7c0ca4a086f6$export$61fc7d43ac8f84b0 as debounce, $72ca7c0ca4a086f6$export$2e2bcd8739ae039 as default, $72ca7c0ca4a086f6$export$76a87a685dfca8ea as watchSagaDecorators};
//# sourceMappingURL=index.mjs.map
