import {
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { IsUuidPipe } from '../constants/utils/pipes';
import { UserService } from '../user/user.service';
import { AccountService } from './account.service';
import { AccountValidationService } from './services/account-validation.service';

@Controller('accounts')
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountValidationService: AccountValidationService,
    private readonly userService: UserService,
  ) {}

  @Post('/:userId')
  async createAccountFor(@Param('userId', IsUuidPipe) userId: string) {
    const account = await this.accountService.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (account)
      throw new ConflictException('Account for this user already exists.');

    const user = await this.userService.findOne({ id: userId });

    if (!user) throw new NotFoundException('User does not exist.');

    this.accountValidationService.validateCredit(user);

    return this.accountService.create(user);
  }
}
