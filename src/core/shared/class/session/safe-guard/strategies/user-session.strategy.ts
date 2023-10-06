import { SESSION_TYPE } from '../../session-type.enum';
import { UserSession } from '../../session-types/use-session.class';
import { ISessionFactoryStrategy } from './session-factory-strategy.contract';

export class UserSessionFactoryStrategy implements ISessionFactoryStrategy<UserSession> {
  type = SESSION_TYPE.USER_SESSION;

  guard(session: unknown): UserSession {
    if (session instanceof UserSession) return session;
    throw new Error();
  }
}
