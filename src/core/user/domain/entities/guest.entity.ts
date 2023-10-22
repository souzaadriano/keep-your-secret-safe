import { DateTime } from '@/core/shared/class/date-time/date-time.class';
import { ActiveStatus } from '@/core/shared/class/status/active-status.class';
import { Uuid } from '@/core/shared/class/uuid/uuid.class';

export class GuestEntity {
  readonly id: Uuid;
  readonly inviterId: Uuid;
  readonly status: ActiveStatus;
  readonly issuedAt: DateTime;
  readonly expireAt: DateTime;

  isExpired() {
    return this.expireAt.isAfter(DateTime.now());
  }
}
