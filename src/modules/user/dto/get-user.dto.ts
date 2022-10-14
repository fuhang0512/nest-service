/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-01 21:05:40
 * @LastEditTime: 2022-10-09 21:55:57
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\user\dto\get-user.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

enum UserType {
  A = '0',
  B = '1',
  C = '2',
}

export class GetUserDto {
  @ApiProperty({
    description: '用户名称',
    required: false,
    enum: UserType,
  })
  username?: string;

  @ApiProperty({
    description: '用户id',
    required: false,
  })
  id?: string;
}
