import { EnumValidator } from './enum-validator.factory';

export abstract class EnumUtils {
  static validatorFactory = EnumValidator.factory;
}
