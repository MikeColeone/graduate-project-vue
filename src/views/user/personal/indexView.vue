<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";
const dialogVisible = ref(false);
const handle = () => {
  dialogVisible.value = false;
};
const form = ref({
  account: "",
  name: "",
});

const formPassword = ref({
  oldPassword: "",
  newPassword: "",
});

const resetPassword = () => {
  if (formPassword.value.oldPassword !== formPassword.value.newPassword) {
    console.log("两次密码不一致");
    ElMessage.info("两次密码不一致");
    return;
  } else {
    console.log("密码重置成功");
  }
};
</script>
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header">
            <span>个人信息</span>
          </div>
          <el-form label-position="right" label-width="100px">
            <el-form-item label="用户名">
              <el-input v-model="form.account" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>

            <el-button type="primary" @click="handle">重置密码</el-button>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="重置密码" v-model:visible="dialogVisible" width="30%">
      <el-form>
        <el-form-item label="新密码">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-button type="primary" @click="resetPassword">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
