import { TNullable } from '../../types/nullable.type';
import { ACTIVE_STATUS } from './active-status.enum';

export class ActiveStatus {
  constructor(readonly value: ACTIVE_STATUS) {}

  static active() {
    return new ActiveStatus(ACTIVE_STATUS.ACTIVE);
  }

  static inactive() {
    return new ActiveStatus(ACTIVE_STATUS.INACTIVE);
  }

  static fromNullable(target: TNullable<unknown>, rule: 'DIFF' | 'EQUAL'): ActiveStatus {
    if (rule === 'DIFF') {
      return target ? new ActiveStatus(ACTIVE_STATUS.INACTIVE) : new ActiveStatus(ACTIVE_STATUS.ACTIVE);
    } else {
      return target ? new ActiveStatus(ACTIVE_STATUS.ACTIVE) : new ActiveStatus(ACTIVE_STATUS.INACTIVE);
    }
  }

  active() {
    return this.value === ACTIVE_STATUS.ACTIVE;
  }

  inactive() {
    return this.value === ACTIVE_STATUS.INACTIVE;
  }

  toggle() {
    const toggledStatus = this.value === ACTIVE_STATUS.ACTIVE ? ACTIVE_STATUS.INACTIVE : ACTIVE_STATUS.ACTIVE;
    return new ActiveStatus(toggledStatus);
  }
}
