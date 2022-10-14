/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-07 22:04:50
 * @LastEditTime: 2022-10-07 22:16:43
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\upload\dto\create-upload.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';

export class CreateUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
