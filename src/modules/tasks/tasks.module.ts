/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-11 21:48:59
 * @LastEditTime: 2022-10-11 21:49:30
 * @LastEditors:
 * @FilePath: \nest-admin\src\modules\tasks\tasks.module.ts
 */
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService],
})
export class TasksModule {}
