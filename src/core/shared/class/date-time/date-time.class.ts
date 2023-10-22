import { Time } from '../time/time.class';
import { DATE_FORMAT } from './date-format.enum';
import { TDateInterval } from './date-interval.type';
import { FormatStrategyHandler } from './format-strategies/format-strategy.handler';

export class DateTime {
  readonly value: Date;

  constructor(date: Date) {
    this.value = date;
  }

  static now() {
    return new DateTime(new Date());
  }

  static timestamp() {
    return new Date().getTime();
  }

  static fromString(date: string) {
    return new DateTime(new Date(date));
  }

  static increment(date: Date | DateTime, milliseconds: Time): DateTime {
    const input = DateTime._toDate(date);
    const timestamp = input.getTime() + milliseconds.value;
    return new DateTime(new Date(timestamp));
  }

  static decrement(date: Date | DateTime, milliseconds: Time): DateTime {
    const input = DateTime._toDate(date);
    const timestamp = input.getTime() - milliseconds.value;

    return new DateTime(new Date(timestamp));
  }

  isBetween(interval: TDateInterval): boolean {
    const { begin, end } = interval;
    if (this.isAfter(begin) && this.isBefore(end)) return true;
    if (this.isEqual(begin) || this.isEqual(end)) return true;
    return false;
  }

  isAfter(date: Date | DateTime): boolean {
    const input = DateTime._toDate(date);
    return this.timestamp() > input.getTime();
  }

  isBefore(date: Date | DateTime): boolean {
    const input = DateTime._toDate(date);
    return this.timestamp() < input.getTime();
  }

  isEqual(date: Date | DateTime): boolean {
    const input = DateTime._toDate(date);
    return this.timestamp() === input.getTime();
  }

  format(format?: DATE_FORMAT): string {
    return FormatStrategyHandler.format(this.value, format ?? DATE_FORMAT.DEFAULT);
  }

  timestamp(): number {
    return this.value.getTime();
  }

  private static _toDate(date: Date | DateTime): Date {
    return date instanceof DateTime ? date.value : date;
  }
}
