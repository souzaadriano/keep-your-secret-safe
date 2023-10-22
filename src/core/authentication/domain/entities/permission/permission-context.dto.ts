import { Uuid } from '@/core/shared/class/uuid/uuid.class';
import { ContextName } from '../../class/context-name/context-name.class';

export type TPermissionContext = {
  readonly id: Uuid;
  readonly name: ContextName;
};
