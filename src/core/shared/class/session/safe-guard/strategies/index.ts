import { SESSION_TYPE } from '../../session-type.enum';
import { ISessionFactoryStrategy } from './session-factory-strategy.contract';
import { UserSessionFactoryStrategy } from './user-session.strategy';
export * from './session-factory-strategy.contract';

const userSessionFactoryStrategy = new UserSessionFactoryStrategy();

export const sessionTypeGuardStrategies = new Map<SESSION_TYPE, ISessionFactoryStrategy<any>>([
  [userSessionFactoryStrategy.type, userSessionFactoryStrategy],
]);
