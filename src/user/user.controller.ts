import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  DefaultPagePipe,
  DefaultTakePipe,
  IsUuidPipe,
} from '../constants/utils/pipes';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @Get('/:id')
  async getUser(@Param('id', IsUuidPipe) id: string) {
    return this.userService.findOne({ id: id });
  }

  @Get()
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
