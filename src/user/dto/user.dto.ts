import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsEmail, IsCurrency } from 'class-validator';

export class UserDTO {
  @ApiProperty({
    required: true,
    description: 'name of the user',
    example: 'Jeff',
  })
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({
    required: true,
    description: 'email of the user',
    example: 'jeff@name.com',
  })
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: 'salary of the user',
    example: '10000',
  })
  @IsNotEmpty()
  @IsDefined()
  @IsCurrency()
  salary: string;

  @ApiProperty({
    required: true,
    description: 'name of the user',
    example: '4248',
  })
  @IsNotEmpty()
  @IsDefined()
  @IsCurrency()
  expenses: string;
}
