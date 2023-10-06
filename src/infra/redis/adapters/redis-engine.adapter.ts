import { Milliseconds } from '@/core/shared/class/time/milliseconds.class';
import { TGenericInterval } from '@/core/shared/types/generic-interval.type';
import { TJsonDocument } from '@/core/shared/types/json-document.type';
import { Injectable } from '@nestjs/common';
import { RedisConnector } from './redis-connector.adapter';
import { IRedisEngine } from './redis-engine.contract';

@Injectable()
export class RedisEngine implements IRedisEngine {
  constructor(private readonly _engine: RedisConnector) {}

  async set(key: string, value: string, ttl?: Milliseconds): Promise<void> {
    ttl ? await this._engine.engine.set(key, value, 'PX', ttl.value) : await this._engine.engine.set(key, value);
  }

  async get(key: string): Promise<string> {
    return (await this._engine.engine.get(key)) ?? null;
  }

  async setList(key: string, mode: 'BEFORE' | 'AFTER', ...value: any[]): Promise<void> {
    mode === 'AFTER' ? await this._engine.engine.lpush(key, ...value) : await this._engine.engine.rpush(key, ...value);
  }

  async consumeList(key: string, mode: 'BEFORE' | 'AFTER', quantity: number) {
    new Array(quantity).fill(key).map(async (value: string) => {
      return mode === 'AFTER' ? await this._engine.engine.rpop(value) : await this._engine.engine.lpop(value);
    });
  }

  async getList(key: string, interval?: TGenericInterval<number>): Promise<string[]> {
    return await this._engine.engine.lrange(key, interval.begin ?? 0, interval.end ?? -1);
  }

  async setBuffer(key: string, value: Buffer, ttl?: Milliseconds): Promise<void> {
    ttl ? await this._engine.engine.set(key, value, 'PX', ttl.value) : await this._engine.engine.set(key, value);
  }

  async getBuffer(key: string): Promise<Buffer> {
    return (await this._engine.engine.getBuffer(key)) ?? null;
  }

  async setJson(key: string, value: TJsonDocument, ttl?: Milliseconds): Promise<void> {
    await this.set(key, JSON.stringify(value));
  }

  async getJson<T>(key: string): Promise<T> {
    const value = await this.get(key);
    if (!value) return null;
    return JSON.parse(value);
  }

  async delete(key: string): Promise<void> {
    await this._engine.engine.del(key);
  }

  async refresh(key: string, ttl: Milliseconds, type: 'SUM' | 'SET' = 'SET'): Promise<void> {
    if (type === 'SET') {
      await this._engine.engine.pexpire(key, ttl.value);
    } else {
      const currentTtl = await this.ttl(key);
      const expireInMs = currentTtl.value + ttl.value;
      await this._engine.engine.pexpire(key, expireInMs);
    }
  }

  async ttl(key: string): Promise<Milliseconds> {
    const currentTtl = await this._engine.engine.pttl(key);
    return new Milliseconds(currentTtl);
  }

  async has(key: string): Promise<boolean> {
    const result = await this._engine.engine.exists(key);
    return result > 0;
  }

  async searchKeys(key: string): Promise<string[]> {
    const keys = await this._engine.engine.keys(key);
    return keys ?? [];
  }
}
