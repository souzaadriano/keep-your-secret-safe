import { ITypeGuardStrategy } from '../../type-guard/type-guard-strategy.contract';
import { SESSION_TYPE } from '../session-type.enum';

export interface ISessionSafeGuardStrategyHandler<INPUT> extends ITypeGuardStrategy<SESSION_TYPE, INPUT, void> {}
