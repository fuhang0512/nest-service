/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-07 23:32:27
 * @LastEditTime: 2022-10-10 15:27:33
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\common\middleware\crypto.middleware.ts
 */
import { hashPassword } from '../utils/Encryption';
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';

@Injectable()
export class CryptoMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    let userPassword = req.body['password'];
    if (userPassword) {
      userPassword = hashPassword(userPassword);
      req.body['password'] = userPassword;
    }
    next();
  }
}
