<script setup lang="ts">
import type { User } from "../../types";
import jwt_decode from "jwt-decode";
import { ref } from "vue";
import service from "../../api/login";
import { User as UserIcon, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
// 创建响应式对象 用户名 密码 角色
const loginForm = ref({
  username: "",
  password: "",
  role: "",
});

// 表单验证规则
const rules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
};

const loginFormRef = ref<any>(null);
const router = useRouter();
// 提交表单
const onSubmit = () => {
  if (loginFormRef.value != null)
    loginFormRef.value.validate((valid: any) => {
      if (valid) {
        service.post("/api/auth/login", loginFormRef.value).then((res)=>{
          const token = res.token;

          if(token){
            localStorage.setItem("token",token);
            //解析出角色信息
            const decodeToken = jwt_decode(token);
            const userRole = decodeToken.role;

            //存储角色信息
            localStorage.setItem("userRole",userRole);
            if(userRole=="admin") router.push("./admin")
            else if(userRole=="student") router.push("/student");
            else if(userRole=="teacher") router.push("/teacher");
            else{
              alert("无效身份")
            }
          }
        })

    });
};
</script>

<template>
  <div>
    <div class="login-container">
      <el-card class="login-card" shadow="hover">
        <h2 class="login-title">欢迎使用毕设管理系统</h2>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
          label-width="80px"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="输入账号"
              :prefix-icon="UserIcon"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="输入密码"
              :prefix-icon="Lock"
              show-password
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
  height: 100vh;
  background-image: url(../../assets/login/login.png);
  background-size: cover;
  overflow: hidden;
}

.login-card {
  position: absolute;
  background-color: white;
  right: 0;
  margin-top: 200px;
  margin-right: 180px;
  width: 400px;
  padding: 20px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
