import { DateTime } from '../../class/date-time/date-time.class';
import { Uuid } from '../../class/uuid/uuid.class';
import { IEntity } from '../../contracts/entity/entity.contract';
import { TokenCode } from './token-code.class';
import { TOKEN_STATUS } from './token-status.enum';
import { TOKEN_TYPE } from './token-type.enum';

export class TokenEntity implements IEntity<Uuid> {
  readonly id: Uuid;
  readonly type: TOKEN_TYPE;
  readonly code: TokenCode;
  readonly ownerId: Uuid;
  readonly issuedAt: DateTime;
  readonly expireAt: DateTime;
  readonly status: TOKEN_STATUS;

  match(code: TokenCode): boolean {
    return this.code.value === code.value;
  }

  isExpired(): boolean {
    return this.expireAt.isBefore(DateTime.now());
  }

  isPending() {
    return this.status === TOKEN_STATUS.PENDING;
  }
}
