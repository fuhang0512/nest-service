import { GetUserDto } from './dto/get-user.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // 用户注册
  async register(createUserDto: CreateUserDto) {
    const existUser = await this.findOneByUsername(createUserDto);
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  // 通过用户名查询
  private async findOneByUsername(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  // 通过用户名查询
  async findOneByUserId(getUserDto: GetUserDto) {
    const { id } = getUserDto;
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
