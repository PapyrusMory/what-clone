import { DonutLarge, Chat, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import SidebarChat from './SidebarChat'
import { Store } from '../../redux/Store'
import { useContext } from 'react'

const Sidebar = ({ messages }: any) => {
  const { state } = useContext(Store)
  const { userInfo } = state
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <Avatar src={userInfo?.photoURL} />
        <div className='sidebar-headerRight'>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='sidebar-search'>
        <div className='sidebar-searchContainer'>
          <SearchOutlined />
          <input placeholder='Recherche ou Nouveau Chat' type='text' />
        </div>
      </div>
      <div className='sidebar-chats'>
        <SidebarChat messages={messages} />
      </div>
    </div>
  )
}

export default Sidebar
