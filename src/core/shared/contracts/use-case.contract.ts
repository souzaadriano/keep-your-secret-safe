import { Log } from '../class/log/log.class';
import { AbstractSession } from '../class/session/session-types/session.abstract';

export interface IUseCase<INPUT, OUTPUT> {
  readonly context: string;
  execute(input: TStandardInput<INPUT>): Promise<OUTPUT>;
}

export type TStandardInput<T> = T & {
  log: Log;
  session: AbstractSession;
};
