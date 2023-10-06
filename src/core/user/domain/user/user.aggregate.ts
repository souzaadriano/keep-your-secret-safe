import { Permissions } from '@/core/access/domain/class/permissions.class';
import { Roles } from '@/core/access/domain/class/roles.class';
import { Email } from '@/core/shared/class/email/email.class';
import { Name } from '@/core/shared/class/name/name.class';
import { Uuid } from '@/core/shared/class/uuid/uuid.class';

export class User {
  id: Uuid;
  name: Name;
  email: Email;
  active: boolean;
  hash: string;

  roles: Roles;
  permissions: Permissions;
}
