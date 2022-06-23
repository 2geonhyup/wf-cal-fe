import React from "react";
import axios from "axios";

const LoginBtn = ({ loginState }) => {
  async function loginOrLogout() {
    // // get 요청
    // try {
    //   await axios.get(`/api/auth/googlelogin`);
    // } catch {
    //   console.log("app.js get failed!");
    // }
    if (loginState === "로그인") {
      window.location.href = "http://localhost:3005/auth/googlelogin";
    } else {
      window.location.href = "http://localhost:3005/auth/googlelogout";
    }
  }

  return (
    <div className="menu-div">
      <button className="menu-button" onClick={loginOrLogout}>
        <div className="logo">{loginState}</div>
      </button>
    </div>
  );
};

export default LoginBtn;
