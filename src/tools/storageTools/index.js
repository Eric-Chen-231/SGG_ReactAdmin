/* 
进行local数据存储管理的工具模块（保存在localstorage中）
*/

//引入在github上下载的store模块，用于存储、操作localstorage数据
import store from "store";

const USER_KEY = "user_key";
const storageTools = {
  //保存user
  saveUser(user) {
    store.set(USER_KEY, user);
  },
  //获取user
  getUser() {
    return store.get(USER_KEY) || {};
  },
  //移除user
  removeUser() {
    store.remove(USER_KEY);
  },
};

export default storageTools;
