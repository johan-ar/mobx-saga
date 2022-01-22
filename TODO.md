# MobX Saga

A bridge between Redux-Saga and MobX

```
$ npm install @jsar/mobx-saga
```

## Getting Started

```ts
import { createMobXSaga } from '@jsar/mobx-saga'
import rootStore from './rootStore'

const saga = createMobXSaga({
  store: rootStore
})

saga.run(function *rootSaga() {
  ...
})

// Action Dispatcher
saga.dispatch(myAction)


```

## **`commit`** Effect

```ts
import { commit, type Mutation } from "@jsar/mobx-saga";
import type { RootStore } from "./rootStore";

type RootStore = { value: number };

const increment: Mutation<RootStore, [number]> = (store, inc) => {
  store.value += inc;
};

function* incSaga() {
  yield commit(increment, 1);
}
```
