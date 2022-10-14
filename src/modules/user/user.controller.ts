/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-26 20:41:31
 * @LastEditTime: 2022-10-13 20:23:26
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\user\user.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseUUIDPipe,
  UseGuards,
  SetMetadata,
  Query,
  HttpCode,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Guest } from '../auth/guest.decorator';

@Controller('user')
@ApiTags('用户管理')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({
    summary: '用户注册',
    description: '新增用户信息',
    deprecated: false, // 接口是否废弃
  })
  @ApiResponse({ status: 201, type: User })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '登录用户详细信息',
    description: '登录用户详细信息',
  })
  async getDoctorList(@Req() req) {
    return req.user;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '通过用户id查询详细信息',
    description: '通过用户id查询详细信息',
  })
  @ApiParam({ name: 'id', description: '用户id', required: true })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  // // findOne(@Param('id' ParseUUIDPipe) id: string) {
  // //   return this.roleService.findOne(+id);
  // // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
