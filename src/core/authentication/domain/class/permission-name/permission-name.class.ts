export class PermissionName {
  constructor(readonly value: string) {}

  static create(permissionName: string) {
    return new PermissionName(permissionName);
  }
}
