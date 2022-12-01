import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../database/base.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  public credit: string;

  @OneToOne(() => UserEntity, (user) => user.account)
  @JoinColumn()
  user: UserEntity;
}
