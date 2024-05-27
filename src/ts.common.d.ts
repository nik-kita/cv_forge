declare global {
  type Tail<T extends any[]> =
    T extends [infer _first, ...infer Rest] ? Rest : never
  type OmitStrict<
    T extends Record<string, any>,
    K extends keyof T,
  > = Omit<T, K> & Partial<Record<K, never>>
  type OmitReplace<
    T extends Record<string, any>,
    U extends Partial<Record<keyof T, any>>,
  > = Omit<T, keyof U> & U

  type AddOrReplace<
    T extends Record<string, any>,
    U extends Record<string, any>,
  > = Omit<T, keyof U> & U
}

export {}
