import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../App";

const Signup = () => {
  const [username, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!username || !email || !password) {
      toast.warn("Fill all fields");
      return;
    }

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${URL}/api/user`,
        { username, email, password },
        toast.success("Register Successfully"),
        config
        
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
     

    } catch (error) {
      console.log(error);
      toast.error("User already exists");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          className=" d-flex align-items-center justify-content-center"
          style={{ width: "400px" }}
        >
          <div className="container-fluid">
            <h4 className="text-dark fw-bolder text-center">Sign Up</h4>

            <Form.Control
              className="my-3"
              placeholder="Username"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="d-flex align-items-center justify-content-center">
              <Form.Control
                placeholder="jason@example.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="d-flex my-3 align-items-center justify-content-center"></div>
            <Form.Control
              className="my-3"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mb-2 d-flex align-items-center justify-content-center">
              <button
                onClick={submitHandler}
                style={{ backgroundColor: "#FF9800", color: "white" }}
                className=" btn  w-100"
                // loading={loading}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
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
        theme="light"
      />
    </>
  );
};

export default Signup;
