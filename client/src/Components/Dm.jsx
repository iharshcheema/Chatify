import { useState, useEffect, useMemo } from 'react'
import { io } from 'socket.io-client'
import Sidebar from './Sidebar'
import { Button } from '@chakra-ui/react'
// import SideBar from './Components/Sidebar'

function Dm() {
  const socket = useMemo(() => io('http://localhost:3000'), [])

  const submitHandler = (e) => {
    e.preventDefault()
    socket.emit('message', { message, senderId: socket.id })
    setMessage('')
  }

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected with the id ${socket.id}`)
    })

    socket.on('welcome', (data) => {
      console.log(data)
    })

    socket.on('received-message', (data) => {
      console.log(data.message)
      setMessages((messages) => [...messages, data])
    })

    return () => {
      socket.disconnect()
      console.log('user disconnected')
    }
  }, [])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Messages display */}
        <div className="flex flex-col space-y-4 overflow-auto p-6 mb-20">
          {messages.map((msg, index) => (
            <p
              key={index}
              className={`max-w-xs p-4 rounded ${
                msg.senderId === socket.id
                  ? 'self-end bg-green-100'
                  : 'self-start bg-blue-100'
              }`}
            >
              {msg.message}
            </p>
          ))}
        </div>

        {/* Message input form fixed at the bottom */}
        <form
          onSubmit={submitHandler}
          className="flex space-x-2 p-4 bg-gray-100 fixed bottom-0 left-0 right-0 md:left-[250px]"
        >
          <input
            type="text"
            className="border-2 p-2 flex-1"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" colorScheme="teal" size="md">
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Dm
