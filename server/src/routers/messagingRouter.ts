import express, { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { MessagingModel } from '../models/messagingModel'

export const messagingRouter = express.Router()

messagingRouter.post(
  '/new',
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      const newMessage = new MessagingModel(req.body)
      await newMessage.save()
      res.status(201).send(newMessage)
    } catch (error) {
      res.status(400).json(error)
    }
  })
)

messagingRouter.get(
  '/sync',
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      const messages = await MessagingModel.find()
      res.status(200).send(messages)
    } catch (error) {
      res.status(400).json(error)
    }
  })
)
