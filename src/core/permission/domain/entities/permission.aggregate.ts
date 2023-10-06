import { Uuid } from '@/core/shared/class/uuid/uuid.class';
import { PermissionName } from '../class/permission-name.class';
import { Role } from './role.entity';

export class Permission {
  readonly id: Uuid;
  readonly name: PermissionName;
  readonly roles: Role[];
  readonly active: boolean;

  constructor(input: TPermissionParams) {
    this.id = input.id;
    this.name = input.name;
    this.roles = input.roles;
    this.active = input.active;
  }

  hasRole(role: Role) {
    return this.roles.some((item) => item.value === role.value);
  }

  static create(input: TCreatePermission) {
    return new Permission({
      id: Uuid.create(),
      active: !input.inactive,
      name: PermissionName.create(input.name),
      roles: input.roles ?? [],
    });
  }
}

export type TCreatePermission = {
  name: string;
  inactive?: boolean;
  roles?: Role[];
};

export type TPermissionParams = {
  id: Uuid;
  name: PermissionName;
  roles: Role[];
  active: boolean;
};
