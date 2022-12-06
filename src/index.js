import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import memoryTools from "./tools/memoryTools";
import storageTools from "./tools/storageTools";

// 接入页面时将local中的当前登录用户数据同步到内存中，以实现自动登录以及刷新免登录
memoryTools.user = storageTools.getUser();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
