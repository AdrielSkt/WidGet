import express from 'express'
import { SubmitFeedbackService } from './services/submit-feedback-service';
import { PrismaFeedbacksRepository } from './prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';




export const routes  = express.Router()

routes.post('/feedbacks',async (req, res)=> {
  const{type, comment, screenshot} = req.body




    const prismaFeedbacksRepository = new PrismaFeedbacksRepository;
    const nodemailer = new NodemailerMailAdapter;
    const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailer)
    await submitFeedbackService.execute({
      type,
      comment,
      screenshot
    })
    return res.status(201).send();


});