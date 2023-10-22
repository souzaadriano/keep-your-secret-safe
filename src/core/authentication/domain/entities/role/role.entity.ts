import { IRoleRepository } from '@/core/authentication/repositories/role-repository/role-repository.contract';
import { Description } from '@/core/shared/class/description/description.class';
import { IEntity } from '@/core/shared/contracts/entity/entity.contract';
import { RoleName } from '../../class/role-name/role-name.class';
import { TRoleContextDto } from './dto/role-context.dto';
import { TRolePermission } from './dto/role-permission.dto';

export class RoleEntity implements IEntity<RoleName> {
  private _permissions?: TRolePermission[];
  readonly id: RoleName;
  readonly description: Description;
  readonly context: TRoleContextDto;

  constructor(props: TRoleEntityProps) {
    this._permissions = props.permissions;
    this.id = props.id;
    this.description = props.description;
    this.context = props.context;
  }

  static create(params: TRoleEntityParams) {
    return new RoleEntity({
      context: params.context,
      id: RoleName.create(params.id),
      description: Description.create(params.description),
      permissions: params.permissions,
    });
  }

  async permissions(repository: IRoleRepository): Promise<TRolePermission[]> {
    if (this._permissions) return this._permissions;

    const permissions = await repository.loadPermissions(this);
    this._permissions = permissions;
    return permissions;
  }
}

export type TRoleEntityProps = {
  readonly permissions?: TRolePermission[];
  readonly id: RoleName;
  readonly description: Description;
  readonly context: TRoleContextDto;
};

export type TRoleEntityParams = {
  readonly permissions?: TRolePermission[];
  readonly id: string;
  readonly description: string;
  readonly context: TRoleContextDto;
};
