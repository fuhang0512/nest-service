/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-07 22:55:10
 * @LastEditTime: 2022-10-09 21:47:02
 * @LastEditors:
 * @FilePath: \nest-admin\src\modules\auth\dto\create-auth.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '请输入密码' })
  password: string;
}
