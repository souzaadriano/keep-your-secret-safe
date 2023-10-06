import { Log } from '@/core/shared/class/log/log.class';
import { Permission } from '../../domain/entities/permission.aggregate';
import { Role } from '../../domain/entities/role.entity';

export class CreatePermissionInstrumentation {
  constructor(private readonly _log: Log) {}

  setPermissions(permissions: Permission[]) {
    permissions.map((permission) => {
      this._log.set('permission', {

      });
    });
  }

  setId(permission: Permission) {
    this._log.set('permissionId', permission.id.value);
  }

  setRoles(roles: Role[]) {
    this._log.set(
      'roles',
      roles.map((role) => role.value),
    );
  }
}
