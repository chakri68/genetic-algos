export function assert<T>(a: T): NonNullable<T> {
  if (!a) throw new Error();
  return a;
}

export function mergeDefaultOptions<T>(
  options: T,
  defaultOptions: Pick<T, keyof T>
) {
  const mergedOptions: T = { ...options };
  for (const defaultProp in defaultOptions) {
    if (mergedOptions[defaultProp] === undefined) {
      mergedOptions[defaultProp] = defaultOptions[defaultProp];
    }
  }
  return mergedOptions;
}
