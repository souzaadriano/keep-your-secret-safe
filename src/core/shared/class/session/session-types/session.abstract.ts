import { Role } from '@/core/permission/domain/entities/role.entity';
import { DateTime } from '../../date-time/date-time.class';
import { Uuid } from '../../uuid/uuid.class';
import { TPermissionDTO } from '../dtos/permission.dto';
import { SESSION_TYPE } from '../session-type.enum';

export abstract class AbstractSession<T = any> {
  abstract readonly type: SESSION_TYPE;

  readonly id: Uuid;
  readonly roles: Set<string>;
  readonly permissions: Map<string, TPermissionDTO>;
  readonly issuedAt: DateTime;
  readonly expireAt: DateTime;

  constructor(data: TAbstractSessionConstrutor<T>) {
    this.id = data.id;
    this.roles = data.roles;
    this.permissions = data.permissions;
    this.issuedAt = data.issuedAt;
    this.expireAt = data.expireAt;
  }

  isExpired(): boolean {
    const now = DateTime.now();
    return this.expireAt.isAfter(now);
  }

  hasRole(roles: Role | Role[]): boolean {
    return Array.isArray(roles) ? roles.some((role) => this.roles.has(role.value)) : this.roles.has(roles.value);
  }

  hasPermission(permissionName: string): boolean {
    const permission = this.permissions.get(permissionName);
    return permission ? permission.active : true;
  }
}

export type TAbstractSessionConstrutor<T> = T & {
  id: Uuid;
  roles: Set<string>;
  permissions: Map<string, TPermissionDTO>;
  issuedAt: DateTime;
  expireAt: DateTime;
};
