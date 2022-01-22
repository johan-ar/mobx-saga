import { A } from "ts-toolbelt";

export type NonUndefined<T> = Exclude<T, undefined | null | void>;

export type PayloadAction<
  P = void,
  T extends string = string,
  M = never,
  E = never
> = {
  type: T;
  payload: P;
} & ([M] extends [never] ? {} : { meta: M }) &
  ([E] extends [never] ? {} : { error: E });

export interface Action<T extends string = string> {
  type: T;
}

export interface AnyAction extends Action {
  [key: string | number | symbol]: any;
}

export interface BaseActionCreator<P, T extends string = string>
  extends Action<T> {
  toString(): T;
  match(action: AnyAction): action is PayloadAction<P, T>;
}

export interface ActionCreatorWithoutPayload<T extends string = string>
  extends BaseActionCreator<undefined, T> {
  (): PayloadAction<undefined, T>;
}

export interface ActionCreatorWithOptionalPayload<P, T extends string = string>
  extends BaseActionCreator<P | undefined, T> {
  (payload?: P): PayloadAction<P | undefined, T>;
}

export interface ActionCreatorWithPayload<P, T extends string = string>
  extends BaseActionCreator<P, T> {
  (payload: P): PayloadAction<P, T>;
}

export type ActionCreatorWithPreparedPayloadHelper<
  PA extends PrepareAction<any>,
  T extends string
> = ActionCreatorWithPreparedPayload<
  ReturnType<PA> extends { payload: infer P } ? P : never,
  T,
  Parameters<PA>,
  ReturnType<PA> extends { meta: infer M } ? M : never,
  ReturnType<PA> extends { error: infer E } ? E : never
>;

export interface ActionCreatorWithPreparedPayload<
  P,
  T extends string = string,
  Args extends any[] = any[],
  M = never,
  E = never
> extends BaseActionCreator<P, T> {
  (...args: Args): PayloadAction<P, T, M, E>;
}

// prettier-ignore
export type ActionCreator<
  P = undefined,
  T extends string = string,
  PA extends PrepareAction<any> | void = void
> =
  PA extends PrepareAction<any> ?
      ActionCreatorWithPreparedPayloadHelper<PA, T>
  : A.Is<P, undefined, 'equals'> extends 1 ?
      ActionCreatorWithoutPayload<T>
  : A.Is<P, undefined, '<-contains'> extends 1 ?
      ActionCreatorWithOptionalPayload<NonUndefined<P>, T>
  : ActionCreatorWithPayload<P, T>;

export type PrepareAction<P> = (...args: any[]) => {
  payload: P;
  meta?: any;
  error?: any;
};

export function createAction<P = undefined, T extends string = string>(
  type: T
): ActionCreator<P, T, void>;

export function createAction<
  PA extends PrepareAction<any>,
  T extends string = string
>(type: T, prepareAction: PA): ActionCreator<ReturnType<PA>["payload"], T, PA>;

export function createAction(type: string, prepareAction?: PrepareAction<any>) {
  let actionCreator;

  if (prepareAction) {
    actionCreator = <ActionCreator<any, string, PrepareAction<any>>>{
      [type](...args: any[]) {
        const action = prepareAction(...args);

        return {
          type: type,
          payload: action.payload,
          ...("meta" in action && { meta: action.meta }),
          ...("error" in action && { meta: action.error }),
        };
      },
    }[type];
  } else {
    actionCreator = <ActionCreator<any, string>>{
      [type](payload?: any) {
        return { type, payload };
      },
    }[type];
  }

  actionCreator.type = type;
  actionCreator.toString = () => type;
  actionCreator.match = (action: AnyAction): action is PayloadAction<any> =>
    action.type === type;

  return actionCreator;
}
