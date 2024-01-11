import React from "react";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { Modal } from "react-bootstrap";

const Modalprofile = ({ user, selectedChat }) => {
  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);
  let storedColor = sessionStorage.getItem("randomColor");
  if (!storedColor) {
    const colors = ["red", "blue", "green", "yellow", "purple"];
    storedColor = colors[Math.floor(Math.random() * colors.length)];
    sessionStorage.setItem("randomColor", storedColor);
  }
  console.log(" selected" + selectedChat, user);
  return (
    <>
      {/* <Avatar
        onClick={handleModalShow}
        sx={{ width: 53, height: 53, mr: 1 }}
        src={user.pic ? user.pic : null}
      >
        {user.name.charAt(0).toUpperCase()}
      </Avatar> */}
      <Avatar
        onClick={handleModalShow}
        sx={{ width: 53, height: 53, mr: 1 }}
        src={user.pic ? user.pic : null}
      >
        {user.username && typeof user.username === "string"
          ? user.username.charAt(0).toUpperCase()
          : null}
      </Avatar>
      <Modal
        className="profile-modal"
        show={modalShow}
        onHide={handleModalClose}
        animation={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center mb-3 justify-content-center">
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={user.pic ? user.pic : null}
            />
          </div>
          <p className="text-center m-0 p-0 fw-bolder">{user.username}</p>
          <p className="text-center p-0 m-0">{user.email}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Modalprofile;
