import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userDTO: UserDTO): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email: userDTO.email });

    if (user) throw new ConflictException('User already exists');

    return this.userRepository.save({
      name: userDTO.name,
      email: userDTO.email,
      expenses: userDTO.expenses,
      salary: userDTO.salary,
    });
  }

  async findOne(where: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy(where);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findMany(where: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    return this.userRepository.find(where);
  }
}
