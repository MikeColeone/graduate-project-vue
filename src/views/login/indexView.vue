<script setup lang="ts">
import { onMounted, ref } from "vue";
import service from "../../request/service";
import router from "../../router";
import type { FormInstance } from "element-plus";
import { AxiosResponse } from "axios";

const formData = ref({
  account: "",
  password: "",
});
const isAutoLogin = ref(false);
const isRemember = ref(false);

const formRef = ref<FormInstance | null>(null);
const rules = {
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
  console.log("formData account:", formData.value.account);
  console.log("login执行了");
  if (isRemember.value) {
    localStorage.setItem("account", formData.value.account);
    localStorage.setItem("password", formData.value.password);
  }
  if (formRef.value !== null) {
    formRef.value.validate(async (valid: any) => {
      if (valid) {
        try {
          const res = await service.post("/login", formData.value);
          loginSuccess(res);
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
};

const loginSuccess = (res: AxiosResponse<any, any>) => {
  console.log("登录成功", res);
  if (res.data.code === 200) {
    localStorage.setItem("xm-user", JSON.stringify(res.data));
    if (isAutoLogin.value) {
      localStorage.setItem("token", res.data.token);
    }
    if (isRemember.value) {
      localStorage.setItem("account", formData.value.account);
      localStorage.setItem("password", formData.value.password);
    }
    router.push("/");
  }
};

onMounted(() => {});
</script>
<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="账号" prop="account">
        <el-input
          v-model="formData.account"
          placeholder="请输入用户名"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入密码"
          autocomplete="off"
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
