import { useState, useEffect, useMemo } from 'react'
import { io } from 'socket.io-client'
import { useToast } from '@chakra-ui/react'
import JoinRoomForm from './JoinRoomForm'
import MessageArea from './MessageArea'
import Sidebar from './Sidebar'

function Try() {
  const socket = useMemo(() => io('http://localhost:3000'), [])
  const [messages, setMessages] = useState([])
  const toast = useToast()

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected with the id ${socket.id}`)
    })

    socket.on('welcome', (data) => {
      console.log(data)
    })

    socket.on('room-message', (data) => {
      console.log(data.message)
      setMessages((messages) => [...messages, data])
    })

    // Toast notification when a user joins a room
    socket.on('room-joined', ({ userId, roomId }) => {
      toast({
        title: `User with id: ${userId} joined the Room`,
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        variant: 'subtle',
      })
    })

    return () => {
      socket.disconnect()
      console.log('user disconnected')
    }
  }, [socket, toast])

  const handleRoomJoin = (roomname) => {
    socket.emit('join-room', roomname)
  }

  const handleSendMessage = (message, room) => {
    socket.emit('message', { message, room, senderId: socket.id })
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 p-6">
        {/* Room joining form */}
        <JoinRoomForm onJoinRoom={handleRoomJoin} />

        {/* Message area */}
        <MessageArea
          messages={messages}
          socket={socket}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  )
}

export default Try
