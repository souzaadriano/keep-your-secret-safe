import { EXCEPTION_CODE } from '@/core/shared/exception/exception-code.enum';
import { AbstractException } from '@/core/shared/exception/exception.abstract';

export class NameIsTooLargeException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;

  constructor(name: string, max: number) {
    super(`name is too large, max characteres is ${max}`);
    this.set('name', name);
    this.set('max', max);
  }
}

export class InvalidNameException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;

  constructor(name: string, min: number) {
    super(`invalid name minimun characters is ${min} `);
    this.set('name', name);
    this.set('min', min);
  }
}
