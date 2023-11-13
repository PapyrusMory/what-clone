import { DonutLarge, Chat, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import SidebarChat from './SidebarChat'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <Avatar />
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
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  )
}

export default Sidebar
