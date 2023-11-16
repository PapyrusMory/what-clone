import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { messagingRouter } from './routers/messagingRouter'
import Pusher from 'pusher'

dotenv.config()

mongoose.set('strictQuery', true)

const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch(() => {
    console.log('Error MongoDB')
  })

const pusher = new Pusher({
  appId: process.env.APPID!,
  key: process.env.KEY!,
  secret: process.env.SECRET!,
  cluster: process.env.CLUSTER!,
  useTLS: true,
})

//API Endpoints
const db = mongoose.connection
db.once('open', () => {
  console.log('DB Connected')
  const msgCollection = db.collection('messagings')
  const changeStream = msgCollection.watch()
  changeStream.on('change', (change) => {
    console.log(change)
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      })
    } else {
      console.log('Error trigerring Pusher')
    }
  })
})

const app = express()

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/messages', messagingRouter)

const PORT: number = parseInt(process.env.PORT! as string, 10)

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
