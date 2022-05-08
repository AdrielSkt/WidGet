import { SubmitFeedbackService } from "./submit-feedback-service"

describe('submit feedback', ()=> {

  const createFeedbackSpy = jest.fn();
  const sendMailSpy = jest.fn();

  const submitFeedback = new SubmitFeedbackService(
//    { create: async () =>{}},
//    { sendMail:async () =>{}}
    { create: createFeedbackSpy},
    { sendMail:sendMailSpy}
  )

  test('enviar um feedback com sucesso',async ()=>{
      await expect(submitFeedback.execute({
        type: 'BUG',
        comment: 'Ta tudo bugado',
        screenshot: 'data:image/png;base64, iajdpoasdasd98as0d9asd80'
      })).resolves.not.toThrow();
      expect(createFeedbackSpy).toHaveBeenCalled();
      expect(sendMailSpy).toHaveBeenCalled();
  });

  test('não seja possivel enviar um feedback sem tipo',async ()=>{
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Ta tudo bugado',
      screenshot: 'data:image/png;base64, iajdpoasdasd98as0d9asd80'
    })).rejects.toThrow();
})

test('não seja possivel enviar um feedback sem comentario',async ()=>{
  await expect(submitFeedback.execute({
    type: 'BUG',
    comment: '',
    screenshot: 'data:image/png;base64, iajdpoasdasd98as0d9asd80'
  })).rejects.toThrow();
})

test('enão seja possivel enviar um feedback com formato invalido de screenshot',async ()=>{
  await expect(submitFeedback.execute({
    type: 'BUG',
    comment: 'Ta tudo bugado',
    screenshot: 'teste.png'
  })).rejects.toThrow();
})            
})