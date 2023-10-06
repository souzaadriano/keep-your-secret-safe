import { Email } from '../../email/email.class';
import { Name } from '../../name/name.class';
import { Uuid } from '../../uuid/uuid.class';

export type TUserDto = {
  name: Name;
  email: Email;
  id: Uuid;
};
