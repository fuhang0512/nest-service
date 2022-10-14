/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-13 14:28:03
 * @LastEditTime: 2022-10-13 20:11:24
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\common\database\typeorm.db.ts
 */
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModule } from '@nestjs/typeorm';
import { DbLogger } from 'src/common/utils/log4js';

export const typeOrmConfig: TypeOrmModule = {
  type: 'mysql', // 数据库类型
  host: process.env['DB_HOST'], // host
  port: process.env['DB_PORT'], // 端口号
  username: process.env['DB_USERNAME'], // 账号
  password: process.env['DB_PASSWORD'], // 密码
  database: process.env['DB_DATABASE'], // 库名
  connectionLimit: process.env['DB_LIMIT'], // 连接限制
  // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
  timezone: '+08:00',
  logger: new DbLogger(), // 配置项添加自定义的log类
  synchronize: true, // 是否将实体类同步到数据库
  retryDelay: 500, // 重试连接数据库间隔
  retryAttempts: 10, // 重试连接数据库的次数
  autoLoadEntities: true, // 如果为true将自动加载实体，forFeature()方法注册的每个实体都将自动添加到配置对象的实体
};
