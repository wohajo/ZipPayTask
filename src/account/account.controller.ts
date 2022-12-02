import {
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  DefaultPagePipe,
  DefaultTakePipe,
  IsUuidPipe,
} from '../constants/utils/pipes';
import { UserService } from '../user/user.service';
import { AccountService } from './../account/services';
import { AccountEntity } from './account.entity';
import { AccountValidationService } from './services/account-validation.service';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountValidationService: AccountValidationService,
    private readonly userService: UserService,
  ) {}

  @Post('/:userId')
  @ApiCreatedResponse({
    description: 'Account',
    type: AccountEntity,
  })
  @ApiBadRequestResponse({
    description: 'Invalid id format. Should be UUID string.',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiConflictResponse({
    description: 'User or account already exists',
  })
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

  @Get()
  @ApiOkResponse({
    description: 'Accounts array',
    type: AccountEntity,
    isArray: true,
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  async getAccounts(
    @Query('page', DefaultPagePipe) page?: number,
    @Query('take', DefaultTakePipe) take?: number,
  ) {
    return this.accountService.findMany({
      order: { createdAt: 'ASC' },
      take: take,
      skip: page * take,
    });
  }
}
