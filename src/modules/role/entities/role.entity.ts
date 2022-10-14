/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-28 20:30:41
 * @LastEditTime: 2022-10-11 16:30:09
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\role\entities\role.entity.ts
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

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: '角色名称' })
  @Column({ length: 100, nullable: true })
  name: string;

  @ApiProperty({ description: '角色代码' })
  @Column({ name: 'character_code', length: 100, nullable: true })
  characterCode: string;

  @ApiProperty({ description: '角色描述' })
  @Column({ nullable: true })
  describe: string;

  @ApiProperty({ description: '是否启用' })
  @Column({ nullable: true, type: 'tinyint', default: 1 })
  enable: boolean;

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
