<script setup lang="ts">
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import service from "../../../request/service";

const organizationList = ref([]);
const organizationAddFormData = ref({});
const organizationTitle = ref("");
const organizationId = ref("");
const userId = ref("");
const organizationUpdateFormData = ref({});
const userAddFormData = ref({});
const userUpdateFormData = ref({});
const roleList = ref([]);
const passwordForm = ref({});
const show = ref(false);
const organizationRules = {
  label: [
    { required: true, message: "部门名称不能为空", trigger: "blur" },
    {
      pattern: /^(([^~!@#$%^&*()_+}{:<>?|}`?]{1,10}))$/,
      message: "名称不能超过10个字符,不能含有特殊符号",
    },
  ],
  typeId: [{ required: true, message: "部门属性不能为空", trigger: "blur" }],
};
const userRules = {
  userName: [
    { required: true, message: "用户名称不能为空", trigger: "blur" },
    {
      pattern: /^(([^~!@#$%^&*()_+}{:<>?|}`?]{1,10}))$/,
      message: "名称不能超过10个字符,不能含有特殊符号",
    },
  ],
  roleId: [{ required: true, message: "角色不能为空", trigger: "blur" }],
  account: [
    { required: true, message: "账号不能为空", trigger: "blur" },
    {
      pattern: /^((([a-z]|[A-Z]){1,20}))$/,
      message: "账号为英文格式,且不能超过20个字符",
    },
  ],
  organizationId: [
    { required: true, message: "部门不能为空", trigger: "blur" },
  ],
};
const passwordRules = {
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    {
      pattern: /^((([0-9]|[a-z]|[A-Z]){1,15}))$/,
      message: "密码为英文格式,且不能超过15个字符",
    },
  ],
};
interface User {
  id: number;
  name: string;
  account: string;
  organization: { name: string };
  role: { name: string };
  state: number;
  createdAt: string;
}

const tableData = ref<User[]>([]);
const organization = ref([]);
const extentionNumber = ref([]);
const organizationTypeList = ref([]);
const addOrganizationVisible = ref(false);
const updateOrganizationVisible = ref(false);
const deleteOrganizationVisible = ref(false);
const selectOrganizationTypeFlag = ref(false);
const addUserVisible = ref(false);
const updateUserVisible = ref(false);
const passwordVisible = ref(false);
const showSize = ref(true);
const deleteUserVisible = ref(false);

onMounted(() => {
  // 模拟数据
  organizationList.value = [
    { id: 1, label: "计算机科学与技术", parentId: "0", number: 10 },
    { id: 2, label: "软件工程", parentId: "0", number: 8 },
    { id: 3, label: "信息安全", parentId: "0", number: 5 },
    { id: 4, label: "网络工程", parentId: "0", number: 7 },
  ];

  tableData.value = [
    {
      id: 1,
      name: "张三",
      account: "zhangsan",
      organization: { name: "计算机科学与技术" },
      role: { name: "学生" },
      state: 0,
      createdAt: "2025-02-27",
    },
    {
      id: 2,
      name: "李四",
      account: "lisi",
      organization: { name: "软件工程" },
      role: { name: "学生" },
      state: 1,
      createdAt: "2025-02-27",
    },
  ];

  extentionNumber.value = [
    { uuid: "1", extentionNumber: "1001" },
    { uuid: "2", extentionNumber: "1002" },
  ];

  roleList.value = [
    { uuid: "1", label: "管理员" },
    { uuid: "2", label: "用户" },
  ];

  // 获取其他数据
  getOrganizations();
});

const getOrganizations = async () => {
  const url = "";
  await service.post(url).then((resp) => {
    if (resp.code == 200) {
      organization.value = resp.data;
    }
  });
  organizationList.value = listToTree(organization.value, 0);
  number(organizationList.value[0]);
};

const listToTree = (list, parentId) => {
  const obj = {};
  list.forEach((item) => {
    item.children = [];
    obj[item.id] = item;
  });
  return list.filter((item) => {
    if (item.parentId !== parentId && obj[item.parentId]) {
      obj[item.parentId].children.push(item);
      return false;
    }
    return true;
  });
};

const number = (data) => {
  let number = 0;
  if (data && data.children && data.children.length > 0) {
    data.children.forEach((item) => {
      if (item.children && item.children.length > 0) {
        number(item);
      }
      number = number + item.number;
    });
    data.number = data.number + number;
  }
};

const addOrganization = (data) => {
  // Add your logic here
  console.log("Adding organization", data);
};
</script>

<template>
  <div>
    <div class="sidebar">
      <h4 class="title">部门成员</h4>
      <el-tree
        ref="organizationTree"
        :data="organizationList"
        node-key="id"
        :expand-on-click-node="false"
        :indent="5"
        highlight-current
        node-click
        default-expand-all
        @node-click="add"
      >
        <template #default="{ node, data }">
          <div v-if="data.parentId == '0'">
            <span style="font-size: 20px; padding-right: 5px"></span>
            <span style="font-weight: bold">{{ node.label }}</span>
          </div>
          <div v-else>
            <span>{{ node.label }}({{ data.number }})</span>
          </div>
          <div class="buttons">
            <a class="button" @click.stop="updateOrganizationDialog(data)">
              <el-icon> <Edit /> </el-icon
            ></a>
            <a @click.stop="addOrganization(data)">
              <el-icon>
                <Plus />
              </el-icon>
            </a>
            <a @click.stop="deleteOrganization(data)">
              <el-icon>
                <Delete />
              </el-icon>
            </a>
          </div>
        </template>
      </el-tree>
      <el-dialog
        v-model="addOrganizationVisible"
        class="dialog"
        title="添加部门"
        align-center
      >
        <el-form
          ref="organizationAddFormData"
          :model="organizationAddFormData"
          :rules="organizationRules"
          class="demo-ruleForm"
        >
          <el-form-item label="部门名称" prop="label">
            <el-input
              v-model="organizationAddFormData.label"
              class="form-once"
            />
          </el-form-item>
          <el-form-item label="上级部门">
            <el-input
              disabled
              v-model="organizationAddFormData.parentName"
              placeholder="部门名称"
              class="form-once"
            />
          </el-form-item>
          <el-form-item
            v-if="selectOrganizationTypeFlag == true"
            label="部门属性"
            prop="typeId"
          >
            <el-select
              v-model="organizationAddFormData.typeId"
              clearable
              placeholder="请选择部门属性"
            >
              <el-option
                v-for="item in organizationTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-else label="部门属性" prop="typeId">
            <el-input
              disabled
              v-model="organizationAddFormData.typeLabel"
              placeholder="部门属性"
              class="form-once"
            />
          </el-form-item>
        </el-form>
        <div
          style="
            height: 50px;
            width: 150px;
            margin-top: 0px;
            float: right;
            padding-bottom: 15px;
          "
        >
          <el-button
            style="margin-top: 20px"
            @click="addOrganizationVisible = false"
            >取消</el-button
          >
          <el-button
            style="margin-top: 20px"
            @click="saveOrganization()"
            type="primary"
            >保存</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        v-model="updateOrganizationVisible"
        class="dialog"
        title="修改角色"
        align-center
      >
        <el-form
          ref="organizationUpdateFormData"
          :model="organizationUpdateFormData"
          :rules="organizationRules"
          class="demo-ruleForm"
        >
          <el-form-item label="部门名称" prop="label">
            <el-input
              v-model="organizationUpdateFormData.label"
              class="form-once"
            />
          </el-form-item>
          <el-form-item label="上级部门">
            <el-input
              disabled
              v-model="organizationUpdateFormData.parentName"
              placeholder="部门名称"
              class="form-once"
            />
          </el-form-item>
          <el-form-item label="部门属性">
            <el-input
              disabled
              v-model="organizationUpdateFormData.typeLabel"
              placeholder="部门属性"
              class="form-once"
            />
          </el-form-item>
        </el-form>
        <div style="float: right; padding-bottom: 15px">
          <el-button
            style="margin-top: 20px"
            @click="updateOrganizationVisible = false"
            >取消</el-button
          >
          <el-button
            style="margin-top: 20px"
            @click="updateOrganization()"
            type="primary"
            >修改</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        v-model="deleteOrganizationVisible"
        class="deleteTitle"
        title="提示"
        align-center
      >
        <div>确认要删除{{ organizationTitle }}?</div>
        <h5>该部门下的所有子部门和部门成员都将被删除!</h5>
        <div style="float: right; padding-bottom: 15px">
          <el-button
            style="margin-top: 20px"
            @click="deleteOrganizationVisible = false"
            >取消</el-button
          >
          <el-button
            style="margin-top: 20px"
            @click="removeOrganizationAndUser()"
            type="danger"
            >确认</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="content-box">
      <el-button
        type="primary"
        class="add"
        @click="uploadFiles()"
        style="margin-top: 20px"
        >上传文件</el-button
      >
      <el-button type="primary" class="add" @click="addUserDialog()"
        >添加成员</el-button
      >
      <el-dialog
        v-model="addUserVisible"
        class="dialog"
        title="添加成员"
        align-center
      >
        <el-form
          ref="userAddFormData"
          :model="userAddFormData"
          :rules="userRules"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="userName">
            <el-input
              v-model="userAddFormData.userName"
              placeholder="请输入姓名"
              class="form-once"
            />
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input
              v-model="userAddFormData.account"
              placeholder="请输入账号"
              class="form-once"
            />
          </el-form-item>
          <el-form-item label="部门" prop="organizationId">
            <el-input
              disabled
              v-model="userAddFormData.organizationName"
              class="form-once"
            />
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select
              v-model="userAddFormData.roleId"
              placeholder="请选择角色"
            >
              <el-option
                v-for="item in roleList"
                :key="item.uuid"
                :label="item.label"
                :value="item.uuid"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div
          style="
            height: 50px;
            width: 280px;
            margin-top: 0px;
            float: right;
            padding-bottom: 15px;
          "
        >
          <el-button
            style="margin-top: 20px"
            @click="(addUserVisible = false), (userAddFormData = {})"
            >取消</el-button
          >
          <el-button
            style="margin-top: 20px"
            @click="addUser('add')"
            type="primary"
            >保存</el-button
          >
          <el-button
            style="margin-top: 20px"
            @click="addUser('continueSave')"
            type="primary"
            >保存并继续添加</el-button
          >
        </div>
      </el-dialog>
      <div class="table" v-if="show">
        <el-table
          :data="tableData"
          :cell-style="{ textAlign: 'center' }"
          :class="[showSize ? 'tableMin' : 'tableMax']"
          :header-cell-style="{
            background: '#c0d5ff',
            color: '#333333',
            'text-align': 'center',
            'font-weight': 400,
          }"
          stripe
          width="100%"
        >
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="account" label="账号" />
          <el-table-column prop="organization.name" label="部门" />
          <el-table-column prop="role.name" min-width="100" label="角色" />
          <el-table-column prop="createdAt" min-width="152" label="创建时间" />
          <el-table-column fixed="right" label="操作" min-width="160">
            <template #default="scope">
              <div class="handle">
                <a @click="updateUserDialog(scope.row)">编辑</a>
                <span
                  ><a
                    v-if="scope.row.state === 0 && scope.row.uuid != 1"
                    @click="updateUserState(scope.row)"
                    >禁用</a
                  >
                  <a
                    v-if="scope.row.state === 1 && scope.row.uuid != 1"
                    @click="updateUserState(scope.row)"
                    >启用</a
                  ></span
                >
                <a @click="updateUserPasswordDialog(scope.row)">重置密码</a>
                <a @click="deleteUserDialog(scope.row)">删除用户</a>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          v-model="deleteUserVisible"
          class="dialog"
          title="删除成员"
          align-center
        >
          <div>确认要删除{{ userUpdateFormData.userName }}?</div>
          <div style="float: right; padding-bottom: 15px">
            <el-button
              style="margin-top: 20px"
              @click="deleteUserVisible = false"
              >取消</el-button
            >
            <el-button
              style="margin-top: 20px"
              @click="deleteUser()"
              type="danger"
              >确认</el-button
            >
          </div>
        </el-dialog>

        <el-dialog
          v-model="updateUserVisible"
          class="dialog"
          title="编辑成员"
          align-center
        >
          <el-form
            ref="userUpdateFormData"
            :model="userUpdateFormData"
            :rules="userRules"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名" prop="userName">
              <el-input
                v-model="userUpdateFormData.userName"
                placeholder="请输入姓名"
                class="form-once"
              />
            </el-form-item>
            <el-form-item label="账号" prop="account">
              <el-input
                disabled
                v-model="userUpdateFormData.account"
                placeholder="请输入账号"
                class="form-once"
              />
            </el-form-item>
            <el-form-item label="部门" prop="organizationId">
              <el-input
                disabled
                v-model="userUpdateFormData.organizationName"
                class="form-once"
              />
            </el-form-item>
            <el-form-item
              v-if="userUpdateFormData.roleId === '1'"
              label="角色"
              prop="roleId"
            >
              <el-input
                disabled
                v-model="userUpdateFormData.roleName"
                class="form-once"
              />
            </el-form-item>
            <el-form-item v-else label="角色" prop="roleId">
              <el-select v-model="userUpdateFormData.roleName">
                <el-option
                  v-for="item in roleList"
                  :key="item.uuid"
                  :label="item.label"
                  :value="item.uuid"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div
            style="
              height: 50px;
              width: 150px;
              margin-top: 0px;
              float: right;
              padding-bottom: 15px;
            "
          >
            <el-button
              style="margin-top: 20px"
              @click="(updateUserVisible = false), (userUpdateFormData = {})"
              >取消</el-button
            >
            <el-button
              style="margin-top: 20px"
              @click="updateUser()"
              type="primary"
              >保存</el-button
            >
          </div>
        </el-dialog>
        <el-dialog
          v-model="passwordVisible"
          class="dialog"
          title="重置密码"
          align-center
        >
          <el-form
            ref="passwordForm"
            :model="passwordForm"
            :rules="passwordRules"
            class="demo-ruleForm"
          >
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="passwordForm.password"
                placeholder="请输入密码"
                class="form-once"
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="password">
              <el-input
                v-model="passwordForm.passwordConfirm"
                placeholder="请输入确认密码"
                class="form-once"
              />
            </el-form-item>
          </el-form>
          <div
            style="
              height: 50px;
              width: 150px;
              margin-top: 0px;
              float: right;
              padding-bottom: 15px;
            "
          >
            <el-button
              style="margin-top: 20px"
              @click="(updateUserVisible = false), (passwordForm = {})"
              >取消</el-button
            >
            <el-button
              style="margin-top: 20px"
              @click="updateUserPassword()"
              type="primary"
              >保存</el-button
            >
          </div>
        </el-dialog>
      </div>
      <div id="blankPageBox" v-else>
        <div class="blankPage"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  float: left;
  width: 200px;
  height: 1000px;
  background-color: white;
  display: block;
  overflow-y: scroll;
  overflow: hidden;
}

.title {
  padding: 10px;
  margin-top: 13px;
  margin-left: 15px;
  color: #333333;
  font-size: 14px;
}

.add {
  position: relative;
  top: 20px;
  width: 140px;
  float: right;
  margin-right: 20px;
}

.table {
  position: relative;
  top: 50px;
  right: 0%;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 400;
  color: #333333;
}

.content-box {
  float: 700px;
  width: auto;
  height: 1000px;
  display: block;
  overflow-y: scroll;
  overflow: hidden;
  background-color: #f6f6f7;
}

.sidebar > ul {
  height: calc(100vh - 45px);
}

#blankPageBox {
  width: 100%;
  height: 100%;
  background-color: #f6f6f7;
}

.blankPage {
  padding: 20px;
  width: 300px;
  height: 300px;
  background: url("/image/404Page01.png");
  background-color: #f6f6f7;
  background-repeat: no-repeat;
  background-size: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  left: 150px;
  bottom: 0;
  right: 0;
}

.tableMin {
  height: 500px;
  background-color: rgb(240, 76, 82, 0.001);
}

.tableMax {
  height: 80vh;
  background-color: rgb(240, 76, 82, 0.001);
}

.buttons {
  position: absolute;
  right: 5px;
  height: 14px;
}

.button {
  width: 100px;
  height: 100px;
}

:deep(.el-dialog__header) {
  background-color: rgba(226, 237, 255, 1);
  margin-right: 0px;
  border-radius: 20px 20px 0 0;
}

.handle * {
  color: #1890ff;
  padding: 2px;
  font-weight: 400;
}

:deep(.deleteTitle > .el-dialog__header) {
  background-color: rgba(236, 116, 116, 1);
  margin-right: 0px;
  border-radius: 20px 20px 0 0;
}

:deep(.el-dialog__title) {
  font-size: 13px;
  color: #333333;
}

:deep(.el-dialog) {
  border-radius: 20px 20px 20px 20px;
  width: 400px;
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  background: #e5f0f6;
}

/* :deep(.el-tree-node:focus > .el-tree-node__content) {
  background-color: rgba(135, 206, 235, 0.3);
  color: #409eff; //节点的字体颜色
  font-weight: bold;
} */
</style>
