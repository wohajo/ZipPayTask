import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
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
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created user',
    type: UserEntity,
  })
  @ApiConflictResponse({
    description: 'User with that email already exists',
  })
  async createUser(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'User',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async getUser(@Param('id', IsUuidPipe) id: string) {
    return this.userService.findOne({ id: id });
  }

  @Get()
  @ApiOkResponse({
    description: 'Users array',
    type: UserEntity,
    isArray: true,
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  async getUsers(
    @Query('page', DefaultPagePipe) page?: number,
    @Query('take', DefaultTakePipe) take?: number,
  ) {
    return this.userService.findMany({
      order: { createdAt: 'ASC' },
      take: take,
      skip: page * take,
    });
  }
}
