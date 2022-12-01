import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { BaseEntity } from '../database/base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  public name: string;

  @ApiProperty()
  @Column()
  public email: string;

  @ApiProperty()
  @Column()
  public salary: string;

  @ApiProperty()
  @Column()
  public expenses: string;

  @OneToOne(() => AccountEntity, (account) => account.user)
  account: AccountEntity;
}
