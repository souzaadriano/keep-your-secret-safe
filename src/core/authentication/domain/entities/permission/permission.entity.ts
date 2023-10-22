import { Description } from '@/core/shared/class/description/description.class';
import { ActiveStatus } from '@/core/shared/class/status/active-status.class';
import { Uuid } from '@/core/shared/class/uuid/uuid.class';
import { IEntity } from '@/core/shared/contracts/entity/entity.contract';
import { PermissionName } from '../../class/permission-name/permission-name.class';
import { RoleName } from '../../class/role-name/role-name.class';
import { TPermissionContext } from './permission-context.dto';

export class PermissionEntity implements IEntity<Uuid> {
  readonly id: Uuid;
  readonly name: PermissionName;
  readonly description: Description;
  readonly status: ActiveStatus;
  readonly roles: Set<string>;
  readonly context: TPermissionContext;

  constructor(props: TPermissionEntityProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.status = props.status;
    this.roles = props.roles;
    this.context = props.context;
  }

  static create(params: TPermissionEntityParams) {
    return new PermissionEntity({
      id: Uuid.create(),
      description: Description.create(params.description),
      context: params.context,
      name: PermissionName.create(params.name),
      roles: new Set(params.roles ?? []),
      status: params.status,
    });
  }

  hasRole(roleName: RoleName): boolean {
    return this.roles.has(roleName.value);
  }
}

export type TPermissionEntityProps = {
  readonly id: Uuid;
  readonly name: PermissionName;
  readonly description: Description;
  readonly status: ActiveStatus;
  readonly roles: Set<string>;
  readonly context: TPermissionContext;
};

export type TPermissionEntityParams = {
  readonly name: string;
  readonly description: string;
  readonly status: ActiveStatus;
  readonly roles?: string[];
  readonly context: TPermissionContext;
};
