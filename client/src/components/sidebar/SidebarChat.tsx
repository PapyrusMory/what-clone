import { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'

const SidebarChat = ({ messages }: any) => {
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
        <h2>Papyrus</h2>
        <p>{messages[messages.length - 1]?.message}</p>
      </div>
    </div>
  )
}

export default SidebarChat
