/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-27 22:28:02
 * @LastEditTime: 2022-10-13 20:24:17
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\common\interceptors\response.interceptor.ts
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Logger } from '../utils/log4js';

interface Data<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Data<T>> | Promise<Observable<Data<T>>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const code = response.statusCode;

    // 组装日志信息
    const logFormat = [];
    logFormat.push(`Method: ${request.method}`);
    logFormat.push(` Request original url: ${request.originalUrl}`);
    logFormat.push(` Status code: ${code}`);
    logFormat.push(
      ` IP: ${
        request.headers?.remoteip
          ? String(request.headers.remoteip)
          : request.ip?.split(':').pop()
      }`,
    );
    // logFormat.push(` message: ${message || exception.getResponse()}`);
    logFormat.push(` Params: ${JSON.stringify(request.params)}`);
    logFormat.push(` Query: ${JSON.stringify(request.query)}`);
    logFormat.push(` Body: ${JSON.stringify(request.body)}`);

    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat.join('\n'));
    } else if (code >= 400 && code < 500) {
      Logger.warn(logFormat.join('\n'));
    } else {
      Logger.access(logFormat.join('\n'));
      Logger.log(logFormat.join('\n'));
    }

    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 200,
          message: '请求成功',
          success: true,
        };
      }),
    );
  }
}
