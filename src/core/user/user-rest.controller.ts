import { LoggerService } from '@/infra/logger/services/logger-service.adapter';
import { RequestHandler } from '@/infra/rest/decorators/request-handler.decorator';
import { RestHandler } from '@/infra/rest/handlers/rest.handler';
import { Controller, Post } from '@nestjs/common';
import { UserUseCases } from './use-cases/user-use-cases.service';

@Controller('user')
export class UserRestController {
  constructor(private readonly userUseCases: UserUseCases, private readonly _logger: LoggerService) {}

  @Post()
  async createUser(@RequestHandler() request: RestHandler) {
    await request.handle(this.userUseCases.createUser, this._logger);
  }
}
