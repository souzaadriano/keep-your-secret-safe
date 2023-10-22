export class Counter {
  constructor(private _value: number) {}

  static create(value?: number) {
    if (value) return new Counter(value);
    return new Counter(0);
  }

  get value() {
    return this._value;
  }

  increment(value?: number) {
    if (value) this._value += value;
    this._value += 1;
  }

  decrement(value?: number) {
    if (value) this._value -= value;
    this._value -= 1;
  }
}
