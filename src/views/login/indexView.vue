<script setup lang="ts">
import service from "../../request/service";
import { ref } from "vue";
import router from "../../router";
const formData = ref({
  account: "",
  password: "",
});
const isAutoLogin = false;
const isRemember = false;
const rules = {
  //账号默认十位数字
  account: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
      pattern: /^[0-9]{10}$/,
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const login = async () => {
  service
    .post("/login", formData.value)
    .then((res) => {
      loginSuccess(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const loginSuccess = (res) => {
  console.log("登录成功", res);
  if (res.code === 200) {
    if (isAutoLogin) {
      localStorage.setItem("token", res.data.token);
    }
    if (isRemember) {
      localStorage.setItem("account", formData.value.account);
      localStorage.setItem("password", formData.value.password);
    }
    router.push("/home");
  }
};
</script>
<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="formData" label-width="80px">
      <el-form-item label="账号" prop="account">
        <el-input
          v-model="formData.account"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="isAutoLogin">自动登录</el-checkbox>
        <el-checkbox v-model="isRemember">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="less"></style>
