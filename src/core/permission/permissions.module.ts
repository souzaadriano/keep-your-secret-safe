import { DatabaseModule } from '@/infra/database/database.module';
import { LoggerModule } from '@/infra/logger/logger.module';
import { RedisModule } from '@/infra/redis/redis.module';
import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsRepository } from './repositories/access/permissions-repository.adapter';

@Module({
  imports: [LoggerModule, DatabaseModule, RedisModule],
  providers: [PermissionsRepository],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
