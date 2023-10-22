import { Uuid } from '@/core/shared/class/uuid/uuid.class';
import { ContextName } from '../../../class/context-name/context-name.class';

export type TRoleContextDto = {
  readonly id: Uuid;
  readonly name: ContextName;
};
