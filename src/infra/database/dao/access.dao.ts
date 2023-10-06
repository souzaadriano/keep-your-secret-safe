import { Injectable } from '@nestjs/common';
import { PgTypedEngine } from '../adapters/engine/pgtyped/pg-typed-engine.adapter';
import { createRolePermission, createUserPermission, createUserRole } from '../queries/access.queries';

@Injectable()
export class AccessDAO {
  constructor(private readonly _engine: PgTypedEngine) {}

  readonly createUserPermission = this._engine.insert('createUserPermission', createUserPermission);
  readonly createUserRole = this._engine.insert('createUserRole', createUserRole);
  readonly createRolePermission = this._engine.insert('createRolePermission', createRolePermission);
}
