import { Email } from '../../class/email/email.class';
import { Uuid } from '../../class/uuid/uuid.class';
import { SESSION_ONWER_TYPE } from './sesssion-type.enum';

export class SessionOwner {
  id: Uuid;
  name: string;
  email: Email;
  type: SESSION_ONWER_TYPE;
}
