import { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'

const SidebarChat = () => {
  const [seed, setSeed] = useState<number>()
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])
  return (
    <div className='sidebarChat'>
      <Avatar
        src={`https://avatars.dicebear.com/api/human/
b${seed}.svg`}
      />
      <div className='sidebarChat-info'>
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  )
}

export default SidebarChat
