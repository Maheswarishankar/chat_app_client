import React from "react";
import Header from "./Header";
import "./Home.css";


const Home = () => {
  return (
    <>
      <Header />
      <div style={{ overflow: "hidden" }} className=" bg mx-lg-5 mx-md-5 mx-3">
        <div className=" d-flex flex-column align-items-center justify-content-center h-100">
          <p
            style={{ fontWeight: "500", color: "white" }}
            className=" text-center top-p m-0 p-0"
          >
            Chat Simplified
          </p>
          {/* <div
            className=" btn mt-2 py-2 rounded-pill px-2"
            style={{
              backgroundColor: "#FF9800",
              color: "white",
              border: "none",
            }}
          >
            Get started
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
