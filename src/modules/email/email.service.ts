/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-28 23:07:29
 * @LastEditTime: 2022-09-29 01:35:47
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\modules\email\email.service.ts
 */
import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailCode(data) {
    try {
      const code = Math.random().toString().slice(-6);
      const date = '2022年09月29日 01:35:49';
      const sendMailOptions: ISendMailOptions = {
        to: data.email,
        subject: data.subject || '用户邮箱验证',
        template: './validate.code.ejs', //这里写你的模板名称，如果你的模板名称的单名如 validate.ejs ,直接写validate即可 系统会自动追加模板的后缀名,如果是多个，那就最好写全。
        //内容部分都是自定义的
        context: {
          code, //验证码
          date, //日期
          sign: data.sign || '系统邮件,回复无效。', //发送的签名,当然也可以不要
        },
        // attachments: [
        //     {
        //         filename: 'validate.code.ejs', //文件名
        //         path: path.join(process.cwd(), './src/email/template/validate.code.ejs') //服务端的文件地址
        //     }
        // ]
      };
      await this.mailerService.sendMail(sendMailOptions);
      console.log(
        `发送邮件给:${data.email},成功!主题:${data.subject || '默认'}`,
      );
      return { code: 200, message: '发送成功' };
    } catch (error) {
      console.error('发送邮件出错:', error);
      return { error };
    }
  }
  // create(createEmailDto: CreateEmailDto) {
  //   return 'This action adds a new email';
  // }
  // findAll() {
  //   return `This action returns all email`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} email`;
  // }
  // update(id: number, updateEmailDto: UpdateEmailDto) {
  //   return `This action updates a #${id} email`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} email`;
  // }
}
