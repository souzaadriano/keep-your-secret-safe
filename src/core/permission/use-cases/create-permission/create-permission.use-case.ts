import { AbstractUseCase, TStandardInput } from '@/core/shared/contracts/use-case.abstract';
import { Permission } from '../../domain/entities/permission.aggregate';
import { Role } from '../../domain/entities/role.entity';
import { PermissionsRepository } from '../../repositories/access/permissions-repository.adapter';
import { CreatePermissionInstrumentation } from './create-permission.instrumentation';

export class CreatePermissionUseCase extends AbstractUseCase<Input, Output> {
  constructor(private readonly _permissionRepository: PermissionsRepository) {
    super();
  }

  async execute(input: TStandardInput<Input>): Promise<Output> {
    const { log, session } = input;
    const instrumentation = new CreatePermissionInstrumentation(log);

    const permissions = input.permissions.map((item) => {
      const roles = item.roles.map((role) => Role.fromName(role));
      return Permission.create({ name: item.permissionName, roles });
    });

    await this._permissionRepository.createMany(permissions);

    // instrumentation.setName(permissionName);
    // const roles = roleNames.map((role) => Role.fromName(role));
    // instrumentation.setRoles(roles);

    // const permission = Permission.create({
    //   name: permissionName,
    //   roles,
    // });

    // instrumentation.setId(permission);
    // await this._permissionRepository.createMany(permission);

    // return {
    //   permissionid: permission.id.value,
    //   roles: roleNames,
    // };
  }
}

export type Input = {
  permissions: {
    permissionName: string;
    roles: string[];
  }[];
};

export type Output = {
  permissions: {
    permissionid: string;
    roles: string[];
  }[];
};
