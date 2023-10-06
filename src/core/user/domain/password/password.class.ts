export class Password {
  constructor(readonly value: string) {}

  static create(value: string) {
    Password._validate(value);
    return new Password(value);
  }

  private static _validate(value: string) {}
}
