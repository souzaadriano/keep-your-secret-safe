import { BearerToken } from '../../token/bearer-token.class';
import { TUserDto } from '../dtos/user.dto';
import { SESSION_TYPE } from '../session-type.enum';
import { AbstractSession, TAbstractSessionConstrutor } from './session.abstract';

export class UserSession extends AbstractSession {
  readonly type = SESSION_TYPE.USER_SESSION;
  readonly user: TUserDto;
  readonly token: BearerToken;

  constructor(input: Constructor) {
    super(input);

    this.user = input.user;
    this.token = input.token;
  }
}

type Constructor = TAbstractSessionConstrutor<{
  user: TUserDto;
  token: BearerToken;
}>;
