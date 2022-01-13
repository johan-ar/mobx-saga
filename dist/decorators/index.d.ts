import { ActionMatchingPattern } from "@redux-saga/types";
import { Saga, TakeableChannel } from "redux-saga";
import { ActionPattern, ForkEffect } from "redux-saga/effects";
import { L } from "ts-toolbelt";
export type SagaMethodDecorator<Args extends any[] = any[]> = <SagaMethod extends Saga<Args>>(target: Object, propKey: string | symbol, descriptor: TypedPropertyDescriptor<SagaMethod>) => TypedPropertyDescriptor<SagaMethod> | void;
/**
 * See {@link takeLeading_} for details
 */
export function takeLeading<P extends ActionPattern, Args extends any[]>(pattern: P, ...args: Args): SagaMethodDecorator<L.Append<Args, ActionMatchingPattern<P>>>;
export function takeLeading<T, Args extends any[]>(channel: TakeableChannel<T>, ...args: Args): SagaMethodDecorator<L.Append<Args, T>>;
/**
 * See {@link takeLatest_} for details
 */
export function takeLatest<P extends ActionPattern, Args extends any[]>(pattern: P, ...args: Args): SagaMethodDecorator<L.Append<Args, ActionMatchingPattern<P>>>;
export function takeLatest<T, Args extends any[]>(channel: TakeableChannel<T>, ...args: Args): SagaMethodDecorator<L.Append<Args, T>>;
/**
 * See {@link takeEvery_} for details
 */
export function takeEvery<P extends ActionPattern, Args extends any[]>(pattern: P, ...args: Args): SagaMethodDecorator<L.Append<Args, ActionMatchingPattern<P>>>;
export function takeEvery<T, Args extends any[]>(channel: TakeableChannel<T>, ...args: Args): SagaMethodDecorator<L.Append<Args, T>>;
/**
 * See {@link fork_} for details
 */
export function fork<Args extends any[]>(...args: Args): SagaMethodDecorator<Args>;
/**
 * See {@link spawn_} for details
 */
export function spawn<Args extends any[]>(...args: Args): SagaMethodDecorator<Args>;
/**
 * See {@link throttle_} for details
 */
export function throttle<P extends ActionPattern, Args extends any[]>(ms: number, pattern: P, ...args: Args): SagaMethodDecorator<L.Append<Args, ActionMatchingPattern<P>>>;
export function throttle<T, Args extends any[]>(ms: number, pattern: TakeableChannel<T>, ...args: Args): SagaMethodDecorator<L.Append<Args, T>>;
/**
 * See {@link debounce_} for details
 */
export function debounce<P extends ActionPattern, Args extends any[]>(ms: number, pattern: P, ...args: Args): SagaMethodDecorator<L.Append<Args, ActionMatchingPattern<P>>>;
export function debounce<T, Args extends any[]>(ms: number, pattern: TakeableChannel<T>, ...args: Args): SagaMethodDecorator<L.Append<Args, T>>;
declare const _default: {
    takeLeading: typeof takeLeading;
    takeLatest: typeof takeLatest;
    takeEvery: typeof takeEvery;
    fork: typeof fork;
    spawn: typeof spawn;
    throttle: typeof throttle;
    debounce: typeof debounce;
};
export default _default;
export function watchSagaDecorators(): ForkEffect<never>;

//# sourceMappingURL=index.d.ts.map
