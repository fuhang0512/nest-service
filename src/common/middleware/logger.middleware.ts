/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-26 21:18:36
 * @LastEditTime: 2022-10-11 02:36:05
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\common\middleware\logger.middleware.ts
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/log4js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const code = res.statusCode; // 响应状态码
    next();

    // 组装日志信息
    const logFormat = [];
    logFormat.push(`Method: ${req.method}`);
    logFormat.push(` Request original url: ${req.originalUrl}`);
    logFormat.push(` Status code: ${code}`);
    logFormat.push(
      ` IP: ${
        req.headers?.remoteip
          ? String(req.headers.remoteip)
          : req.ip?.split(':').pop()
      }`,
    );
    logFormat.push(` Params: ${JSON.stringify(req.params)}`);
    logFormat.push(` Query: ${JSON.stringify(req.query)}`);
    logFormat.push(` Body: ${JSON.stringify(req.body)}`);

    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat.join('\n'));
    } else if (code >= 400 && code < 500) {
      Logger.warn(logFormat.join('\n'));
    } else {
      Logger.access(logFormat.join('\n'));
      Logger.log(logFormat.join('\n'));
    }
  }
}

// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  next();
  const code = res.statusCode; //响应状态码
  // 组装日志信息
  const logFormat = [];
  logFormat.push(`Method: ${req.method}`);
  logFormat.push(` Request original url: ${req.originalUrl}`);
  logFormat.push(` Status code: ${code}`);
  logFormat.push(
    ` IP: ${
      req.headers?.remoteip
        ? String(req.headers.remoteip)
        : req.ip?.split(':').pop()
    }`,
  );
  logFormat.push(` Params: ${JSON.stringify(req.params)}`);
  logFormat.push(` Query: ${JSON.stringify(req.query)}`);
  logFormat.push(` Body: ${JSON.stringify(req.body)}`);

  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat.join('\n'));
  } else if (code >= 400 && code < 500) {
    Logger.warn(logFormat.join('\n'));
  } else {
    Logger.access(logFormat.join('\n'));
    Logger.log(logFormat.join('\n'));
  }
}
