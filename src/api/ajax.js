/* 
发送异步ajax请求的模块
封装axios库
函数的返回值是promise对象
优化ajax请求：
    1.统一处理异常：
      a.在外层包裹一个自己创建的promise对象
      b.在请求出错时，不去调用reject(error),而是显示错误提示
    2.简化异步获得的response：
      a.在请求成功resolve时：resolve(response.data)
*/

import axios from "axios";
import { message } from "antd";

// 默认暴露一个自己封装出来的ajax函数用于发送ajax请求
export default function ajax(url, data = {}, type = "GET") {
  // 包裹自建promise对象，用于实现统一处理异常
  return new Promise((resolve) => {
    let promise;
    // 1.执行异步请求
    if (type === "GET") {
      promise = axios.get(url, {
        params: data,
      });
    } else {
      promise = axios.post(url, data);
    }
    /* 到这里最后会返回一个使用axios发送ajax请求的promise */

    promise.then(
      // 2.如果成功了，调用resolve(value)
      (response) => {
        resolve(response.data); //返回响应数据response.data
      },
      // 如果失败了，不调用reject(error)，而是提示异常信息,统一处理异常
      (error) => {
        message.error(error.message);
      }
    );
  });
}
