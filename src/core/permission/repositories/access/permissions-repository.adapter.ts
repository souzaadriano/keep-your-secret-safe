import { CacheKey } from '@/core/shared/class/cache-key/cache-key.class';
import { SessionSafeGurad, UserSession } from '@/core/shared/class/session';
import { AbstractSession } from '@/core/shared/class/session/session-types/session.abstract';
import { Uuid } from '@/core/shared/class/uuid/uuid.class';
import { PermissionsDAO } from '@/infra/database/dao/permissions.dao';
import { RolesDAO } from '@/infra/database/dao/roles.dao';
import { IFindOnePermissionByNameResult } from '@/infra/database/queries/permissions.queries';
import { RedisEngine } from '@/infra/redis/adapters/redis-engine.adapter';
import { Injectable } from '@nestjs/common';
import { PermissionName } from '../../domain/class/permission-name.class';
import { Permission } from '../../domain/entities/permission.aggregate';
import { Role } from '../../domain/entities/role.entity';
import { PermissionModel } from '../../domain/models/permission.model';
import { RoleModel } from '../../domain/models/role.model';

@Injectable()
export class PermissionsRepository {
  private readonly _permissionByNameKey = CacheKey.create<{ permissionName: string }>('PERMISSION/:permissionName');
  private readonly _permissionByIdKey = CacheKey.create<{ id: string }>('PERMISSION/:id');

  constructor(
    private readonly _permissionsDAO: PermissionsDAO,
    private readonly _rolesDAO: RolesDAO,
    private readonly _redis: RedisEngine,
  ) {}

  async findPermissionByName(permissionName: string): Promise<Permission> {
    const key = this._permissionByNameKey.build({ permissionName });
    const cache = await this._redis.getJson<IFindOnePermissionByNameResult>(key);

    if (cache) return this._toPermission(cache);
    const permission = await this._permissionsDAO.findByName({ permissionName });

    await this._redis.setJson(key, permission as any);
    return this._toPermission(permission);
  }

  async findPermissionById(permissionId: Uuid): Promise<Permission> {
    const key = this._permissionByIdKey.build({ id: permissionId.value });
    const cache = await this._redis.getJson<IFindOnePermissionByNameResult>(key);

    if (cache) return this._toPermission(cache);
    const permission = await this._permissionsDAO.findById({ id: permissionId.value });

    await this._redis.setJson(key, permission as any);
    return this._toPermission(permission);
  }

  async getSessionPermissionByName(permission: Permission, session: AbstractSession): Promise<Permission | undefined> {
    const userSession = SessionSafeGurad.get<UserSession>(session);
    const userPermission = await this._permissionsDAO.findUserPermissionById({
      permissionId: permission.id.value,
      userId: userSession.user.id.value,
    });

    return userPermission ? permission : undefined;
  }

  async getSessionRoleByRoles(roles: Role[], session: AbstractSession): Promise<Role[]> {
    const userSession = SessionSafeGurad.get<UserSession>(session);
    const userRoles = await this._rolesDAO.findUserRolesByName({
      names: roles.map((role) => role.value),
      userId: userSession.user.id.value,
    });

    if (userRoles.length) return userRoles.map((role) => Role.fromName(role.name));
  }

  async createMany(permissions: Permission[]): Promise<void> {
    const roles = this._getAllUniqueRoles(permissions);
    const rolesToCreate = await this._rolesDAO.findNonExistentRoles({ names: roles });
    await this._rolesDAO.createMany({ roles: rolesToCreate.map((role) => RoleModel.fromString(role.name)) });
    await this._permissionsDAO.createMany({
      permissions: permissions.map((permission) => PermissionModel.fromDomain(permission)),
    });

    await this._setPermissionsOnCache(permissions);
  }

  private async _setPermissionsOnCache(permissions: Permission[]) {
    const promisses = permissions.map(async (permission) => {
      const key = this._permissionByIdKey.build({ id: permission.id.value });
      await this._redis.setJson(key, permission as any);
    });

    Promise.all(promisses);
  }

  private _getAllUniqueRoles(permissions: Permission[]) {
    const roles = permissions.reduce((roles, permission) => {
      roles.push(...permission.roles.map((role) => role.value));
      return roles;
    }, [] as string[]);

    return Array.from(new Set(roles).values());
  }

  private _toPermission(dataset: IFindOnePermissionByNameResult): Permission {
    const roles = dataset.roles.split(';').map((roleName) => Role.fromName(roleName));

    return new Permission({
      active: true,
      id: new Uuid(dataset.id),
      name: new PermissionName(dataset.name),
      roles: roles,
    });
  }
}
