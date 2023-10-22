import { StringUtils } from '@/utils';
import { HUMAN_NAME_CONSTANTS } from './human-name.constant';
import { InvalidNameException, NameIsTooLargeException } from './human-name.exception';

export class HumanName {
  constructor(readonly value: string) {}

  static create(value: string) {
    HumanName._validate(value);
    return new HumanName(StringUtils.capitalizeAll(value));
  }

  private static _validate(value: string) {
    const [firstName, ...lastNames] = value.split(' ');
    const lastName = lastNames.join(' ');

    if (value.length > HUMAN_NAME_CONSTANTS.MAX_HUMAN_NAME_LENGTH) {
      throw new NameIsTooLargeException(value, HUMAN_NAME_CONSTANTS.MAX_HUMAN_NAME_LENGTH);
    }

    if (firstName.length < HUMAN_NAME_CONSTANTS.MIN_HUMAN_NAME_PART_LENGTH) {
      throw new InvalidNameException(value, HUMAN_NAME_CONSTANTS.MIN_HUMAN_NAME_PART_LENGTH);
    }

    if (lastName.length < HUMAN_NAME_CONSTANTS.MIN_HUMAN_NAME_PART_LENGTH) {
      throw new InvalidNameException(value, HUMAN_NAME_CONSTANTS.MIN_HUMAN_NAME_PART_LENGTH);
    }
  }

  get first() {
    return this.value.split(' ')[0];
  }

  get last() {
    return this.value.split(' ').slice(1).join(' ');
  }
}
