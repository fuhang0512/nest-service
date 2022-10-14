/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-11 22:14:16
 * @LastEditTime: 2022-10-13 20:19:52
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\common\database\redis.db.ts
 */
import { Logger } from '@nestjs/common';
import Redis from 'ioredis';
// import config from '../../config/configuration.config';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();

const logger = new Logger('auth.service');
const redisIndex = []; // 用于记录 redis 实例索引
const redisList = []; // 用于存储 redis 实例

export class RedisInstance {
  static async initRedis(method: string, db = 0) {
    const redisOption = {
      host: process.env['REDIS_HOST'],
      port: Number(process.env['REDIS_PORT']),
      password: process.env['REDIS_PASSWORD'],
    };

    const isExist = redisIndex.some((x) => x === db);
    if (!isExist) {
      Logger.debug(`[Redis ${db}]来自 ${method} 方法调用 `);
      redisList[db] = new Redis(Object.assign(redisOption, { db }));
      // redisList[db] = new Redis({ ...redisOption, db });
      redisIndex.push(db);
    } else {
      Logger.debug(`[Redis ${db}]来自 ${method} 方法调用`);
    }
    return redisList[db];
  }

  static async setRedis(
    method: string,
    db = 0,
    key: string,
    val: string,
    timeout = 60 * 60,
  ) {
    if (typeof val == 'object') {
      val = JSON.stringify(val);
    }
    const redis = await RedisInstance.initRedis(method, db);
    redis.set(`${key}`, val);
    redis.expire(`${key}`, timeout);
  }

  static async getRedis(method: string, db = 0, key: string) {
    return new Promise(async (resolve, reject) => {
      const redis = await RedisInstance.initRedis(method, db);
      redis.del('007202a281c5930ccb903bb0ae319107ff48');
      redis.get(`${key}`, (err, val) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(val);
      });
    });
  }
}
