import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisInstance } from '../../common/database/redis.db';
import { GetUserDto } from '../user/dto/get-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { nanoid } from 'nanoid';
// const nanoid = customAlphabet('1234567890abcdef', 36);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // 生成token
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  // 用户登录
  async login(user: any) {
    const token = this.createToken({
      id: user.id,
      username: user.username,
    });
    // const redisNanoid = nanoid();
    //存储token到redis
    const redis = await RedisInstance.initRedis('auth.login', 0);
    const key = `${user.id}`;
    await RedisInstance.setRedis('auth.login', 0, key, token);

    return {
      access_token: token,
    };
  }

  async getUser(user: GetUserDto): Promise<any> {
    return await this.userService.findOneByUserId(user);
  }
}
