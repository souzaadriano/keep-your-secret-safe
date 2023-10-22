import { Time } from '@/core/shared/class/time/milliseconds.class';
import { TGenericInterval } from '@/core/shared/types/generic-interval.type';
import { TJsonDocument } from '@/core/shared/types/json-document.type';

export interface IRedisEngine {
  set(key: string, value: string, ttl?: Time): Promise<void>;
  get(key: string): Promise<string | null>;
  setBuffer(key: string, value: Buffer, ttl?: Time): Promise<void>;
  getBuffer(key: string): Promise<Buffer | null>;
  setJson(key: string, value: TJsonDocument, ttl?: Time): Promise<void>;
  getJson<T>(key: string): Promise<T | null>;
  refresh(key: string, ttl: Time, type: 'SUM' | 'SET'): Promise<void>;
  has(key: string): Promise<boolean>;
  delete(key: string): Promise<void>;
  getList(key: string, interval?: TGenericInterval<number>): Promise<string[]>;
  consumeList(key: string, mode: 'BEFORE' | 'AFTER', quantity: number);
  setList(key: string, mode: 'BEFORE' | 'AFTER', ...value: any[]): Promise<void>;
  searchKeys(key: string): Promise<string[]>;
}
