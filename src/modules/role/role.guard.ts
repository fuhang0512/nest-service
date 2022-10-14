/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-07 20:48:19
 * @LastEditTime: 2022-10-10 12:41:24
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\role\role.guard.ts
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      return false;
    }
    const hasRoles = roles.some((role) => role === user.role);
    if (!hasRoles) {
      throw new UnauthorizedException('您没有权限');
    }
    return hasRoles;
  }
}
