import { AbstractSession } from '@/core/shared/class/session/session-types/session.abstract';
import { Uuid } from '@/core/shared/class/uuid/uuid.class';
import { AbstractUseCase } from '@/core/shared/contracts/use-case.abstract';
import { TStandardInput } from '@/core/shared/contracts/use-case.contract';
import { Injectable } from '@nestjs/common';
import { Permission } from '../../domain/entities/permission.aggregate';
import { PermissionsRepository } from '../../repositories/access/permissions-repository.adapter';
import { PermissionDaniedException } from './check-permission.exception';
import { CheckPermissionInstrumentation } from './check-permission.instrumentation';

@Injectable()
export class CheckPermissionUseCase extends AbstractUseCase<Input, void> {
  constructor(private readonly _accessRepository: PermissionsRepository) {
    super();
  }

  async execute(input: TStandardInput<Input>): Promise<void> {
    const { log, session, permissionId } = input;
    const instrumentation = new CheckPermissionInstrumentation(log);
    instrumentation.setPermissionId(permissionId);

    const permissionUuid = new Uuid(permissionId);
    const permission = await this._accessRepository.findPermissionById(permissionUuid);

    instrumentation.setPermissionName(permission.name.value);
    if (await this._validateOnCache(instrumentation, permission, session)) return;
    if (await this._validateOnDatabase(instrumentation, permission, session)) return;

    instrumentation.setPermissionDanied();
    throw new PermissionDaniedException(session, permission);
  }

  private async _validateOnDatabase(
    instrumentation: CheckPermissionInstrumentation,
    permission: Permission,
    session: AbstractSession,
  ) {
    const sessionRoles = await this._accessRepository.getSessionRoleByRoles(permission.roles, session);
    if (sessionRoles.length) {
      instrumentation.setPermissionGranted('ROLE', 'DATABASE');
      return true;
    }

    const sessionPermission = await this._accessRepository.getSessionPermissionByName(permission, session);
    if (!sessionPermission) {
      instrumentation.setPermissionGranted('PERMISSION', 'DATABASE');
      return true;
    }

    return false;
  }

  private async _validateOnCache(
    instrumentation: CheckPermissionInstrumentation,
    permission: Permission,
    session: AbstractSession,
  ) {
    if (this._validatePermission(session, permission)) {
      instrumentation.setPermissionGranted('PERMISSION', 'CACHE');
      return true;
    }

    if (session.hasRole(permission.roles)) {
      instrumentation.setPermissionGranted('ROLE', 'CACHE');
      return true;
    }

    return false;
  }

  private _validatePermission(session: AbstractSession, permission: Permission) {
    const sessionPermission = session.permissions.get(permission.name.value);
    if (sessionPermission && !sessionPermission.active) throw new PermissionDaniedException(session, permission);
    if (!sessionPermission) return false;
    return true;
  }
}

export type Input = {
  permissionId: string;
};
