import { Injectable } from '@nestjs/common';
import { PgTypedEngine } from '../adapters/engine/pgtyped/pg-typed-engine.adapter';
import {
  createUser,
  findByEmail,
  findById,
  findManyUsersByEmail,
  hardDeleteUsers,
  softDeleteUser,
  updateUser,
} from '../queries/users.queries';

@Injectable()
export class UsersDAO {
  constructor(private readonly _engine: PgTypedEngine) {}

  readonly create = this._engine.insert('createUser', createUser);
  readonly findById = this._engine.first('findUsersById', findById);
  readonly findByEmail = this._engine.first('findUsersByEmail', findByEmail);
  readonly softDelete = this._engine.update('softDeleteUser', softDeleteUser);
  readonly hardDelete = this._engine.delete('hardDeleteUser', hardDeleteUsers);
  readonly findManyByEmail = this._engine.select('findManyUsersByEmail', findManyUsersByEmail);
  readonly update = this._engine.update('updateUser', updateUser);
}
