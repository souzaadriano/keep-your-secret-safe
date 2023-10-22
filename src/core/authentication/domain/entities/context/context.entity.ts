import { Description } from '@/core/shared/class/description/description.class';
import { ActiveStatus } from '@/core/shared/class/status/active-status.class';
import { Uuid } from '@/core/shared/class/uuid/uuid.class';
import { IEntity } from '@/core/shared/contracts/entity/entity.contract';
import { ContextName } from '../../class/context-name/context-name.class';
import { TContextPermission } from './dto/context-permission.dto';
import { TContextRole } from './dto/context-role.dto';

export class ContextEntity implements IEntity<Uuid> {
  readonly id: Uuid;
  readonly name: ContextName;
  readonly description: Description;
  readonly status: ActiveStatus;

  constructor(props: TContextEntityProps) {}

  static create(params: TContextEntityParams) {
    return new ContextEntity({
      description: ContextName.create(params.description),
      id: Uuid.create(),
      name: ContextName.create(params.name),
      status: params.status ?? ActiveStatus.active(),
    });
  }

  async roles(repository: any): Promise<TContextRole[]> {
    throw new Error();
  }

  async permissions(repository: any): Promise<TContextPermission[]> {
    throw new Error();
  }
}

export type TContextEntityParams = {
  readonly name: string;
  readonly description: string;
  readonly status?: ActiveStatus;
};

export type TContextEntityProps = {
  readonly id: Uuid;
  readonly name: ContextName;
  readonly description: Description;
  readonly status: ActiveStatus;
};
