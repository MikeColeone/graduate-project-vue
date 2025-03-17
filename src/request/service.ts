import axios from "axios";
import router from "../router";
const service = axios.create({
  baseURL: "/api/",
  timeout: 3000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    const token = localStorage.getItem("token");
    console.log("Request token:", token);
    if (token) {
      config.headers["token"] = token; // 设置请求头
    }
    const user = JSON.parse(localStorage.getItem("xm-user") || "{}");
    if (user && user.token) {
      config.headers["token"] = user.token;
    }
    console.log("Request config:", config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    let res = response.data;

    // 兼容服务端返回的字符串数据
    if (typeof res === "string") {
      res = res ? JSON.parse(res) : res;
    }

    // 打印响应头
    console.log("Response headers:", response.headers);

    // 如果响应中包含 token，则将其存储到 localStorage
    const token = response.headers["token"];
    if (token) {
      console.log("Response token:", token); // 打印 token
      localStorage.setItem("token", token);
    }

    if (res.code === 401) {
      localStorage.removeItem("xm-user"); // 清除用户信息
      localStorage.removeItem("token"); // 清除 token
      router.push("/login");
    }
    return res;
  },
  (error) => {
    console.error("Response error:", error); // for debug
    console.error("Response error details:", error.response); // 打印详细的响应错误信息
    return Promise.reject(error);
  }
);

export default service;
