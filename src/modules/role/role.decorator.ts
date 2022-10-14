/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-07 21:04:57
 * @LastEditTime: 2022-10-07 21:24:09
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\guard\role.decorator.ts
 */
import {
  createParamDecorator,
  SetMetadata,
  ExecutionContext,
  applyDecorators, // 组合装饰器
} from '@nestjs/common';
import type { Request } from 'express';

export const Role = (...args: string[]) => SetMetadata('role', args);

export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    console.log(data, '==================>');
    // return req.url;
    return applyDecorators(Role);
  },
);
