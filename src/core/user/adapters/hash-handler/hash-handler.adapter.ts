import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { IHashHandler } from './hash-handler.contract';

@Injectable()
export class HashHandler implements IHashHandler {
  async hash(password: string): Promise<string> {
    return await hash(password, await genSalt(5));
  }

  async validate(hash: string, value: string): Promise<boolean> {
    return await compare(value, hash);
  }
}
