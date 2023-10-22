import { IHashHandler } from '@/core/user/adapters/hash-handler/hash-handler.contract';
import { Password } from '../password/password.class';

export class Hash {
  constructor(readonly value: string) {}

  async match(value: string, handler: IHashHandler) {
    await handler.validate(this.value, value);
  }

  static async create(password: Password, handler: IHashHandler) {
    const hash = await handler.hash(password.value);
    return new Hash(hash);
  }
}
