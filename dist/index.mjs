import {stdChannel as $4CQEi$stdChannel, runSaga as $4CQEi$runSaga} from "@redux-saga/core";
import {runInAction as $4CQEi$runInAction} from "mobx";
import {put as $4CQEi$put} from "redux-saga/effects";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $85072610c0e6c16a$exports = {};

$parcel$export($85072610c0e6c16a$exports, "createAction", () => $85072610c0e6c16a$export$309c7a02b0b0bc62);
function $85072610c0e6c16a$export$309c7a02b0b0bc62(type, prepareAction) {
    let actionCreator;
    if (prepareAction) actionCreator = ({
        [type] (...args) {
            const action = prepareAction(...args);
            action.type = type;
            return action;
        }
    })[type];
    else actionCreator = ({
        [type] (payload) {
            return {
                type: type,
                payload: payload
            };
        }
    })[type];
    actionCreator.type = type;
    actionCreator.toString = ()=>type
    ;
    actionCreator.match = (action)=>action.type === type
    ;
    return actionCreator;
}


var $e858a81682daee00$exports = {};

$parcel$export($e858a81682daee00$exports, "createMobXSaga", () => $e858a81682daee00$export$4e7cd27c79410e7f);


function $e858a81682daee00$export$4e7cd27c79410e7f(options) {
    const channel = options.channel || $4CQEi$stdChannel();
    const io = {
        channel: channel,
        dispatch (action) {
            $4CQEi$runInAction(()=>action.payload(options.store)
            );
        },
        getState () {
            return options.store;
        },
        sagaMonitor: options.monitor
    };
    return {
        channel: channel,
        dispatch: channel.put,
        run (mainSaga, ...args) {
            return $4CQEi$runSaga(io, mainSaga, ...args);
        }
    };
}


var $d2680d0128b6d3a1$exports = {};

$parcel$export($d2680d0128b6d3a1$exports, "mutate", () => $d2680d0128b6d3a1$export$57e795267c26e600);

function $d2680d0128b6d3a1$export$57e795267c26e600(mutation) {
    return $4CQEi$put({
        type: `@mutation/${mutation.name || "_"}`,
        payload: mutation
    });
}




export {$85072610c0e6c16a$export$309c7a02b0b0bc62 as createAction, $e858a81682daee00$export$4e7cd27c79410e7f as createMobXSaga, $d2680d0128b6d3a1$export$57e795267c26e600 as mutate};
//# sourceMappingURL=index.mjs.map
