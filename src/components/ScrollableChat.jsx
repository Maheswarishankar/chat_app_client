import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import {isSameSenderMargin,isSameUser } from '../config/ChatLogic';
import { ChatState } from '../context/ChatProvider';

const ScrollableChat = ({messages}) => {

    const { user } = ChatState();
    console.log(messages);
    console.log("user:"+user);
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoString);
    
    console.log('userinfo',userInfo.username);
  return (
    <ScrollableFeed>
    {messages.map((m, i) => (
      <div className='flex-column' style={{backgroundColor:'white'}} key={m._id}>
        <div
          className='align-items-center pe-5 ps-3 py-2'
          style={{
            width: 'fit-content',
            maxWidth:'300px',
            borderRadius: m.sender._id === user._id ? '20px 20px 0 20px' : '20px 20px 20px 0px',
            backgroundColor: m.sender._id === user._id ? '#4942E4' : '#e9eff5',
            marginLeft: isSameSenderMargin(messages, m, i, user._id),
            marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
            color: 'white'
          }}
        >
          <p className='m-0 p-0 fw-bolder' style={{ fontSize: '14px', display: m.sender._id === userInfo._id ? 'none' : 'flex', color: '#9C27B0'}}>{m.sender.name}</p>
          <span className='' style={{overflowWrap: 'break-word', color:m.sender._id === user._id ? 'white' : 'black' }}>{m.content}</span>
        </div>
      </div>
    ))}
  </ScrollableFeed>
  )
}

export default ScrollableChat