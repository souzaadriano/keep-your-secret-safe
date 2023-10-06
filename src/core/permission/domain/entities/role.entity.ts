export class Role {
  readonly value: string;
  readonly description: string;
  readonly active: boolean;

  constructor(input: TRoleParams) {
    this.value = input.roleName;
    this.description = input.description;
    this.active = input.active;
  }

  static fromName(roleName: string) {
    return new Role({ roleName, active: true, description: '' });
  }
}

export type TRoleParams = {
  roleName: string;
  description: string;
  active: boolean;
};
