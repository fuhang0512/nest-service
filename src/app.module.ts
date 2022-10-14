/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-25 22:37:52
 * @LastEditTime: 2022-10-13 20:21:45
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { EmailModule } from './modules/email/email.module';
// import { StatusMonitorModule } from 'nest-status-monitor';
// import statusMonitorConfig from './config/statusMonitor.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.module';
import { MenuModule } from './modules/menu/menu.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from './config/env';
import { typeOrmConfig } from './common/database/typeorm.db';

@Module({
  imports: [
    // StatusMonitorModule.setUp(statusMonitorConfig),
    ScheduleModule.forRoot(), // 定时任务
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    RoleModule,
    EmailModule,
    UploadModule,
    MenuModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     // 监听所有的请求路由，并打印日志
//     consumer.apply(LoggerMiddleware).forRoutes('*');
//   }
// }
