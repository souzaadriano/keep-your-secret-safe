import { EXCEPTION_CODE } from '@/core/shared/exception/exception-code.enum';
import { AbstractException } from '@/core/shared/exception/exception.abstract';
import { PASSWORD_STRENGTH } from './password-strength.enum';

export class WeakPasswordException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;

  constructor(strength: PASSWORD_STRENGTH, passwordStrength: PASSWORD_STRENGTH) {
    super(`password is ${passwordStrength} and must be ${strength}`);
    this.set('strength', strength);
    this.set('passwordStrength', passwordStrength);
  }
}

export class PasswordAndConfirmationNotMatchException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;

  constructor() {
    super(`password and confirmation not match`);
  }
}
