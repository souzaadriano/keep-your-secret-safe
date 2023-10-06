import { Module } from '@nestjs/common';

export * from './domain/user/user.aggregate';

@Module({})
export class UserModule {}
