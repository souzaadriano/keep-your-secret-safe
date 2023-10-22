import { Counter } from '../../class/counter/counter.class';
import { DateTime } from '../../class/date-time/date-time.class';
import { Time } from '../../class/time/time.class';

export class RefreshSession {
  readonly counter: Counter;
  readonly ttl: Time;
  readonly refrashAt: DateTime;

  get expireTtl() {
    const millisecond = this.ttl.value * this.counter.value + this.ttl.value;
    return Time.fromMillisecond(millisecond);
  }
}
