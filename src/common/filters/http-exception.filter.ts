/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-26 23:04:51
 * @LastEditTime: 2022-10-11 02:34:44
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\common\filters\http-exception.filter.ts
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionRes: any = exception.getResponse();
    const { error, message } = exceptionRes;

    // 组装日志信息
    const logFormat = [];
    logFormat.push(`Method: ${request.method}`);
    logFormat.push(` Status code: ${status}`);
    logFormat.push(` Request original url: ${request.originalUrl}`);
    logFormat.push(
      ` IP: ${
        request.headers?.remoteip
          ? String(request.headers.remoteip)
          : request.ip?.split(':').pop()
      }`,
    );
    logFormat.push(` message: ${message || exception.getResponse()}`);
    logFormat.push(` Params: ${JSON.stringify(request.params)}`);
    logFormat.push(` Query: ${JSON.stringify(request.query)}`);
    logFormat.push(` Body: ${JSON.stringify(request.body)}`);

    if (status >= 500) {
      Logger.error(logFormat.join('\n'));
    } else if (status >= 400 && status < 500) {
      Logger.warn(logFormat.join('\n'));
    } else {
      Logger.access(logFormat.join('\n'));
      Logger.log(logFormat.join('\n'));
    }

    response.status(status).json({
      status,
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message: message || exception.getResponse(),
    });
  }
}
