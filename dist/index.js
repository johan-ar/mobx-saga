var $hwgVC$reduxsagacore = require("@redux-saga/core");
var $hwgVC$mobx = require("mobx");
var $hwgVC$reduxsagaeffects = require("redux-saga/effects");

function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $05b1e88119ff16d5$exports = {};

$parcel$export($05b1e88119ff16d5$exports, "createAction", () => $05b1e88119ff16d5$export$309c7a02b0b0bc62);
function $05b1e88119ff16d5$export$309c7a02b0b0bc62(type, prepareAction) {
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


var $ef67c8edb70e1360$exports = {};

$parcel$export($ef67c8edb70e1360$exports, "createMobXSaga", () => $ef67c8edb70e1360$export$4e7cd27c79410e7f);


function $ef67c8edb70e1360$export$4e7cd27c79410e7f(options) {
    const channel = options.channel || $hwgVC$reduxsagacore.stdChannel();
    const io = {
        channel: channel,
        dispatch (action) {
            $hwgVC$mobx.runInAction(()=>action.payload(options.store)
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
            return $hwgVC$reduxsagacore.runSaga(io, mainSaga, ...args);
        }
    };
}


var $14efde7b820a8011$exports = {};

$parcel$export($14efde7b820a8011$exports, "mutate", () => $14efde7b820a8011$export$57e795267c26e600);

function $14efde7b820a8011$export$57e795267c26e600(mutation) {
    return $hwgVC$reduxsagaeffects.put({
        type: `@mutation/${mutation.name || "_"}`,
        payload: mutation
    });
}


$parcel$exportWildcard(module.exports, $05b1e88119ff16d5$exports);
$parcel$exportWildcard(module.exports, $ef67c8edb70e1360$exports);
$parcel$exportWildcard(module.exports, $14efde7b820a8011$exports);


//# sourceMappingURL=index.js.map
