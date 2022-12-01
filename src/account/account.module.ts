import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService, AccountValidationService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { UserModule } from './../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), UserModule],
  providers: [AccountService, AccountValidationService],
  controllers: [AccountController],
})
export class AccountModule {}
