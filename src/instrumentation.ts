/* eslint-disable @typescript-eslint/no-unused-vars */
export async function register() {
  if (
    typeof globalThis.localStorage !== "undefined" &&
    typeof globalThis.localStorage.getItem !== "function"
  ) {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      writable: true,
      value: {
        getItem: (_key: string) => null,
        setItem: (_key: string, _value: string) => {},
        removeItem: (_key: string) => {},
        clear: () => {},
        key: (_index: number) => null,
        length: 0,
      },
    });
  }
}
