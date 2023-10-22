export class EnumValidator<T> {
  private constructor(private readonly _values: Set<string>) {}

  static factory<T>(input: Record<string, string>) {
    return new EnumValidator<T>(new Set(Object.values(input)));
  }

  has(value: string) {
    return this._values.has(value);
  }

  is(value: string, ...options: T[]) {
    const optionsSet = new Set<string>(options as string[]);
    this._values.has(value) && optionsSet.has(value);
  }

  not(value: string, ...options: T[]) {
    const optionsSet = new Set<string>(options as string[]);
    this._values.has(value) && !optionsSet.has(value);
  }
}
