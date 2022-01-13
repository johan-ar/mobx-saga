import { A } from "ts-toolbelt";
import { PutEffect } from "redux-saga/effects";
import { MulticastChannel, SagaMonitor } from "@redux-saga/core";
import { Saga, Task } from "@redux-saga/types";
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
export interface ActionCreatorWithPreparedPayload<T extends string, PA extends PrepareAction<any>> extends BaseActionCreator<ReturnType<PA>["payload"], T> {
    (...args: Parameters<PA>): PayloadAction<ReturnType<PA>["payload"], T, ReturnType<PA>>;
}
export type ActionCreator<P, T extends string = string, PA = void> = PA extends PrepareAction<any> ? ActionCreatorWithPreparedPayload<T, PA> : [P] extends [undefined] ? ActionCreatorWithoutPayload<T> : [undefined] extends [P] ? ActionCreatorWithOptionalPayload<NonUndefined<P>, T> : ActionCreatorWithPayload<P, T>;
type PrepareAction<P> = (...args: any[]) => {
    payload: P;
    [K: string | symbol | number]: any;
};
export function createAction<P = undefined, T extends string = string>(type: T): ActionCreator<P, T>;
export function createAction<PA extends PrepareAction<any>, T extends string = string>(type: T, prepareAction: PA): ActionCreator<ReturnType<PA>["payload"], T, PA>;
export type Mutation<T> = (rootStore: T) => any;
export function mutate<T>(mutation: Mutation<T>): PutEffect<PayloadAction<Mutation<T>, `@mutation/${string}`>>;
export type SagaDispatcher<A extends AnyAction = AnyAction> = (action: A) => void;
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
export function createMobXSaga<T>(options: MobXSagaOptions<T>): MobXSaga;

//# sourceMappingURL=index.d.ts.map
