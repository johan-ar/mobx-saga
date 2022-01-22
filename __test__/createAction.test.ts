import { createAction } from "../src";

describe("Test action creators", () => {
  test("action creator type", () => {
    const foo = createAction("foo");

    expect(foo.type).toBe("foo");
    expect(foo.match(createAction("foo"))).toBeTruthy();
    expect(`${foo}`).toBe("foo");
  });

  test("action creator payloads", () => {
    {
      const foo = createAction("foo");
      expect(foo()).toEqual({ type: "foo", payload: undefined });
    }
    {
      const foo = createAction<number>("foo");
      expect(foo(1)).toEqual({ type: "foo", payload: 1 });
    }
    {
      const foo = createAction<number | undefined>("foo");
      expect(foo(1)).toEqual({ type: "foo", payload: 1 });
      expect(foo()).toEqual({ type: "foo", payload: undefined });
    }
    {
      const foo = createAction("foo", (n: number) => ({
        payload: n + 1,
        meta: "META",
      }));

      expect(foo(1)).toEqual({ type: "foo", payload: 2, meta: "META" });
    }
  });
});
