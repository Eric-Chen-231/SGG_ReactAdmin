import React, { Component } from "react";
//引入Navigate实现render内的标签重定向
import { Navigate } from "react-router-dom";
//引入自己封装的widthUseNavigate以使用useNavigate以实现回调触发网页跳转
import widthUseNavigate from "../../components/widthUseNavigate";
// 引入接口请求函数模块
import { reqLogin } from "../../api";
// 引入用来在内存中保存一些数据的工具模块
import memoryTools from "../../tools/memoryTools";
// 引入进行local数据存储管理的工具模块
import storageTools from "../../tools/storageTools";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import "./index.less";
import logo from "./images/login-logo.png";

class Login extends Component {
  // 创建ref
  formRef = React.createRef();

  /* 提交表单且数据验证成功后回调事件，
  可以接收到values（为对象，含表单中的各项Item值{name:value}) */
  onFinish = async (values) => {
    /* 
      async和await
      1.作用？
        简化promise对象的使用：
            不用then()来指定成功/失败的回调
        以同步编程的方式（没有回调函数）实现异步流程
      2.哪里写awiat？
        在返回promise的表达式左侧：
            不想要promise，想要promise异步执行成功的value数据
      3.哪里写async？
        await所在函数（最近的）定义的左侧
    */
    const { username, password } = values;
    //使用接口请求函数发送ajax请求
    const result = await reqLogin(username, password);
    if (result.status === 0) {
      message.success("登录成功");
      console.log("请求成功", result);
      // 将当前登录用户的数据存储到内存中
      memoryTools.user = result.data;
      // 将当前登录用户的数据存储的local
      storageTools.saveUser(result.data);
      this.props.to("/", { replace: true });
    } else {
      message.error("登录失败" + result.msg);
      console.log("请求成功", result);
    }
  };
  /* 提交表单且数据验证失败后回调事件,
  可以接收values（为对象
                  {values(为对象，表单中的各项Item值{name:value}),
                  errorFields（为数组，表单中出错的Item对象），
                  outOfDate（布尔值，出错为false）}
  ） */
  onFinishFailed = (values) => {
    console.log("校验失败\n", values);
  };

  checkAll = (event) => {
    console.log(
      "统一验证，页面拿到数据后的处理操作进行检验，返回的是promise",
      this.formRef.current.validateFields()
    );
    // 使用validateFields()进行统一验证
    this.formRef.current
      .validateFields()
      .then((values) => {
        console.log(
          "验证通过后进入,values(为对象，表单中的各项Item值{name:value}",
          values
        );
      })
      .catch((err) => {
        console.log(
          "验证不通过时进入,err{为对象{values,errorFields,outOfDate}",
          err
        );
        let txt = "";
        err.errorFields.forEach((value) => {
          txt = txt + value.errors + "\n";
        });
        alert(txt);
      });
    console.log("Received values of form: ", event);
  };

  render() {
    /* 
      如果用户已登录，则无法返回login登录页面，会重定向回admin页面
    */
    if (memoryTools.user && memoryTools.user._id) {
      return <Navigate to="/" replace={true} />;
    } else {
      return (
        <div className="login">
          <header className="login-header">
            <img src={logo} alt="logo" />
            <h1>图书馆管理系统</h1>
          </header>
          <section className="login-content">
            <h2>用户登录</h2>
            <Form
              // validateTrigger={["onSubmit"]}
              ref={this.formRef}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                name="username"
                hasFeedback
                // 声明式验证，在rules中以对象的方式添加验证规则
                rules={[
                  {
                    required: true,
                    message: "请输入帐号！",
                  },
                  {
                    min: 4,
                    max: 12,
                    message: "帐号必须是4-12位",
                  },
                  {
                    pattern: /^[0-9a-zA-Z_]+$/,
                    message: "帐号只能是英文、数字或下划线组成",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="帐号"
                />
              </Form.Item>
              <Form.Item
                name="password"
                hasFeedback
                // 自定义验证，在rules中使用validator进行自定义验证
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("密码必须输入");
                      } else if (value.length < 4 || value.length > 12) {
                        return Promise.reject("密码必须是4-12位");
                      } else if (!/^[0-9a-zA-Z_]+$/.test(value)) {
                        return Promise.reject(
                          "密码只能是英文、数字或下划线组成"
                        );
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={this.checkAll}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </section>
        </div>
      );
    }
  }
}

export default widthUseNavigate(Login);
