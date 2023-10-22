import { PasswordStrengthValidator } from './password-strength-validator.util';
import { PASSWORD_STRENGTH } from './password-strength.enum';
import { PasswordAndConfirmationNotMatchException, WeakPasswordException } from './password.exception';

export class Password {
  readonly strength: PASSWORD_STRENGTH;

  constructor(readonly value: string, strength?: PASSWORD_STRENGTH) {
    this.strength = strength ?? PASSWORD_STRENGTH.NONE;
  }

  static create(value: string, confirmation: string, strength?: PASSWORD_STRENGTH) {
    if (value !== confirmation) throw new PasswordAndConfirmationNotMatchException();
    Password._validate(value, strength ?? PASSWORD_STRENGTH.MEDIUM);
    return new Password(value, strength);
  }

  private static _validate(value: string, strength: PASSWORD_STRENGTH) {
    const passwordStrength = PasswordStrengthValidator.get(value);
    if (strength !== passwordStrength) throw new WeakPasswordException(strength, passwordStrength);
  }
}
