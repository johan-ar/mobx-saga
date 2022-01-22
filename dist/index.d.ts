import { A, L } from "ts-toolbelt";
import { MulticastChannel, SagaMonitor } from "@redux-saga/core";
import { Saga, Task } from "@redux-saga/types";
import { PutEffect } from "redux-saga/effects";
export type NonUndefined<T> = Exclude<T, undefined | null | void>;
export type ActionExtension<O> = O extends void ? {} : A.Compute<Omit<O, "type" | "payload">, "flat">;
export type PayloadAction<P = void, T extends string = string, Ex extends {
    [k: string]: any;
} = never> = [Ex] extends [never] ? {
    type: T;
    payload: P;
} : {
    type: T;
    payload: P;
} & ActionExtension<Ex>;
export interface Action<T extends string = string> {
    type: T;
}
export interface AnyAction extends Action {
    [key: string | number | symbol]: any;
}
export interface BaseActionCreator<P, T extends string = string> extends Action<T> {
    toString(): T;
    match(action: AnyAction): action is PayloadAction<P, T>;
}
export interface ActionCreatorWithoutPayload<T extends string = string> extends BaseActionCreator<undefined, T> {
    (): PayloadAction<undefined, T>;
}
export interface ActionCreatorWithOptionalPayload<P, T extends string = string> extends BaseActionCreator<P | undefined, T> {
    (payload?: P): PayloadAction<P | undefined, T>;
}
export interface ActionCreatorWithPayload<P, T extends string = string> extends BaseActionCreator<P, T> {
    (payload: P): PayloadAction<P, T>;
}
export interface ActionCreatorWithPreparedPayload<PA extends PrepareAction<any>, T extends string> extends BaseActionCreator<ReturnType<PA>["payload"], T> {
    (...args: Parameters<PA>): PayloadAction<ReturnType<PA>["payload"], T, ReturnType<PA>>;
}
export type ActionCreator<P = undefined, T extends string = string, PA extends PrepareAction<any> | void = void> = PA extends PrepareAction<any> ? ActionCreatorWithPreparedPayload<PA, T> : A.Is<P, undefined, 'equals'> extends 1 ? ActionCreatorWithoutPayload<T> : A.Is<P, undefined, '<-contains'> extends 1 ? ActionCreatorWithOptionalPayload<NonUndefined<P>, T> : ActionCreatorWithPayload<P, T>;
type PrepareAction<P> = (...args: any[]) => {
    payload: P;
    [K: string | symbol | number]: any;
};
export function createAction<P = undefined, T extends string = string>(type: T): ActionCreator<P, T, void>;
export function createAction<PA extends PrepareAction<any>, T extends string = string>(type: T, prepareAction: PA): ActionCreator<ReturnType<PA>["payload"], T, PA>;
export type SagaDispatcher<A extends AnyAction = AnyAction> = (action: A) => void;
export type MobXSagaOptions<T> = {
    store: T;
    monitor?: SagaMonitor;
    channel?: MulticastChannel<AnyAction>;
};
export type MobXSaga<T> = {
    run<S extends Saga>(main: S, ...args: Parameters<S>): Task;
    dispatch: SagaDispatcher;
    commit<M extends Mutation<T>>(mutation: M, ...args: L.Tail<Parameters<M>>): ReturnType<M>;
    channel: MulticastChannel<AnyAction>;
};
export function createMobXSaga<T>(options: MobXSagaOptions<T>): MobXSaga<T>;
export type Mutation<T, Args extends any[] = any[]> = (rootStore: T, ...args: Args) => any;
export type PayloadMutation<M extends Mutation<any> = Mutation<any>> = PayloadAction<{
    mutation: M;
    args: L.Tail<Parameters<M>>;
}, `@mutation/${string}`>;
export function commit<M extends Mutation<any>>(mutation: M, ...args: L.Tail<Parameters<M>>): PutEffect<PayloadMutation<M>>;

//# sourceMappingURL=index.d.ts.map
