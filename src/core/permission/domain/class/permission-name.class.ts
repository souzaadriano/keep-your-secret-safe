export class PermissionName {
  constructor(readonly value: string) {}

  static create(value: string) {
    return new PermissionName(PermissionName._normalizeName(value));
  }

  private static _normalizeName(value: string) {
    const separatorRegex = /[.\-\/\\|; ]/g;
    const sequenceOfDashesRegex = /_+/g;

    return value.trim().replace(separatorRegex, '_').replace(sequenceOfDashesRegex, '_');
  }
}
