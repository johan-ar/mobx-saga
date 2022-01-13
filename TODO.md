# Packages

# saga-decorators

## Initial Setup

```
$ npm install saga-decorators
```

## Getting Started

Saga decorators only depends of [`redux-saga`](https://redux-saga.js.org/) toolkit, thats mean's that you can use the `saga-decorators` with your favorite store manager such as `Redux` `MobX` or anything you want it.

### With custom [Saga IO](https://redux-saga.js.org/docs/advanced/UsingRunSaga)

```ts
import { runSaga, stdChannel } from 'redux-saga'
import { activateSagaDecorators } from 'saga-decorators'

const emitter = new EventEmitter()
const channel = stdChannel()

const myIO = {
  // this will be used to orchestrate take and put Effects
  channel,
  // this will be used to resolve put Effects
  dispatch(output) {
    emitter.emit("action", output)
  },
  // this will be used to resolve select Effects
  getState() {
    return state
  }
}

runSaga(
  myIO,
  function* rootSaga() {
    // Start a task to register all saga class methods
    yield useSagaDecorators(); // non-blocking effect
    ...
  },
)

```

### With `Redux Store` is the same process.

`./store.ts`

```ts
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
export const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(function *rootSaga() {
  // Start a task to register all saga class methods
  yield useSagaDecorators(); // non-blocking effect
  ...
})

// render the application
```

# Decorators

`@saga.takeLeading(pattern, ...args)`
`@saga.takeLatest(pattern, ...args)`
`@saga.takeEvery(pattern, ...args)`

`@saga.takeLeading(channel, ...args)`
`@saga.takeLatest(channel, ...args)`
`@saga.takeEvery(channel, ...args)`

`@saga.fork(...args)`
`@saga.spawn(...args)`

`@saga.debounce(ms, ...args)`
`@saga.throttle(ms, ...args)`

```ts
import { createAction, type PayloadAction } from 'something-action-lib'
import store from './store'
import saga from 'saga-decorators'

const increment = createAction<number>('increment')

class MyClass {
  @saga.takeLeading(increment)
  *incrementSaga(action: PayloadAction<number>) {
    ...
  }
}

store.dispatch(increment(1))

// --- equivalent to ---

function *rootSaga() {
  yield takeLeading(increment, incrementSaga)
})

function *incrementSaga(action: PayloadAction<number>) {
  ...
}

store.dispatch(increment(1))
```

more examples

```ts
type Inc = { inc: number };
type Dec = { dec: number };
const incrementAction = createAction<Inc>("increment");
const decrementAction = createAction<Dec>("decrement");

const chann = stdChannel<PayloadAction<Inc>>();

chann.put(incrementAction({ inc: 1 }));
chann.take(() => {}, incrementAction.match);

class MyClass {
  // with string action
  @saga.takeLeading(incrementAction.toString())
  *inc_str(action: AnyAction) {}

  // with action creator function
  @saga.takeLatest(incrementAction)
  *inc(action: PayloadAction<Inc>) {}

  // with extra arguments
  @saga.takeEvery(incrementAction, "a", "b")
  *inc_with_args(a: string, b: string, action: PayloadAction<Inc>) {}

  // with action array
  @saga.takeLeading([incrementAction, decrementAction])
  *inc_or_dec(action: PayloadAction<Inc | Dec>) {}

  // with channel
  @saga.takeLeading(chann, "a", "b")
  *inc_chann(a: string, b: string, action: PayloadAction<Inc>) {}

  // start a task imediatelly if `useSagaDecorators' is running
  @saga.fork("a")
  *task(a: string) {}

  // start a detached task imediatelly if `useSagaDecorators' is running
  @saga.spawn("a")
  *taskDetached(a: string) {}

  @saga.debounce(100, incrementAction)
  *incDebounced(action: PayloadAction<Inc>) {}

  @saga.throttle(100, incrementAction)
  *incTrottled(action: PayloadAction<Inc>) {}
}
```

---
