/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-26 20:41:31
 * @LastEditTime: 2022-10-11 18:15:23
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\user\entities\user.entity.ts
 */
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: '用户名称' })
  @Column({ length: 16, nullable: true, unique: true })
  username: string;

  @ApiProperty({ description: '用户昵称', required: false })
  @Column({ length: 120, nullable: true })
  nickname: string;

  @ApiProperty({ description: '用户密码' })
  @Exclude()
  @Column({ select: false, nullable: true })
  password: string;

  @ApiProperty({ description: '用户头像', required: false })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({ description: '用户邮箱', required: false })
  @Column({ nullable: true })
  email: string;

  @ApiProperty({ description: '微信openid', required: false })
  @Column({ nullable: true })
  openid: string;

  @ApiProperty({ description: '是否启用' })
  @Column({
    type: 'tinyint',
    default: 1,
    comment: '1: 启用, 0: 禁用',
  })
  enable: boolean;

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
  })
  createTime: Date;

  @Exclude()
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

  // @BeforeInsert()
  // async encryptPwd() {
  //   if (!this.password) return;
  //   this.password = bcrypt.hashSync(this.password, 10);
  // }
}
