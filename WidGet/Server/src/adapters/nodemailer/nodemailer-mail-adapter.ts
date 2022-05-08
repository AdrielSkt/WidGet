import { MailAdapter, SendMailData } from "../mail-adaper";
import nodemailer from 'nodemailer'

interface NodemailerData{
  subject: string;
  body: string;
}

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fc37d523f12697",
    pass: "54c1e6658f91a6"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject, body}: SendMailData){

   await transport.sendMail({
      from: 'equipe FeedGet <oi@feedget.com',
      to: 'Adriel Gomes <adriel77adr10@gmail.com>',
      subject,
      html:body,
    });
    
  }






}