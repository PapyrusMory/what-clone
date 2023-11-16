import './App.css'
import { Chat, Login, Sidebar } from './components'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { config } from './firebase'
import { Store } from './redux/Store'
initializeApp(config.firebaseConfig)
import apiClient from './apiClient'
import Pusher from 'pusher-js'
import { MessageType } from './types/messageType'

function App() {
  const { state } = useContext(Store)
  const { userInfo } = state
  const [messages, setMessages] = useState<MessageType[]>([])

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_KEY!, {
      cluster: import.meta.env.VITE_CLUSTER!,
    })
    const channel = pusher.subscribe('messages')
    channel.bind('inserted', (data: MessageType) => {
      setMessages([...messages, data])
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])

  useEffect(() => {
    apiClient.get('/api/messages/sync').then((res) => {
      setMessages(res.data)
    })
  }, [])
  return (
    <div className='app'>
      {!userInfo ? (
        <Login />
      ) : (
        <div className='app-body'>
          <Sidebar messages={messages} />
          <Chat messages={messages} />
        </div>
      )}
    </div>
  )
}

export default App
