/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-12 10:22:20
 * @LastEditTime: 2022-10-12 10:23:01
 * @LastEditors:
 * @FilePath: \nest-admin\src\modules\auth\guest.decorator.ts
 */
import { SetMetadata } from '@nestjs/common';
import { ALLOW_GUEST } from './constants';

export const Guest = (...args: string[]) => SetMetadata(ALLOW_GUEST, args);
