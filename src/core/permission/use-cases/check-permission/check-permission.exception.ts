import { AbstractSession } from '@/core/shared/class/session/session-types/session.abstract';
import { EXCEPTION_CODE } from '@/core/shared/exception/exception-code.enum';
import { AbstractException } from '@/core/shared/exception/exception.abstract';
import { Permission } from '../../domain/entities/permission.aggregate';
import { Role } from '../../domain/entities/role.entity';

export class PermissionDaniedException extends AbstractException {
  readonly code = EXCEPTION_CODE.FORBBIDEN;

  constructor(session: AbstractSession, permission: Permission) {
    super(`${session.id.value}`);

    this.set('session', {
      id: session.id.value,
      type: session.type,
      roles: Array.from(session.roles),
      permissions: Array.from(session.permissions.keys()),
    });

    this.set('permission', {
      name: permission.name,
      id: permission.id.value,
      roles: permission.roles.map((role) => role.value),
    });
  }

  private static rolesToString(roles: Role[]) {
    return roles.map((role) => role.value);
  }
}
