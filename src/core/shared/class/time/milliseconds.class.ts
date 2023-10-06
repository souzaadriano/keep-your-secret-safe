export class Milliseconds {
  constructor(readonly value: number) {}

  static fromSeconds(value: number) {
    return new Milliseconds(value * 1000);
  }

  static fromMinutes(value: number) {
    return Milliseconds.fromSeconds(value * 60);
  }

  static fromHours(value: number) {
    return Milliseconds.fromMinutes(value * 60);
  }

  static fromDays(value: number) {
    return Milliseconds.fromMinutes(value * 24);
  }

  get day(): number {
    return this.hours * 24;
  }

  get hours(): number {
    return this.minutes * 60;
  }

  get minutes(): number {
    return this.seconds * 60;
  }

  get seconds(): number {
    return this.value * 1000;
  }
}
