/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-26 20:41:31
 * @LastEditTime: 2022-10-09 21:53:11
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\user\dto\create-user.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '用户id',
  })
  id: string;

  @ApiProperty({
    description: '用户名称',
    minLength: 4,
    maxLength: 16,
  })
  @IsNotEmpty({
    message: '不能为空',
  })
  @IsString({
    message: '必须是字符串类型',
  })
  @Length(4, 16, {
    message: '字符长度必须在4-16个之间',
  })
  username: string;

  @ApiProperty({
    description: '用户密码',
  })
  password: string;

  @ApiProperty({
    description: '手机号码',
  })
  phone?: string;
}
