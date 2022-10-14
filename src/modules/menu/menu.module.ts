/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-11 17:53:29
 * @LastEditTime: 2022-10-11 20:32:38
 * @LastEditors:
 * @FilePath: \nest-admin\src\modules\menu\menu.module.ts
 */
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu } from './entities/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
