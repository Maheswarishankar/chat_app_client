import React from "react";
import { useState } from "react";
import UserList from "../avatar/UserList";
import {Badge} from "react-bootstrap";
import {Stack} from "react-bootstrap";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-bootstrap";
import { URL } from "../../App";

const ModalGroup = ({ children }) => {
  const [modalShow, setModalShow] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => {
    setSearchResult([]);
    setModalShow(false);
  };

  const { user, chats, setChats } = ChatState();

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
       console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.warning("Fill all fields");
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          `${URL}/api/chat/group`,
          {
            username: groupChatName,
            users: JSON.stringify(selectedUsers.map((u) => u._id)),
          },
          config
        );
        setChats([data, ...chats]);
        handleModalClose();
      } catch (error) {
        toast.error("error occured");
      }
    }
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.warning("user already selected");
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <>
      <span
        className="d-flex align-items-center pb-2"
        onClick={handleModalShow}
      >
        {children}
      </span>
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        animation={false}
        centered
        className="custom-modal"
      >
        <p className="text-center p-2 fw-bolder m-0"> Create Group</p>
        <Modal.Body className="flex-column align-items-center">
          <input
            style={{
              boxShadow: "none",
            }}
            onChange={(e) => setGroupChatName(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="group chat name"
          />
          <div className="d-flex">
            <input
              style={{
                boxShadow: "none",
              }}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              className="form-control mb-2"
              placeholder="Search Users"
            />
            <button
              className="btn"
              style={{ border: "none" }}
              onClick={handleSearch}
            >
              <i className="fa-solid fs-4 fa-magnifying-glass"></i>
            </button>
          </div>
          <Stack direction="horizontal" gap={2}>
            {selectedUsers.map((u) => (
              <Badge
                className="d-flex align-items-center m-1 p-2"
                key={u._id}
                user={u}
                bg="primary"
              >
                {u.username}{" "}
                <span className="fw-bolder ms-2">
                  <i
                    onClick={() => handleDelete(u)}
                    className="fa-solid fa-x"
                    style={{ color: "#ffffff" }}
                  ></i>
                </span>
              </Badge>
            ))}
          </Stack>
          {loading ? (
            <p>loading..</p>
          ) : (
            searchResult
              ?.slice(0, 4)
              .map((user) => (
                <UserList
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn"
            style={{ backgroundColor: "#7341e9", color: "white" }}
            onClick={handleSubmit}
          >
            Create
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

export default ModalGroup;
