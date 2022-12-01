import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../../user/user.entity';
import { BigNumber } from 'bignumber.js';

@Injectable()
export class AccountValidationService {
  validateCredit(user: UserEntity) {
    const credit = BigNumber(user.salary).minus(user.expenses);

    if (credit.isLessThan(Number(1000)))
      throw new BadRequestException('User has not enough avaliable funds.');

    return credit;
  }
}
