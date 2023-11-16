import { FormEvent, useContext, useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
  Mic,
} from '@mui/icons-material'
import { MessageType } from '../../types/messageType'
import moment from 'moment'
import axios from '../../apiClient'
import { Store } from '../../redux/Store'

const Chat = (props: any) => {
  const { messages } = props
  const [seed, setSeed] = useState<number>()
  const [input, setInput] = useState<string>('')
  const { state } = useContext(Store)
  const { userInfo } = state
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.post('/api/messages/new', {
      message: input,
      name: userInfo?.displayName,
      timestamp: new Date().toUTCString(),
      received: true,
    })
    setInput('')
  }

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])
  return (
    <div className='chat'>
      <div className='chat-header'>
        <Avatar
          src={`https://avatars.dicebear.com/api/human/
b${seed}.svg`}
        />
        <div className='chat-headerInfo'>
          <h3>Papyrus</h3>
          <p>
            Last seen at{' '}
            {moment(messages[messages.length - 1]?.createdAt).format('llll')}
          </p>
        </div>
        <div className='chat-headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='chat-body'>
        {messages?.map((message: MessageType) => (
          <p
            key={message._id}
            className={`chat-message ${
              message.name === userInfo?.displayName ? 'chat-receiver' : ''
            }`}
          >
            <span className='chat-name'>{message.name}</span>
            {message.message}
            <span className='chat-timestamp'>
              {moment(message.createdAt).format('llll')}
            </span>
          </p>
        ))}
      </div>
      <div className='chat-footer'>
        <InsertEmoticon className='icon' />
        <form onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Message'
            type='text'
          />
          <button type='submit'>Envoyer</button>
        </form>
        <Mic className='icon' />
      </div>
    </div>
  )
}

export default Chat
