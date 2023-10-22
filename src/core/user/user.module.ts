import { LoggerModule } from '@/infra/logger/logger.module';
import { Module } from '@nestjs/common';
import { adapters } from './adapters';
import { repositories } from './repositories';
import { UserUseCases } from './use-cases/user-use-cases.service';
import { UserRestController } from './user-rest.controller';

@Module({
  providers: [...repositories, ...adapters, UserUseCases],
  controllers: [UserRestController],
  exports: [...repositories, ...adapters],
  imports: [LoggerModule],
})
export class UserModule {}
