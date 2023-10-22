import { Email } from '@/core/shared/class/email/email.class';
import { AbstractUseCase, TStandardInput } from '@/core/shared/contracts/use-case.abstract';
import { IHashHandler } from '@/core/user/adapters/hash-handler/hash-handler.contract';
import { Hash } from '../../domain/class/hash/hash.class';
import { PASSWORD_STRENGTH } from '../../domain/class/password/password-strength.enum';
import { Password } from '../../domain/class/password/password.class';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../repositories/user-repository/user-repository.contract';

export class CreateUserUseCase extends AbstractUseCase<Input, Output, Dependencies> {
  async execute(input: TStandardInput<Input>): Promise<Output> {
    const { confirmPassword, email, name, password } = input;
    const { hashHandler, userRepository } = this._dependencies;
    await this._validateEmail(email);
    const userPassword = Password.create(password, confirmPassword, PASSWORD_STRENGTH.MEDIUM);
    const hash = await Hash.create(userPassword, hashHandler);
    const user = UserEntity.create({ name, email, hash, active: true });
    await userRepository.save(user);

    return { userId: user.id.value, name, email };
  }

  private async _validateEmail(email: string) {
    const user = await this._dependencies.userRepository.findByEmail(Email.create(email));
    if (user) throw new Error();
  }
}

export type Input = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};
export type Output = {
  name: string;
  userId: string;
  email: string;
};

export type Dependencies = {
  hashHandler: IHashHandler;
  userRepository: IUserRepository;
};
