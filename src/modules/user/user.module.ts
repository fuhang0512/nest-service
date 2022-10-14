import { JwtService } from '@nestjs/jwt';
/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-26 20:41:31
 * @LastEditTime: 2022-10-13 13:49:59
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\user\user.module.ts
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CryptoMiddleware } from 'src/common/middleware/crypto.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtService, ConfigService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CryptoMiddleware).forRoutes('user/register');
  }
}
