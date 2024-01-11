import React from 'react'
import { useEffect,useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { getSender,getSenderFull } from '../config/ChatLogic'
import Modalprofile from './chatarea/Modalprofile';
import EditGroupModal from './chatarea/EditGroupModal';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ScrollableChat from '../components/ScrollableChat'
import io from 'socket.io-client'
import { URL } from '../App';



var socket, selectedChatCompare;

const SingleChat = () => {

  const {user,selectedChat,setSelectedChat } = ChatState();
  // console.log(selectedChat);
  const [messages, setMessages] = useState([]);
  const [loading ,setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false)

  const sendMessage = async (source) => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage('');
        const { data } = await axios.post(`${URL}/api/message`, {
          content: newMessage,
          chatId: selectedChat._id,
        }, config);
        socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error('Failed to send');
      }
    }
  };

  const sendMessageEnter = (event) => {
    if (event.key === 'Enter') {
      sendMessage('enter');
    }
  };
  
  // Call sendMessage with button click
  const sendMessageBtn = () => {
    sendMessage('button');
  };
  const fetchMessages= async()=>{
    if(!selectedChat){
      return
    }
    try {
      const config ={
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      }
      const {data} = await axios.get(`${URL}/api/message/${selectedChat._id}`
      ,config
      )
      setMessages(data)
      setLoading(false)
      socket.emit('join chat', selectedChat._id)
      // console.log(data);
    } catch (error) {
      toast.error('')
    }
  }

  useEffect(()=>{
    socket = io(`${URL}`);
    socket.emit('setup',user);
    socket.on('connection',()=>{ setSocketConnected(true)})
  },[])

  useEffect(()=>{
    fetchMessages()
    selectedChatCompare = selectedChat;
    // console.log('selectec chat: ',selectedChat)
  },[selectedChat])

  useEffect(()=>{
    socket.on("message recieved",(newMessageRecieved)=>{
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
          // notification
      }else{
        setMessages([...messages, newMessageRecieved]);
      }
    })
  })

  const typingHandler=(e)=>{
    setNewMessage(e.target.value);
    // typing indicator
  }
  return (
    
   <>
     {selectedChat ? (
        <>
          <div
            style={{ overflow: "hidden",backgroundColor:'white',color:'black' }}
            className="d-flex p-4 m-1  align-items-center w-100"
          >
            <i
              className="fa-solid fs-5 fa-arrow-left-long mx-2"
              onClick={() => setSelectedChat("")}
            ></i>
            {!selectedChat.isGroupChat ? (
              <>
                <Modalprofile selectedChat={selectedChat} user={getSenderFull(user, selectedChat.users)} />
                {getSender(user, selectedChat.users)}
              </>
            ) : (
              <>
                <EditGroupModal fetchMessages={fetchMessages}></EditGroupModal>
                <p className="p-0 m-0 fw-bolder " style={{ fontSize: "20px" }}>
                  {selectedChat.chatName}
                </p>{" "}
              </>
            )}
          </div>
          <div
            className="flex-column justify-content-end w-100 h-100 p-3"
            style={{ backgroundColor: "white" }}
          >
            {loading ? (
              <div className="h-100 d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                <div
                  style={{ overflowY: "scroll" }}
                  className="flex-column h-100"
                >
                  <ScrollableChat messages={messages} />
                </div>
              </>
            )}
          </div>
          <div className='w-100 mb-3 d-flex ' sticky="bottom" style={{overflow:'hidden'}}>
            <input
              onChange={typingHandler}
              placeholder="Type a message"
              type="text"
              value={newMessage}
              required
              style={{ boxShadow: "none",backgroundColor:'',color:'black' }}
              onKeyDown={sendMessageEnter}
              className="form-control w-100 me-2  mb-1 mt-2 p-4 rounded chat-input"
            />
            <button onClick={sendMessageBtn} className='btn mb-1 mt-2 d-flex align-items-center justify-content-center' style={{backgroundColor:"#FF9800"}}><i class="fa-solid fs-4 fa-paper-plane" style={{color:'white'}}></i></button>
       </div>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <h3 className='text-center'>Chatify</h3>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
   
    </>
   
   
  
  )
}

export default SingleChat