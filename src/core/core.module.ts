import { Module } from '@nestjs/common';
import { ExampleModule } from './example/example.module';
import { PermissionsModule } from './permission/permissions.module';

@Module({
  imports: [ExampleModule, PermissionsModule],
  exports: [ExampleModule, PermissionsModule],
})
export class CoreModule {}
