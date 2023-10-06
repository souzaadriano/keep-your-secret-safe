import { Uuid } from '@/core/shared/class/uuid/uuid.class';
import { Permission } from '../entities/permission.aggregate';
import { Role } from '../entities/role.entity';

export class PermissionModel {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor(model: TPermissionModel) {
    this.id = model.id;
    this.name = model.name;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  static fromDomain(permission: Permission) {
    return new PermissionModel({
      id: permission.id.value,
      name: permission.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: permission.active ? null : new Date(),
    });
  }

  static toDomain(model: PermissionModel, roles?: Role[]) {
    return new Permission({
      id: new Uuid(model.id),
      name: model.name,
      active: model.deletedAt ? false : true,
      roles: roles ?? [],
    });
  }

  toDomain() {}
}

export type TPermissionModel = {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};
