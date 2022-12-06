import React, { Component } from "react";
import memoryTools from "../../tools/memoryTools";
import { Navigate } from "react-router-dom";

export default class Admin extends Component {
  render() {
    const user = memoryTools.user;
    if (!user || !user._id) {
      return <Navigate to="/login" replace={true} />;
    } else {
      return <h1>Welcome {user.username} !!!</h1>;
    }
    /* 
      当未登录时无法进入admin页面，会被重定向回login登录页面  
    */
  }
}
