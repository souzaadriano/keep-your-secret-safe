import { Log } from '@/core/shared/class/log/log.class';

export class CheckPermissionInstrumentation {
  constructor(private readonly _log: Log) {}

  setPermissionName(name: string): void {
    this._log.set('permissionName', name);
  }

  setPermissionId(id: string): void {
    this._log.set('permissionId', id);
  }

  setPermissionGranted(mode: TPermissionAccessMode, source: TAuthorizationSource) {
    this._log.set('mode', mode);
    this._log.set('status', 'GRANTED');
    this._log.set('source', source);
  }

  setPermissionDanied() {
    this._log.set('status', 'DANIED');
  }
}

type TAuthorizationSource = 'DATABASE' | 'CACHE';
type TPermissionAccessMode = 'PERMISSION' | 'ROLE';
