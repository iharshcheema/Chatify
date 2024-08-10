import { Button, ButtonGroup } from '@chakra-ui/react'
import React, { useState } from 'react'

const MessageArea = ({ messages, socket, onSendMessage }) => {
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    onSendMessage(message, room)
    setMessage('')
  }

  return (
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
        className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 p-4 bg-gray-100 fixed bottom-0 left-0 right-0 md:left-[250px]"
      >
        <input
          type="text"
          className="border-2 p-2 flex-1"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="text"
          className="border-2 p-2 flex-1"
          placeholder="Enter group chat id"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <Button type="submit" colorScheme={'teal'} size={'md'}>
          Send
        </Button>
      </form>
    </div>
  )
}

export default MessageArea
