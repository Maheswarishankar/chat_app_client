import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../config/ChatLogic";
import ListGroup from "react-bootstrap/ListGroup";
import { Avatar } from "@mui/material";
import { URL } from "../../App";

function MyChats() {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, fetchAgain, setSelectedChat, user, chats, setChats } =
    ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${URL}/api/chat`,
        config
      );
      setChats(data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const randomColors = [
    "#F44336",
    "#9C27B0",
    "#2196F3",
    "#4CAF50",
    "#FFC107",
    "#795548",
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * randomColors.length);
    return randomColors[randomIndex];
  };

  return (
    <>
      <div
        style={{
          display: selectedChat ? "none" : "flex",
          overflowY: "auto",
          maxHeight: "100vh",
        }}
        className="d-md-flex flex-column align-items-center h-100 p-1  rounded border-1px"
      >
        <div className="ps-3 mt-2 d-flex w-100 justify-content-between align-items-center">
          <p className="p-0 m-0 fw-bolder fs-3">Chats</p>
        </div>
        <div
          className="flex-column pb-5 mb-5  w-100"
          style={{ overflow: "scroll" }}
        >
          {Array.isArray(chats) ? (
            <ListGroup variant="flush">
              {chats.map((chat) => (
                <ListGroup.Item
                  onClick={() => setSelectedChat(chat)}
                  className="p-3 m-1 d-flex align-items-center rounded"
                  style={{
                    backgroundColor:
                      selectedChat === chat ? "#d5c1ff" : "#ffffff",
                    color: "black",
                  }}
                  key={chat._id}
                >
                  <Avatar
                    sx={{ width: 53, height: 53, bgcolor: getRandomColor() }}
                    src={user.pic ? user.pic : null}
                  >
                    {getSender(loggedUser, chat.users).charAt(0).toUpperCase()}
                  </Avatar>
                  <div className="ms-2">
                    <p
                      className="m-0 p-0"
                      style={{ fontSize: "18px", fontWeight: "bolder" }}
                    >
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </p>
                    {chat.latestMessage && (
                      <p
                        className="p-0 m-0 fw-bolder"
                        style={{ fontSize: "12px" }}
                      >
                        <span className="me-1" style={{ fontSize: "10px" }}>
                          {chat.latestMessage.sender.username}:
                        </span>
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 20) + "..."
                          : chat.latestMessage.content}
                      </p>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MyChats;
