import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/" element={<Admin />}></Route>
      </Routes>
    );
  }
}
