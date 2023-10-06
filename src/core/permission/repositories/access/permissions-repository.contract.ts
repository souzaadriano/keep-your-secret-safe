import { Permission } from '../../domain/entities/permission.aggregate';

export interface IAccessRepository {
  permissions(): Promise<TPermissionMap>;
  permissionByName(permissionName: string): Promise<Permission | undefined>;
}

export type TPermissionMap = Map<string, Permission>;
