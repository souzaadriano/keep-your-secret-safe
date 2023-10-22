import { PermissionEntity } from '../../domain/entities/permission/permission.entity';

export interface IPermissionRespository {
  save(permission: PermissionEntity): Promise<void>;
}
