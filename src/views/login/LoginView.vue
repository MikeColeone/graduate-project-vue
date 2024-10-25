<script setup lang="ts">
import type { User } from "@/types";
import { ref } from "vue";

const UserR = ref<User>({});
UserR.value.number = "";
UserR.value.password = "";
//创建响应式对象
const loginForm = ref({
  username: "",
  password: "",
});

// 表单验证规则
const rules = {
  username: [
    {
      required: true,
      message: "Please input your username",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input your password",
      trigger: "blur",
    },
  ],
};

const loginFormRef = ref(null);

// 提交表单
const onSubmit = () => {
  if (loginFormRef.value != null)
    loginFormRef.value.validate((valid: any) => {
      if (valid) {
        alert("Login successful");
        // 在此可以执行登录
      } else {
        console.log("error submit!");
        //提交失败
        return false;
      }
    });
};

// 重置表单
const onReset = () => {
  loginFormRef.value?.resetFields();
};
</script>

<template>
  <div>
    <div class="login-container">
      <el-card class="login-card" shadow="hover">
        <h2 class="login-title">Login</h2>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="80px"
        >
          <el-form-item label="Username" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="Enter your username"
            ></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="Enter your password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Login</el-button>
            <el-button @click="onReset">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  width: 400px;
  padding: 20px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
