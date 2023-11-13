import { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
  Mic,
} from '@mui/icons-material'

const Chat = () => {
  const [seed, setSeed] = useState<number>()
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
          <h3>Room Name</h3>
          <p>Last seen at...</p>
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
        <p className='chat-message'>
          <span className='chat-name'>Papyrus</span>
          Salut Mory, j'espère que tu vas bien
          <span className='chat-timestamp'>{new Date().toUTCString()}</span>
        </p>
        <p className='chat-message chat-receiver'>
          <span className='chat-name'>Mory</span>
          Salut Papyrus. Oui je vais bien j'espère que toi aussi
          <span className='chat-timestamp'>{new Date().toUTCString()}</span>
        </p>
        <p className='chat-message'>
          <span className='chat-name'>Papyrus</span>
          Oui, je vais bien. Merci
          <span className='chat-timestamp'>{new Date().toUTCString()}</span>
        </p>
      </div>
      <div className='chat-footer'>
        <InsertEmoticon className='icon' />
        <form>
          <input placeholder='Message' type='text' />
          <button type='submit'>Envoyer</button>
        </form>
        <Mic className='icon' />
      </div>
    </div>
  )
}

export default Chat
