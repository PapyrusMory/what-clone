import './App.css'
import { Chat, Sidebar } from './components'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

function App() {
  return (
    <div className='app'>
      <div className='app-body'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default App
