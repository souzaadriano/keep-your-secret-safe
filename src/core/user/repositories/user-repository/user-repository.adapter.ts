import { Email } from '@/core/shared/class/email/email.class';
import { Pagination } from '@/core/shared/class/pagination/pagination.class';
import { ActiveStatus } from '@/core/shared/class/status/active-status.class';
import { Uuid } from '@/core/shared/class/uuid/uuid.class';
import { TUserModel, UsersDAO } from '@/infra/database/dao/users.dao';
import { Injectable } from '@nestjs/common';
import { Hash } from '../../domain/class/hash/hash.class';
import { HumanName } from '../../domain/class/human-name/human-name.class';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from './user-repository.contract';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly _userDAO: UsersDAO) {}

  async list(pagination: Pagination): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: Uuid): Promise<UserEntity | null> {
    const data = await this._userDAO.findById({ id: id.value });
    return data ? this._adaptModel(data) : null;
  }

  async findByEmail(email: Email): Promise<UserEntity | null> {
    const data = await this._userDAO.findByEmail({ email: email.value });
    return data ? this._adaptModel(data) : null;
  }

  async find(params: { pagination: Pagination }): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  async save(user: UserEntity): Promise<void> {
    await this._emailAlreadyExists(user.email);
    await this._userDAO.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      email: user.email.value,
      hash: user.hash.value,
      id: user.id.value,
      name: user.name.value,
    });
  }

  async update(user: UserEntity): Promise<void> {
    const updatedField = UserEntity.updatedField(user);

    if (updatedField.has('email')) await this._emailAlreadyExists(user.email);

    await this._userDAO.update({
      id: user.id.value,
      email: updatedField.has('email') ? user.email.value : undefined,
      hash: updatedField.has('hash') ? user.hash.value : undefined,
      name: updatedField.has('name') ? user.name.value : undefined,
      updatedAt: new Date(),
    });
  }

  async softDelete(user: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private _adaptModel(model: TUserModel): UserEntity {
    return new UserEntity({
      active: ActiveStatus.fromNullable(model.deletedAt, 'DIFF'),
      email: new Email(model.email),
      hash: new Hash(model.hash),
      id: new Uuid(model.id),
      name: new HumanName(model.name),
    });
  }

  private async _emailAlreadyExists(email: Email) {
    const user = await this._userDAO.findByEmail({ email: email.value });
    if (!user) return;

    throw new Error(`Email ${email.value} Already registred`);
  }
}
