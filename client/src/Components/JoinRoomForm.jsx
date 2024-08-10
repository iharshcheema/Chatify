import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'

const JoinRoomForm = ({ onJoinRoom }) => {
  const [roomname, setRoomname] = useState('')

  const handleRoomJoin = (e) => {
    e.preventDefault()
    onJoinRoom(roomname)
    setRoomname('')
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl mb-2">Join a room</h2>
      <form onSubmit={handleRoomJoin} className="flex space-x-2">
        <input
          type="text"
          className="border-2 p-2 flex-1"
          placeholder="Enter group chat id"
          value={roomname}
          onChange={(e) => setRoomname(e.target.value)}
        />
        <Button type="submit" colorScheme={'teal'}>
          Join
        </Button>
      </form>
    </div>
  )
}

export default JoinRoomForm
