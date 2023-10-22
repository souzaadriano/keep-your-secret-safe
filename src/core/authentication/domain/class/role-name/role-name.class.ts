export class RoleName {
  constructor(readonly value: string) {}

  static create(name: string) {
    return new RoleName(name.replaceAll(' ', '_').toUpperCase());
  }
}
