import React from 'react'
import SingleChat from '../SingleChat'
import { ChatState } from '../../context/ChatProvider'

const ChatBox = () => {

  const { selectedChat} = ChatState()
  return (
    <div className='vh-100 md-flex flex-column align-items-center' style={{display:selectedChat?'flex':'none',backgroundColor:'#f8fafc'}}>
    <SingleChat/>
  </div>
  )
}

export default ChatBox