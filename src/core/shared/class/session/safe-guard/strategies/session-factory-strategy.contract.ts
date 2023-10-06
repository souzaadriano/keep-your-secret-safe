import { SESSION_TYPE } from '../../session-type.enum';

export interface ISessionFactoryStrategy<T> {
  readonly type: SESSION_TYPE;
  guard(session: unknown): T;
}
