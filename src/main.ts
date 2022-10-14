/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-25 22:37:52
 * @LastEditTime: 2022-10-13 18:35:03
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
// import './config/env';
// import { RoleGuard } from './modules/role/role.guard';
// import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
// import { logger } from './common/middleware/logger.middleware';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 管道
  app.useGlobalPipes(new ValidationPipe());
  // 守卫
  // app.useGlobalGuards(new JwtAuthGuard());

  // 设置swagger文档相关配置
  const config = new DocumentBuilder()
    .setTitle('Naive Admin 后台管理系统接口文档')
    .setDescription('后台管理系统接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
