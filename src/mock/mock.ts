import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(axios);

// 模拟登录接口
mock.onPost("/api/login").reply(200, {
  code: 200,
  data: {
    code: 200,
    token: "fake-token",
    user: {
      id: "101548451",
      name: "admin",
      role: "admin",
    },
    role: "R2md",
  },
  message: "登录成功",
});

// 模拟获取用户信息接口
mock.onGet("/api/user").reply(200, {
  code: 200,
  data: {
    id: "101548451",
    name: "admin",
    role: "admin",
  },
  message: "获取用户信息成功",
});

export default mock;
