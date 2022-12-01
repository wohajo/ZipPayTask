import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}
