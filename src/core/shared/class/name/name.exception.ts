import { EXCEPTION_CODE } from '../../exception/exception-code.enum';
import { AbstractException } from '../../exception/exception.abstract';

export class InvalidFirstNameException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;

  constructor(firstName: string, minLetters: number) {
    super(`invalid first name ${firstName} must have a ${minLetters} of 3 letters`);
    this.setReason([{ message: `invalid first name ${firstName} must have a mininum of 3 letters`, target: 'name' }]);
    this.set('firstName', firstName);
    this.set('lenght', firstName.length);
  }
}

export class InvalidNameException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;

  constructor(name: string, quantity: number) {
    super(`invalid name ${name} must have a minimun of ${quantity} names`);
    const length = name.split(' ').length + 1;
    this.setReason([
      {
        message: `invalid name ${name} must have a minimun of ${quantity} names and getted ${length}`,
        target: 'name',
      },
    ]);
    this.set('name', name);
    this.set('length', length);
    this.set('minimun', quantity);
  }
}
