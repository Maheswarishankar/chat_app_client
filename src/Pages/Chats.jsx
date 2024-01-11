import React from "react";
import ChatBox from "../components/chatarea/ChatBox";
import MyChat from "../components/chatarea/MyChat";
import SearchBox from "../components/chatarea/SearchBox";
import { ChatState } from "../context/ChatProvider";
import "./Chats.css";

const Chats = () => {
  const { user, selectedChat } = ChatState();

  return (
    <div className="vh-100 container-fluid chat-bg">
      <div className="row h-100" style={{ overflowY: "hidden" }}>
        <div
          className="col-lg-4 col-sm-12 col-md-9 flex-column m-0 ps-1 int1 "
          style={{ overflowY: "hidden" }}
        >
          <div
            className="search-box w-100"
            style={{
              display: selectedChat
                ? window.innerWidth <= 576
                  ? "none"
                  : "flex"
                : "flex",
            }}
          >
            {user && <SearchBox />}
          </div>{" "}
          <div className="h-100">{user && <MyChat />}</div>
        </div>
        <div className="col-lg-8 col-sm-12 col-md-9 m-0 ps-0 pe-1">
          <div className="h-100">{user && <ChatBox />}</div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
