import { Uuid } from '../../uuid/uuid.class';

export type TPermissionDTO = {
  id: Uuid;
  name: string;
  active: boolean;
};
