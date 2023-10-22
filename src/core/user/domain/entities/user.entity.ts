import { Email } from '@/core/shared/class/email/email.class';
import { ActiveStatus } from '@/core/shared/class/status/active-status.class';
import { Uuid } from '@/core/shared/class/uuid/uuid.class';
import { IEntity } from '@/core/shared/contracts/entity/entity.contract';
import { ObjectUtils } from '@/utils';
import { Hash } from '../class/hash/hash.class';
import { HumanName } from '../class/human-name/human-name.class';

export class UserEntity implements IEntity<Uuid> {
  private readonly _updatedField = new Set<string>();
  readonly id: Uuid;
  readonly name: HumanName;
  readonly hash: Hash;
  readonly email: Email;
  readonly active: ActiveStatus;

  constructor(input: TUserProps) {
    this.id = input.id;
    this.name = input.name;
    this.hash = input.hash;
    this.email = input.email;
    this.active = input.active;
  }

  static create(input: TUserParams) {
    return new UserEntity({
      id: Uuid.create(),
      active: input.active ? ActiveStatus.active() : ActiveStatus.inactive(),
      email: Email.create(input.email),
      name: HumanName.create(input.name),
      hash: input.hash,
    });
  }

  static updatedField(user: UserEntity) {
    return user._updatedField;
  }

  update(input: TUserUpdateParams) {
    if (!ObjectUtils.hasProps(input)) return this;

    return new UserEntity({
      id: this.id,
      active: this._getSomeAndSave('active', this.active, input.active),
      email: this._getSomeAndSave('email', this.email, input.email),
      hash: this._getSomeAndSave('hash', this.hash, input.hash),
      name: this._getSomeAndSave('name', this.name, input.name),
      updatedField: new Set(this._updatedField),
    });
  }

  private _getSomeAndSave<T>(field: string, before: T, after?: T) {
    this._updatedField.add(field);
    if (after) return after;
    return before;
  }
}

type TUserUpdateParams = {
  name?: HumanName;
  hash?: Hash;
  email?: Email;
  active?: ActiveStatus;
};

type TUserProps = {
  id: Uuid;
  name: HumanName;
  hash: Hash;
  email: Email;
  active: ActiveStatus;
  updatedField?: Set<string>;
};

type TUserParams = {
  name: string;
  hash: Hash;
  email: string;
  active: boolean;
};
