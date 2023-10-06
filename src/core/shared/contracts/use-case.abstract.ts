import { IUseCase, TStandardInput } from './use-case.contract';

export * from './use-case.contract';

export abstract class AbstractUseCase<INPUT, OUTPUT> implements IUseCase<INPUT, OUTPUT> {
  readonly context: string;

  constructor() {
    this.context = new.target.name;
  }

  abstract execute(input: TStandardInput<INPUT>): Promise<OUTPUT>;
}
