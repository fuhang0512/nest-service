/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-28 23:07:29
 * @LastEditTime: 2022-10-12 22:46:07
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\email\email.module.ts
 */
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
// 邮件
import { MailerModule } from '@nestjs-modules/mailer';
// import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as path from 'path';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.111.com',
        port: 25,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: 'fuhang@111.com',
          pass: 'zdDPTshZMxJWgr7X',
        },
      },
      defaults: {
        from: 'fuhang <fuhang@111.com>',
      },
      preview: false,
      template: {
        dir: path.join(process.cwd(), './src/modules/email/template'),
        adapter: new EjsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService, JwtService],
  exports: [EmailService],
})
export class EmailModule {}
