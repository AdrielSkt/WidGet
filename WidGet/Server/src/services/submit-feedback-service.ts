import { MailAdapter } from "../adapters/mail-adaper";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest{
  type: string;
  comment: string;
  screenshot?: string;
}


export class SubmitFeedbackService{


  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter){}

  async execute(request: SubmitFeedbackServiceRequest){
    const{type, comment, screenshot} = request;

    if(!type){
      throw new Error('type is required"');
    }

    if(!comment){
      throw new Error("comment is required!")
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('invalid screeshot format!');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })
    await this.mailAdapter.sendMail({
      subject:'Novo FeedBack',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #222;" >`,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<p></p>`,
        `</div>`
      ].join('\n')
    })
  }

}