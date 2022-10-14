/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-11 17:53:29
 * @LastEditTime: 2022-10-11 20:34:23
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\menu\entities\menu.entity.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: '菜单名称' })
  @Column({ length: 100, nullable: true })
  title: string;

  @ApiProperty({ description: '菜单类型' })
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,
    comment: '0: 菜单, 1: 按钮',
    nullable: true,
  })
  type: number;

  @ApiProperty({ description: '父级菜单' })
  @Column({ type: 'uuid', length: 100, nullable: true })
  parentId: string;

  @ApiProperty({ description: 'url' })
  @Column({ length: 100, nullable: true })
  path: string;

  @ApiProperty({ description: '文件路径' })
  @Column({ length: 100, nullable: true })
  component: string;

  @ApiProperty({ description: '重定向地址' })
  @Column({ length: 100, nullable: true })
  redirect: string;

  @ApiProperty({ description: 'name' })
  @Column({ length: 100, nullable: true })
  name: string;

  @ApiProperty({ description: '图标icon' })
  @Column({ length: 100, nullable: true })
  icon: string;

  @ApiProperty({ description: '是否隐藏菜单' })
  @Column({
    type: 'tinyint',
    default: 0,
    comment: '1: 是, 0: 否',
    nullable: true,
  })
  hidden: boolean;

  @ApiProperty({ description: '是否缓存' })
  @Column({
    type: 'tinyint',
    default: 0,
    comment: '1: 缓存, 0: 不缓存',
    nullable: true,
  })
  keepAlive: boolean;

  @ApiProperty({ description: '标签固钉' })
  @Column({
    type: 'tinyint',
    default: 0,
    comment: '1: 固定标签, 0: 不固定标签',
    nullable: true,
  })
  affix: boolean;

  @ApiProperty({ description: '排序值' })
  @Column({ type: 'int', nullable: true })
  sort: number;

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
  })
  updateTime: Date;

  @DeleteDateColumn({
    name: 'delete_time',
    type: 'timestamp',
  })
  deleteTime: Date;
}
