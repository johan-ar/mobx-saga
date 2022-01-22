import { put, PutEffect } from "redux-saga/effects";
import { L } from "ts-toolbelt";
import { PayloadAction } from ".";

export type Mutation<T, Args extends any[] = any[]> = (
  rootStore: T,
  ...args: Args
) => any;

export type PayloadMutation<M extends Mutation<any> = Mutation<any>> =
  PayloadAction<
    { mutation: M; args: L.Tail<Parameters<M>> },
    `@mutation/${string}`
  >;

export function commit<M extends Mutation<any>>(
  mutation: M,
  ...args: L.Tail<Parameters<M>>
): PutEffect<PayloadMutation<M>> {
  return put({
    type: `@mutation/${mutation.name || "_"}`,
    payload: { mutation, args },
  });
}
