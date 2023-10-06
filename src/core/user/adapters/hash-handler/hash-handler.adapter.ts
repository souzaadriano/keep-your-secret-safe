import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { IHashHandler } from './hash-handler.contract';

@Injectable()
export class HashHandler implements IHashHandler {
  async make(value: string): Promise<string> {
    return await hash(value, await genSalt(5));
  }

  async validate(value: string, hash: string): Promise<boolean> {
    return await compare(value, hash);
  }
}
