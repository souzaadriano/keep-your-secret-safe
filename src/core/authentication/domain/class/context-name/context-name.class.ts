export class ContextName {
  constructor(readonly value: string) {}

  static create(name: string) {
    return new ContextName(name);
  }
}
