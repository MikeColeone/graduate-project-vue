import Mock from "mockjs";

Mock.mock("/api/login", "post", (options) => {
  const { account, password } = JSON.parse(options.body);

  if (account === "2022212829" && password === "2022212920") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "mock-token-123456",
      },
    };
  } else {
    return {
      code: 401,
      message: "账号或密码错误",
    };
  }
});

export default Mock;
