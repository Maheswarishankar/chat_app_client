import React from "react";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Modal, Offcanvas } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { Placeholder } from "react-bootstrap";
import UserList from "../avatar/UserList";
import ModalGroup from "./ModalGroup";
import { URL } from "../../App";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [offcanvasShow, setOffcanvasShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [chats, setChats] = useState([]);

  const { user, setSelectedChat, selectedChat } = ChatState();
  const navigate = useNavigate();

  // const firstNameLetter = user.username.charAt(0);
  const firstNameLetter = user.username ? user.username.charAt(0) : "";

  let storedColor = sessionStorage.getItem("randomColor");
  if (!storedColor) {
    const colors = ["red", "blue", "green", "yellow", "purple"];
    storedColor = colors[Math.floor(Math.random() * colors.length)];
    sessionStorage.setItem("randomColor", storedColor);
  }

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleOffcanvasShow = () => setOffcanvasShow(true);
  const handleOffcanvasClose = () => {
    setSearchResult([]);
    setOffcanvasShow(false);
  };
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const handleSearch = async () => {
    setSearch(searchInput);
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${URL}/api/user?search=${search}`,
        config
      );
      setLoading(false);
      console.log(search);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      toast.error("Error Occured");
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      // Check if the selected user is already in the existing chats
      const existingChat = chats.find((chat) => chat.users.includes(userId));

      if (existingChat) {
        // Open the existing chat
        setSelectedChat(existingChat);
        console.log(existingChat);
      } else {
        // Create a new chat
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          `${URL}/api/chat`,
          { userId },
          config
        );

        // Check if the chat already exists in the state
        if (!chats.find((chat) => chat._id === data._id)) {
          setChats([data, ...chats]);
        }

        // Set the selected chat to the newly created chat
        setSelectedChat(data);
        console.log(selectedChat);
        setLoadingChat(true);
      }

      setLoadingChat(false);
      
      setOffcanvasShow(false);
    } catch (error) {
      toast.error("Error while fetching chats. Check the log.");
      console.error(error);
    }
  };

  return (
    <>
      <div
        fixed="top"
        className="mt-lg-3  shadow w-100 rounded d-flex justify-content-between search-box"
      >
        <div className="ms-2 p-3 d-flex align-items-center">
          <Avatar
            onClick={handleModalShow}
            sx={{ bgcolor: storedColor, width: 50, height: 50 }}
            src={user.pic ? user.pic : null}
          >
            {firstNameLetter}
          </Avatar>
        </div>
        <div className="d-flex align-items-center">
          <ModalGroup>
            <button
              style={{ border: "none" }}
              className="btn  m-0 d-flex align-items-center"
            >
              <i
                className="fs-4 py-1 fa-solid fa-user-group"
                style={{ color: "#FF9800" }}
              ></i>
            </button>
          </ModalGroup>
          <div className="p-1">
            <button
              onClick={handleOffcanvasShow}
              className="btn"
              style={{ border: "none" }}
            >
              <i
                className="fi fs-4 fi-br-search"
                style={{ color: "#FF9800" }}
              ></i>
            </button>
          </div>
        </div>
      </div>
      <Offcanvas
        className="search-user-bg"
        show={offcanvasShow}
        onHide={handleOffcanvasClose}
      >
        <Offcanvas.Header>
          <div className="d-flex w-100  align-items-center justify-content-center m-0 p-0">
            <input
              style={{ boxShadow: "none", border: "none" }}
              onChange={(e) => setSearchInput(e.target.value)}
              className="form-control mt-2 search-input"
              placeholder="Search for a user"
            />
            <button
              className="btn"
              style={{ border: "none" }}
              onClick={handleSearch}
            >
              <i className="fa-solid fs-4 fa-magnifying-glass"></i>
            </button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="p-0 ms-3 my-0 text-dark">Search results</p>
          {loading ? (
            <div style={{ opacity: "0.2" }}>
              <Placeholder xs={12} lg={12} md={12} />
              <Placeholder xs={12} lg={12} md={12} />
              <Placeholder xs={12} lg={12} md={12} />
              <Placeholder xs={12} lg={12} md={12} />
              <Placeholder xs={12} lg={12} md={12} />
              <Placeholder xs={12} lg={12} md={12} />
              <Placeholder xs={12} lg={12} md={12} />
              <Placeholder xs={12} lg={12} md={12} />
            </div>
          ) : (
            searchResult?.map((user) => (
              <UserList
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        animation={false}
        centered
        className="profile-modal" // Add the custom class to the Modal
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-center">
            <Avatar
              sx={{ bgcolor: storedColor, width: 100, height: 100 }}
              src={user.pic ? user.pic : null}
            >
              {firstNameLetter}
            </Avatar>
          </div>
          <h4 className="text-center m-0 pt-3">{user.username}</h4>
          <p style={{ opacity: "0.6" }} className="text-center p-0 m-0">
            {user.email}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
          <button className="btn btn-primary" onClick={handleModalClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
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
  );
};

export default SearchBox;
