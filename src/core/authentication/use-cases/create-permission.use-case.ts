import { ActiveStatus } from '@/core/shared/class/status/active-status.class';
import { AbstractUseCase, TStandardInput } from '@/core/shared/contracts/use-case.abstract';
import { ContextName } from '../domain/class/context-name/context-name.class';
import { RoleName } from '../domain/class/role-name/role-name.class';
import { ContextEntity } from '../domain/entities/context/context.entity';
import { PermissionEntity } from '../domain/entities/permission/permission.entity';
import { RoleEntity } from '../domain/entities/role/role.entity';
import { IContextRepository } from '../repositories/context-repository/context-repository.contract';
import { IPermissionRespository } from '../repositories/permission-repository/permission-repository.contract';
import { IRoleRepository } from '../repositories/role-repository/role-repository.contract';

export class CreatePermissionUseCase extends AbstractUseCase<Input, Output, Dependencies> {
  async execute(input: TStandardInput<Input>): Promise<Output> {
    const { permissionRepository } = this._dependencies;
    const { contextName, description, log, name, roles, session } = input;
    const context = await this._getContext(ContextName.create(contextName));
    await this._getRoles(context, roles);

    const permission = PermissionEntity.create({
      name,
      description,
      status: ActiveStatus.active(),
      context: { id: context.id, name: context.name },
      roles: roles,
    });

    await permissionRepository.save(permission);

    return { id: permission.id.value, name: permission.name.value };
  }

  private async _getRoles(context: ContextEntity, roles: string[]) {
    const { roleRepository } = this._dependencies;
    const roleNames = roles.map((name) => RoleName.create(name));
    const data = await roleRepository.exists(roleNames);

    const create: RoleEntity[] = [];
    const bind: RoleEntity[] = [];

    for (const roleName of roleNames) {
      const role = data.get(roleName.value);
      role instanceof RoleEntity
        ? create.push(role)
        : bind.push(
            RoleEntity.create({
              context: { id: context.id, name: context.name },
              description: '',
              id: role.value,
            }),
          );
    }

    await roleRepository.saveMany(create);

    return roleNames;
  }

  private async _getContext(contextName: ContextName) {
    const { contextRepository } = this._dependencies;
    const context = await contextRepository.findByName(contextName);
    if (context) return context;
    return ContextEntity.create({
      name: contextName.value,
      description: '',
    });
  }
}

export type Input = {
  contextName: string;
  name: string;
  description: string;
  roles?: string[];
};
export type Output = {};
export type Dependencies = {
  contextRepository: IContextRepository;
  roleRepository: IRoleRepository;
  permissionRepository: IPermissionRespository;
};
