/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-28 23:07:29
 * @LastEditTime: 2022-10-10 13:36:38
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\auth\auth.controller.ts
 */
import {
  Controller,
  Req,
  Post,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('auth管理')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: CreateAuthDto, @Req() req) {
    return this.authService.login(req.user);
  }
}
