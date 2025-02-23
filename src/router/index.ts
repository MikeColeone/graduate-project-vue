import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { ElMessage } from "element-plus";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/indexView.vue"),
  },
  {
    path: "/",
    component: () => import("../views/MainView.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/dashboard/indexView.vue"),
        meta: {
          id: "1",
          name: "首页",
          icon: "Platform",
          path: "/dashboard",
          describe: "用于展示当前系统中的统计数据和当前任务的进行情况",
        },
      },
      {
        path: "personal",
        name: "PersonalCenter",
        component: () => import("../views/user/personal/indexView.vue"),
        meta: {
          id: "2",
          name: "个人中心",
          icon: "User",
          path: "/personal",
          describe: "检测到密码和账号相同时",
        },
      },
      {
        path: "admin",
        name: "AdminManagement",
        meta: {
          id: "3",
          name: "管理",
          icon: "Document",
          path: "/department-management",
          describe: "用于专业管理包括上传学生教师表格",
        },
        children: [
          {
            path: "departments",
            name: "Departments",
            component: () => import("../views/user/admins/indexView.vue"),
            meta: {
              id: "1",
              name: "专业管理",
              icon: "BellFilled",
              path: "/departments",
              describe: "用于管理专业包括专业人员调动",
            },
          },
        ],
      },
      {
        path: "teacher",
        name: "TeacherManagement",
        meta: {
          id: "4",
          name: "教师功能",
          icon: "Avatar",
          path: "/teacher",
          describe: "用于表示实验室人员管理",
        },
        children: [
          {
            path: "process",
            name: "ProcessManagement",
            component: () => import("../views/user/teachers/ProcessView.vue"),
            meta: {
              id: "1",
              name: "过程管理",
              icon: "UserFilled",
              path: "/process",
              describe: "用于上传过程和过程子项",
            },
          },
          {
            path: "group",
            name: "GroupManagement",
            component: () => import("../views/user/teachers/GroupView.vue"),
            meta: {
              id: "2",
              name: "分组管理",
              icon: "User",
              path: "/group",
              describe: "获取当前自己指导的小组的信息",
            },
          },
          {
            path: "score",
            name: "ScoreManagement",
            component: () => import("../views/user/teachers/ScoreView.vue"),
            meta: {
              id: "3",
              name: "得分管理",
              icon: "User",
              path: "/score",
              describe: "获取学生的过程评分",
            },
          },
        ],
      },
      {
        path: "student",
        name: "StudentFunctions",
        meta: {
          id: "5",
          name: "学生功能",
          icon: "User",
        },
        children: [
          {
            path: "upload",
            name: "FileUpload",
            component: () => import("../views/user/students/indexView.vue"),
            meta: {
              id: "1",
              name: "上传文件",
              icon: "User",
              describe: "用于学生上传文件",
            },
          },
          {
            path: "info",
            name: "DefenseInfo",
            component: () => import("../views/user/students/InfoView.vue"),
            meta: {
              id: "2",
              name: "答辩信息",
              icon: "User",
              describe: "用于学生查看答辩信息",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    name: "Forbidden",
    component: () => import("@/views/components/403.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("xm-user") || "{}");
  const hasRedirected = localStorage.getItem("hasRedirected");

  if (
    user.password === user.account &&
    user.role === "teacher" &&
    to.path !== "/profile" &&
    !hasRedirected
  ) {
    ElMessage.error("请修改密码");
    localStorage.setItem("hasRedirected", "true");
    next("/profile");
    return;
  }

  if (to.path === "/admin/manage" && user.role !== "admin") {
    ElMessage.error("无权限访问");
    next("/403");
    return;
  }

  if (!user.role && to.path !== "/login") {
    next("/login");
    return;
  }

  if (to.path === "/") {
    next(user.role === "user" ? "/dashboard" : "/login");
    return;
  }

  next();
});

export default router;
