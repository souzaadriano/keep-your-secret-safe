import { HashHandler } from '@/core/user/adapters/hash-handler/hash-handler.adapter';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository/user-repository.adapter';
import { CreateUserUseCase } from './create-user/create-user.use-case';

@Injectable()
export class UserUseCases {
  constructor(private readonly _userRepository: UserRepository, private readonly _hashHandler: HashHandler) {}

  readonly createUser = new CreateUserUseCase({
    userRepository: this._userRepository,
    hashHandler: this._hashHandler,
  });
}
