import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AccountEntity } from './../account.entity';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async create(user: UserEntity) {
    return this.accountRepository.save({
      availableCredit: '1000',
      user: {
        id: user.id,
      },
    });
  }

  findOne(where: FindOneOptions<AccountEntity>): Promise<AccountEntity> {
    return this.accountRepository.findOne(where);
  }

  async findMany(
    where: FindManyOptions<AccountEntity>,
  ): Promise<AccountEntity[]> {
    return this.accountRepository.find(where);
  }
}
