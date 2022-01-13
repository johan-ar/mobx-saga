import type { ActionMatchingPattern } from "@redux-saga/types";
import type { Saga, TakeableChannel } from "redux-saga";
import { buffers, channel } from "redux-saga";
import type { ActionPattern, ForkEffect } from "redux-saga/effects";
import {
  debounce as debounce_,
  fork as fork_,
  spawn as spawn_,
  takeEvery as takeEvery_,
  takeLatest as takeLatest_,
  takeLeading as takeLeading_,
  throttle as throttle_,
} from "redux-saga/effects";
import { L } from "ts-toolbelt";

const register = channel<ForkEffect<unknown>>(buffers.expanding());

export type SagaMethodDecorator<Args extends any[] = any[]> = <
  SagaMethod extends Saga<Args>
>(
  target: Object,
  propKey: string | symbol,
  descriptor: TypedPropertyDescriptor<SagaMethod>
) => TypedPropertyDescriptor<SagaMethod> | void;

/**
 * See {@link takeLeading_} for details
 */
export function takeLeading<P extends ActionPattern, Args extends any[]>(
  pattern: P,
  ...args: Args
): SagaMethodDecorator<L.Append<Args, ActionMatchingPattern<P>>>;

export function takeLeading<T, Args extends any[]>(
  channel: TakeableChannel<T>,
  ...args: Args
): SagaMethodDecorator<L.Append<Args, T>>;

export function takeLeading(
  pattern: ActionPattern | TakeableChannel<any>,
  ...args: any[]
): SagaMethodDecorator {
  return (_target, _propKey, descriptor) => {
    if (!descriptor.value) return;
    register.put(takeLeading_<any, Saga>(pattern, descriptor.value, ...args));
    return descriptor;
  };
}

/**
 * See {@link takeLatest_} for details
 */
export function takeLatest<P extends ActionPattern, Args extends any[]>(
  pattern: P,
  ...args: Args
): SagaMethodDecorator<L.Append<Args, ActionMatchingPattern<P>>>;

export function takeLatest<T, Args extends any[]>(
  channel: TakeableChannel<T>,
  ...args: Args
): SagaMethodDecorator<L.Append<Args, T>>;

export function takeLatest(
  pattern: ActionPattern | TakeableChannel<any>,
  ...args: any[]
): SagaMethodDecorator {
  return (_target, _propKey, descriptor) => {
    if (!descriptor.value) return;
    register.put(takeLatest_<any, Saga>(pattern, descriptor.value, ...args));
    return descriptor;
  };
}

/**
 * See {@link takeEvery_} for details
 */
export function takeEvery<P extends ActionPattern, Args extends any[]>(
  pattern: P,
  ...args: Args
): SagaMethodDecorator<L.Append<Args, ActionMatchingPattern<P>>>;

export function takeEvery<T, Args extends any[]>(
  channel: TakeableChannel<T>,
  ...args: Args
): SagaMethodDecorator<L.Append<Args, T>>;

export function takeEvery(
  pattern: ActionPattern | TakeableChannel<any>,
  ...args: any[]
): SagaMethodDecorator {
  return (_target, _propKey, descriptor) => {
    if (!descriptor.value) return;
    register.put(takeEvery_<any, Saga>(pattern, descriptor.value, ...args));
    return descriptor;
  };
}

/**
 * See {@link fork_} for details
 */
export function fork<Args extends any[]>(
  ...args: Args
): SagaMethodDecorator<Args>;

export function fork(...args: any[]): SagaMethodDecorator {
  return (target, _propKey, descriptor) => {
    if (!descriptor.value) return;
    register.put(fork_<object, Saga>([target, descriptor.value], ...args));
  };
}

/**
 * See {@link spawn_} for details
 */
export function spawn<Args extends any[]>(
  ...args: Args
): SagaMethodDecorator<Args>;

export function spawn(...args: any[]): SagaMethodDecorator {
  return (target, _propKey, descriptor) => {
    if (!descriptor.value) return;
    register.put(spawn_<object, Saga>([target, descriptor.value], ...args));
  };
}

/**
 * See {@link throttle_} for details
 */
export function throttle<P extends ActionPattern, Args extends any[]>(
  ms: number,
  pattern: P,
  ...args: Args
): SagaMethodDecorator<L.Append<Args, ActionMatchingPattern<P>>>;

export function throttle<T, Args extends any[]>(
  ms: number,
  pattern: TakeableChannel<T>,
  ...args: Args
): SagaMethodDecorator<L.Append<Args, T>>;

export function throttle(
  ms: number,
  pattern: ActionPattern | TakeableChannel<any>,
  ...args: any[]
): SagaMethodDecorator {
  return (_target, _propKey, descriptor) => {
    if (!descriptor.value) return;
    register.put(throttle_<any, Saga>(ms, pattern, descriptor.value, ...args));
  };
}

/**
 * See {@link debounce_} for details
 */
export function debounce<P extends ActionPattern, Args extends any[]>(
  ms: number,
  pattern: P,
  ...args: Args
): SagaMethodDecorator<L.Append<Args, ActionMatchingPattern<P>>>;

export function debounce<T, Args extends any[]>(
  ms: number,
  pattern: TakeableChannel<T>,
  ...args: Args
): SagaMethodDecorator<L.Append<Args, T>>;

export function debounce(
  ms: number,
  pattern: ActionPattern | TakeableChannel<any>,
  ...args: any[]
): SagaMethodDecorator {
  return (_target, _propKey, descriptor) => {
    if (!descriptor.value) return;
    register.put(debounce_<any, Saga>(ms, pattern, descriptor.value, ...args));
  };
}

export default {
  takeLeading,
  takeLatest,
  takeEvery,
  fork,
  spawn,
  throttle,
  debounce,
};

export function watchSagaDecorators(): ForkEffect<never> {
  return takeEvery_(register, function* registerSagaMethod(effect) {
    try {
      yield effect;
    } catch (e) {
      console.error("[SagaDecorators] Error forking task", effect, e);
    }
  });
}
