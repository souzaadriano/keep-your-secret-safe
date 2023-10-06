import { LoggerService } from '@/infra/logger/services/logger-service.adapter';
import { RequestHandler } from '@/infra/rest/decorators/request-handler.decorator';
import { RestHandler } from '@/infra/rest/handlers/rest.handler';
import { Controller, Get } from '@nestjs/common';
import { CheckPermissionUseCase } from './use-cases/check-permission/check-permission.use-case';

@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly _checkPermissionUseCase: CheckPermissionUseCase,
    private readonly _logger: LoggerService,
  ) {}

  @Get('access/:permissionName')
  async checkPermission(@RequestHandler() request: RestHandler) {
    await request.handle(this._checkPermissionUseCase, this._logger);
  }
}
