import {
  MulticastChannel,
  runSaga,
  RunSagaOptions,
  SagaMonitor,
  stdChannel,
} from "@redux-saga/core";
import { Saga, Task } from "@redux-saga/types";
import { runInAction } from "mobx";
import { AnyAction, PayloadAction } from "./createAction";
import { Mutation } from "./mutate";

export type SagaDispatcher<A extends AnyAction = AnyAction> = (
  action: A
) => void;

export type MobXSagaOptions<T> = {
  store: T;
  monitor?: SagaMonitor;
  channel?: MulticastChannel<AnyAction>;
};

export type MobXSaga = {
  run<S extends Saga>(main: S, ...args: Parameters<S>): Task;
  dispatch: SagaDispatcher;
  channel: MulticastChannel<AnyAction>;
};

export function createMobXSaga<T>(options: MobXSagaOptions<T>): MobXSaga {
  const channel = options.channel || stdChannel();

  const io: RunSagaOptions<AnyAction, T> = {
    channel,
    dispatch(action: PayloadAction<Mutation<T>>) {
      runInAction(() => action.payload(options.store));
    },
    getState() {
      return options.store;
    },
    sagaMonitor: options.monitor,
  };

  return {
    channel,
    dispatch: channel.put,
    run(mainSaga, ...args) {
      return runSaga(io, mainSaga, ...args);
    },
  };
}
