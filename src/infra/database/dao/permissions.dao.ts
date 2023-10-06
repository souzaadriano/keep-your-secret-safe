import { Injectable } from '@nestjs/common';
import { PgTypedEngine } from '../adapters/engine/pgtyped/pg-typed-engine.adapter';
import {
  createManyPermissions,
  createPermission,
  findOnePermissionById,
  findOnePermissionByName,
  findUserPermissionById,
  listPermissionsWithRoles,
} from '../queries/permissions.queries';

@Injectable()
export class PermissionsDAO {
  constructor(private readonly _engine: PgTypedEngine) {}

  readonly create = this._engine.insert('createPermission', createPermission);
  readonly listWithRoles = this._engine.select('listPermissionsWithRoles', listPermissionsWithRoles);
  readonly findById = this._engine.first('findOnePermissionById', findOnePermissionById);
  readonly findByName = this._engine.first('findOnePermissionByName', findOnePermissionByName);
  readonly createMany = this._engine.insert('createManyPermissions', createManyPermissions);
  readonly findUserPermissionById = this._engine.first('findUserPermissionById', findUserPermissionById);
}
