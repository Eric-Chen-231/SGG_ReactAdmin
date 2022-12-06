/* 
接口请求函数模块
要求：
  1.根据接口文档定义接口请求的接口函数
  2.包含应用中所有接口的请求函数
  3.每个函数的返回值都是promise
*/

import ajax from "./ajax";

const BaseURL = "";
// 登录接口
export const reqLogin = (username, password) => {
  return ajax(BaseURL + "/api/login", { username, password }, "POST");
};

// 添加用户
export const reqAddUser = (user) => {
  return ajax(BaseURL + "/api/manage/user/add", user, "POST");
};
