import { Password } from '@/core/user/domain/class/password/password.class';

export interface IHashHandler {
  hash(password: string): Promise<string>;
  validate(hash: string, value: string): Promise<boolean>;
}
