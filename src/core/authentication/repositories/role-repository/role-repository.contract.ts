import { RoleName } from '../../domain/class/role-name/role-name.class';
import { TRolePermission } from '../../domain/entities/role/dto/role-permission.dto';
import { RoleEntity } from '../../domain/entities/role/role.entity';

export interface IRoleRepository {
  loadPermissions(role: RoleEntity): Promise<TRolePermission[]>;
  exists(roleNames: RoleName[]): Promise<Map<string, RoleName | RoleEntity>>;
  save(role: RoleEntity): Promise<void>;
  saveMany(roles: RoleEntity[]): Promise<void>;
}
