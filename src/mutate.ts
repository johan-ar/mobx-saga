import { put, PutEffect } from "redux-saga/effects";
import { PayloadAction } from ".";

export type Mutation<T> = (rootStore: T) => any;

export function mutate<T>(
  mutation: Mutation<T>
): PutEffect<PayloadAction<Mutation<T>, `@mutation/${string}`>> {
  return put({ type: `@mutation/${mutation.name || "_"}`, payload: mutation });
}
