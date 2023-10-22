export class Description {
  constructor(readonly value: string) {}

  static create(value: string) {
    if (value.length > 256) throw new Error();
    return new Description(value);
  }
}
