import { Milliseconds } from './milliseconds.class';

export class Time {
  private readonly _milliseconds: Milliseconds;

  /** @todo */
  //private readonly seconds;
  //private readonly minutes;
  //private readonly hours;
  //private readonly days;

  constructor(readonly value: number) {
    this._milliseconds = new Milliseconds(value);
  }

  get milliseconds() {
    return this._milliseconds.value;
  }
}
