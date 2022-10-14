/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-28 20:30:41
 * @LastEditTime: 2022-10-11 15:59:34
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\role\role.module.ts
 */
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
