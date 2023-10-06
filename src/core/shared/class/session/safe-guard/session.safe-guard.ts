import { AbstractSession } from '../session-types/session.abstract';
import { sessionTypeGuardStrategies } from './strategies';

export abstract class SessionSafeGurad {
  private static readonly _strategies = sessionTypeGuardStrategies;
  static get<T extends AbstractSession>(session: AbstractSession): T {
    const strategy = SessionSafeGurad._strategies.get(session.type);
    if (!strategy) throw new Error();

    return strategy.guard(session);
  }
}
