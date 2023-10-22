import { PASSWORD_STRENGTH } from './password-strength.enum';

export abstract class PasswordStrengthValidator {
  private static medium = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
  private static strong = new RegExp(
    '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))',
  );

  static get(value: string): PASSWORD_STRENGTH {
    if (this.strong.test(value)) return PASSWORD_STRENGTH.STRONG;
    if (this.medium.test(value)) return PASSWORD_STRENGTH.MEDIUM;
    return PASSWORD_STRENGTH.WEAK;
  }
}
