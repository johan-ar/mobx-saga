import {
  MulticastChannel,
  runSaga,
  RunSagaOptions,
  SagaMonitor,
  stdChannel,
} from "@redux-saga/core";
import { Saga, Task } from "@redux-saga/types";
import { runInAction } from "mobx";
import { L } from "ts-toolbelt";
import { Mutation, PayloadMutation } from ".";
import { AnyAction } from "./createAction";

export type SagaDispatcher<A extends AnyAction = AnyAction> = (
  action: A
) => void;

export type MobXSagaOptions<T> = {
  store: T;
  monitor?: SagaMonitor;
  channel?: MulticastChannel<AnyAction>;
};

export type MobXSaga<T> = {
  run<S extends Saga>(main: S, ...args: Parameters<S>): Task;
  dispatch: SagaDispatcher;
  commit<M extends Mutation<T>>(
    mutation: M,
    ...args: L.Tail<Parameters<M>>
  ): ReturnType<M>;
  channel: MulticastChannel<AnyAction>;
};

export function createMobXSaga<T>(options: MobXSagaOptions<T>): MobXSaga<T> {
  const channel = options.channel || stdChannel();

  const commit = (mutation: Mutation<T>, ...args: any[]) => {
    return runInAction<any>(() => mutation(options.store, ...args));
  };

  const io: RunSagaOptions<AnyAction, T> = {
    channel,
    dispatch({ payload: { mutation, args } }: PayloadMutation) {
      commit(mutation, ...args);
    },
    getState() {
      return options.store;
    },
    sagaMonitor: options.monitor,
  };

  return {
    commit,
    channel,
    dispatch: channel.put,
    run(mainSaga, ...args) {
      return runSaga(io, mainSaga, ...args);
    },
  };
}
