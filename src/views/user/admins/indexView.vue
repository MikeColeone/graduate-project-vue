<script setup lang="ts">
import service from "../../../request/service";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, ref } from "vue";
const users = ref([]);
const loading = ref(false);
const ids = ref([]);
const deparments = ref([]);

const form = ref({
  account: "",
  name: "",
  role: "",
});
const dialogVisible = ref(false);
const handleClose = () => {
  dialogVisible.value = false;
};

//获取所有专业
const fetchDepartments = async () => {
  service
    .get("/departments")
    .then((res) => {
      deparments.value = res.data;
    })
    .catch((err) => {
      ElMessage.info("获取专业失败");
      console.log(err);
    });
};

//获取用户
const fetchUsers = async () => {
  loading.value = true;
  service
    .get("/users")
    .then((res) => {
      users.value = res.data;
      loading.value = false;
    })
    .catch((err) => {
      ElMessage.info("获取用户失败");
      console.log(err);
      loading.value = false;
    });
};

//上传用户表格
// const handleUpdate = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file.file);
//   service
//     .post("/users/upload", formData)
//     .then((res) => {
//       console.log(res);
//       fetchUsers();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

//删除用户
const deleteUsers = async (id) => {
  ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      service
        .delete(`/users/${id}`)
        .then((res: any) => {
          console.log(res);
          fetchUsers();
        })
        .catch((err) => {
          ElMessage.error("删除用户失败");
          console.log("err", err);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};

//新增用户
const addUser = () => {
  ElMessageBox.prompt("请输入账号", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputPattern: /^[0-9]{10}$/,
    inputErrorMessage: "账号为10位数字",
  })
    .then(({ value }) => {
      service
        .post("/users", { account: value })
        .then((res: any) => {
          console.log(res);
          fetchUsers();
        })
        .catch((err) => {
          ElMessage.error("新增用户失败");
          console.log("err", err);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消新增",
      });
    });
};

//批量删除用户
const deleteUsersBatch = async (ids: any) => {
  ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      service
        .delete(`/users/batch/${ids}`)
        .then((res: any) => {
          console.log(res);
          fetchUsers();
        })
        .catch((err) => {
          ElMessage.error("删除用户失败");
          console.log("err", err);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};
//重置密码
const resetPassword = async (id) => {
  ElMessageBox.confirm("此操作将重置密码, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      service
        .put(`/users/reset/${id}`)
        .then((res: any) => {
          console.log(res);
          fetchUsers();
        })
        .catch((err) => {
          ElMessage.error("重置密码失败");
          console.log("err", err);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消重置密码",
      });
    });
};

//当前选中的行
const handleSelectionChange = (val) => {
  ids.value = val.map((item) => item.id);
};
//挂载的时候获取用户
onMounted(() => {
  fetchUsers();
  fetchDepartments();
});
</script>
<template>
  <div class="container">
    <div>
      <!-- 查询出来的专业 -->
      <!-- 左侧专业列表 -->
      <el-aside width="200px" style="background-color: #f5f7fa; padding: 10px">
        <el-card shadow="hover">
          <template #header>
            <span>专业列表</span>
          </template>
          <el-menu>
            <el-menu-item
              v-for="dept in deparments"
              :key="dept.id"
              @click="filterByDepartment(dept.id)"
            >
              {{ dept.name }}
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-aside>
    </div>

    <div>
      <div class="search">
        <el-input
          placeholder="请输入账号查询"
          style="width: 200px"
          v-model="account"
        ></el-input>

        <el-button type="info" plain style="margin-left: 10px" @click="load(1)"
          >查询</el-button
        >
        <!-- 重置筛选条件 -->
        <el-button type="warning" plain style="margin-left: 10px" @click="reset"
          >重置</el-button
        >
        <el-button type="success" plain style="margin-left: 10px"
          >新增用户</el-button
        >
      </div>

      <el-dialog
        title="新增用户"
        v-model:visible="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form>
          <el-form-item label="账号">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="form.role" placeholder="请选择">
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="普通用户" value="user"></el-option>
            </el-select>
          </el-form-item>

          <el-button type="primary" @click="addUser">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form>
      </el-dialog>

      <div class="operation">
        <el-button type="primary" plain @click="handleAdd">新增</el-button>
        <el-button type="danger" plain @click="deleteUsersBatch"
          >批量删除</el-button
        >
      </div>
      <el-upload
        class="upload-demo"
        action="/upload"
        :on-success="handleUpdate"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-table
        :data="users"
        style="width: 100%"
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              size="mini"
              type="primary"
              @click="resetPassword(row.id)"
            >
              重置密码
            </el-button>
            <el-button size="mini" type="danger" @click="deleteUsers(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
</style>
