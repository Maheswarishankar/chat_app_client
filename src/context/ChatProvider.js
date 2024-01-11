import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {


    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [chats, setChats] = useState([]);
    const [fetchAgain, setFetchAgain] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log("User Info:", userInfo);
        setUser(userInfo);
        // if (!userInfo) {
        //   console.log("Navigate to '/'");
        //   navigate('/');
        // }
    }, [navigate])

    return <ChatContext.Provider value={{
        user, setUser,
        selectedChat, setSelectedChat,
        chats, setChats,
        fetchAgain, setFetchAgain
    }}>{children}</ChatContext.Provider>;
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider