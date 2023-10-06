import { Role } from '../entities/role.entity';

export class RoleModel {
  readonly name: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor(model: TRoleModel) {
    this.name = model.name;
    this.description = model.description;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  static fromString(name: string, description?: string) {
    return new RoleModel({
      name,
      description: description ?? '',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }

  static fromDomain(role: Role) {
    return new RoleModel({
      name: role.value,
      description: role.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: role.active ? null : new Date(),
    });
  }

  static toDomain(role: RoleModel | TRoleModel) {
    return new Role({
      roleName: role.name,
      description: role.description,
      active: role.deletedAt ? false : true,
    });
  }

  toDomain(role: RoleModel | TRoleModel): Role {
    return RoleModel.toDomain(role);
  }
}

export type TRoleModel = {
  readonly name: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};
