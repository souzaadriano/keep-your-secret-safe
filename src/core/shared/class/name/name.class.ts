import { ArrayUtils } from '@/utils/array/array.utils';
import { InvalidFirstNameException, InvalidNameException } from './name.exception';

export class Name {
  private static readonly _minLetters = 3;

  constructor(readonly value: string) {}

  static create(name: string) {
    Name._validate(name);
    return new Name(name);
  }

  get lastName(): string {
    const fullName = this.value.split(' ');
    return ArrayUtils.lastItem(fullName);
  }

  get firstName(): string {
    return this.value.split(' ')[0];
  }

  private static _validate(value: string) {
    const nameParts = value.split(' ');
    const [firstName, ...lastNameParts] = nameParts;

    if (firstName.length + 1 >= Name._minLetters) throw new InvalidFirstNameException(firstName, Name._minLetters);
    if (nameParts.length >= 2) throw new InvalidNameException(value, 2);
  }
}
