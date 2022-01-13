var $528Jz$reduxsaga = require("redux-saga");
var $528Jz$reduxsagaeffects = require("redux-saga/effects");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "takeLeading", () => $e594064c1e8b4ab2$export$ab18f80dcccecca4);
$parcel$export(module.exports, "takeLatest", () => $e594064c1e8b4ab2$export$ca010cea618a298a);
$parcel$export(module.exports, "takeEvery", () => $e594064c1e8b4ab2$export$4e24be1e1c9d5c69);
$parcel$export(module.exports, "fork", () => $e594064c1e8b4ab2$export$7a5058c6b79333e0);
$parcel$export(module.exports, "spawn", () => $e594064c1e8b4ab2$export$1713f5ac2bf0caf5);
$parcel$export(module.exports, "throttle", () => $e594064c1e8b4ab2$export$de363e709c412c8a);
$parcel$export(module.exports, "debounce", () => $e594064c1e8b4ab2$export$61fc7d43ac8f84b0);
$parcel$export(module.exports, "default", () => $e594064c1e8b4ab2$export$2e2bcd8739ae039);
$parcel$export(module.exports, "watchSagaDecorators", () => $e594064c1e8b4ab2$export$76a87a685dfca8ea);


const $e594064c1e8b4ab2$var$register = $528Jz$reduxsaga.channel($528Jz$reduxsaga.buffers.expanding());
function $e594064c1e8b4ab2$export$ab18f80dcccecca4(pattern, ...args) {
    return (_target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $e594064c1e8b4ab2$var$register.put($528Jz$reduxsagaeffects.takeLeading(pattern, descriptor.value, ...args));
        return descriptor;
    };
}
function $e594064c1e8b4ab2$export$ca010cea618a298a(pattern, ...args) {
    return (_target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $e594064c1e8b4ab2$var$register.put($528Jz$reduxsagaeffects.takeLatest(pattern, descriptor.value, ...args));
        return descriptor;
    };
}
function $e594064c1e8b4ab2$export$4e24be1e1c9d5c69(pattern, ...args) {
    return (_target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $e594064c1e8b4ab2$var$register.put($528Jz$reduxsagaeffects.takeEvery(pattern, descriptor.value, ...args));
        return descriptor;
    };
}
function $e594064c1e8b4ab2$export$7a5058c6b79333e0(...args) {
    return (target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $e594064c1e8b4ab2$var$register.put($528Jz$reduxsagaeffects.fork([
            target,
            descriptor.value
        ], ...args));
    };
}
function $e594064c1e8b4ab2$export$1713f5ac2bf0caf5(...args) {
    return (target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $e594064c1e8b4ab2$var$register.put($528Jz$reduxsagaeffects.spawn([
            target,
            descriptor.value
        ], ...args));
    };
}
function $e594064c1e8b4ab2$export$de363e709c412c8a(ms, pattern, ...args) {
    return (_target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $e594064c1e8b4ab2$var$register.put($528Jz$reduxsagaeffects.throttle(ms, pattern, descriptor.value, ...args));
    };
}
function $e594064c1e8b4ab2$export$61fc7d43ac8f84b0(ms, pattern, ...args) {
    return (_target, _propKey, descriptor)=>{
        if (!descriptor.value) return;
        $e594064c1e8b4ab2$var$register.put($528Jz$reduxsagaeffects.debounce(ms, pattern, descriptor.value, ...args));
    };
}
var $e594064c1e8b4ab2$export$2e2bcd8739ae039 = {
    takeLeading: $e594064c1e8b4ab2$export$ab18f80dcccecca4,
    takeLatest: $e594064c1e8b4ab2$export$ca010cea618a298a,
    takeEvery: $e594064c1e8b4ab2$export$4e24be1e1c9d5c69,
    fork: $e594064c1e8b4ab2$export$7a5058c6b79333e0,
    spawn: $e594064c1e8b4ab2$export$1713f5ac2bf0caf5,
    throttle: $e594064c1e8b4ab2$export$de363e709c412c8a,
    debounce: $e594064c1e8b4ab2$export$61fc7d43ac8f84b0
};
function $e594064c1e8b4ab2$export$76a87a685dfca8ea() {
    return $528Jz$reduxsagaeffects.takeEvery($e594064c1e8b4ab2$var$register, function* registerSagaMethod(effect) {
        try {
            yield effect;
        } catch (e) {
            console.error("[SagaDecorators] Error forking task", effect, e);
        }
    });
}


//# sourceMappingURL=index.js.map
