import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!email || !password) {
      toast.warn("Fill all fields");
    } else {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${URL}/api/user/login`,
          { email, password },
          config
        );

        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/chats");
      } catch (error) {
        console.log(error);
        toast.error("invalid credentials");
      }
    }
  };
  return (
    <>
      <div className=" d-flex justify-content-center">
        <div
          className=" d-flex align-items-center justify-content-center"
          style={{ width: "400px" }}
        >
          <div className="container-fluid">
            <h4 className="text-dark fw-bolder text-center">Welcome back</h4>
            <Form.Control
              style={{ backgroundColor: "white", color: "black" }}
              className="my-3 w-100"
              placeholder="Email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Control
              style={{ backgroundColor: "white", color: "black" }}
              className="my-3 w-100"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mb-2 d-flex align-items-center justify-content-center">
              <button
                onClick={submitHandler}
                style={{ backgroundColor: "#4942E4", color: "white" }}
                className=" btn  w-100"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
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

export default Login;
