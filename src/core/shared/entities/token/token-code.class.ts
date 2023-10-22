import { Uuid } from '../../class/uuid/uuid.class';

export class TokenCode {
  readonly value: string;

  constructor(value: string) {
    this.value = value.toUpperCase();
  }

  static create() {
    return new TokenCode(TokenCode._generate());
  }

  private static _generate() {
    return Uuid.create().value.substring(31).toUpperCase();
  }
}
