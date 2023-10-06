import { Injectable } from '@nestjs/common';
import { PgTypedEngine } from '../adapters/engine/pgtyped/pg-typed-engine.adapter';
import {
  createManyRoles,
  createRole,
  findNonExistentRoles,
  listManyRolesByNames,
  listManyRolesByNamesAndUserId,
} from '../queries/roles.queries';

@Injectable()
export class RolesDAO {
  constructor(private readonly _engine: PgTypedEngine) {}

  readonly create = this._engine.insert('createRole', createRole);
  readonly findManyByNames = this._engine.select('listManyRolesByNames', listManyRolesByNames);
  readonly findNonExistentRoles = this._engine.select('findNonExistentRoles', findNonExistentRoles);
  readonly createMany = this._engine.insert('createManyRoles', createManyRoles);
  readonly findUserRolesByName = this._engine.select('listManyRolesByNamesAndUserId', listManyRolesByNamesAndUserId);
}
