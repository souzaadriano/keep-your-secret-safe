import { DateTime } from '../../class/date-time/date-time.class';
import { Uuid } from '../../class/uuid/uuid.class';
import { RefreshSession } from './refrsh-session.class';
import { SessionOwner } from './session-owner.class';

export class SessionEntity {
  readonly id: Uuid;
  readonly owner: SessionOwner;
  readonly issuedAt: DateTime;
  readonly refresh: RefreshSession;
  readonly permissions: Set<string>;
  readonly roles: Set<string>;

  get expireAt(): DateTime {
    return DateTime.increment(this.issuedAt, this.refresh.expireTtl);
  }
}
