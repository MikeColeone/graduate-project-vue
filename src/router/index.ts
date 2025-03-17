import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import * as consty from "../types/index";
import { ElMessage } from "element-plus";
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/indexView.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/MainView.vue"),
    meta: {
      perssion: [
        consty.RoleType.ADMIN_ROLE,
        consty.RoleType.TEACHER_ROLE,
        consty.RoleType.STUDENT_ROLE,
      ],
    },
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
          perssion: [
            consty.RoleType.ADMIN_ROLE,
            consty.RoleType.TEACHER_ROLE,
            consty.RoleType.STUDENT_ROLE,
          ],
        },
      },
      {
        path: "admin",
        name: "AdminManagement",
        meta: {
          id: "2",
          name: "管理",
          icon: "Document",
          path: "/department-management",
          describe: "用于专业管理包括上传学生教师表格",
          perssion: [consty.RoleType.ADMIN_ROLE],
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
              perssion: [consty.RoleType.ADMIN_ROLE],
            },
          },
        ],
      },
      {
        path: "teacher",
        name: "TeacherManagement",
        meta: {
          id: "3",
          name: "教师功能",
          icon: "Avatar",
          path: "/teacher",
          describe: "用于表示实验室人员管理",
          perssion: [consty.RoleType.TEACHER_ROLE],
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
              perssion: [consty.RoleType.TEACHER_ROLE],
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
              perssion: [consty.RoleType.TEACHER_ROLE],
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
              perssion: [consty.RoleType.TEACHER_ROLE],
            },
          },
        ],
      },
      {
        path: "student",
        name: "StudentFunctions",
        meta: {
          id: "4",
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
              perssion: [consty.RoleType.STUDENT_ROLE],
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
              perssion: [consty.RoleType.STUDENT_ROLE],
            },
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    name: "Forbidden",
    component: () => import("../views/403.vue"),
    meta: {
      describe: "无访问权限",
      perssion: [
        consty.RoleType.STUDENT_ROLE,
        consty.RoleType.TEACHER_ROLE,
        consty.RoleType.ADMIN_ROLE,
      ],
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   try {
//     const user = JSON.parse(localStorage.getItem("xm-user") || "{}");

//     // 没有定义权限的路由直接放行
//     if (!to.meta.perssion) {
//       next();
//       return;
//     }

//     const currentRole = user.role;
//     console.log("currentRole", currentRole);

//     // 检查当前角色是否在目标路由允许的权限列表中
//     const hasPermission = to.meta.perssion.includes(currentRole);

//     if (hasPermission) {
//       // 如果用户密码和账号相同，提示修改密码并重定向到首页
//       if (user.password === user.account) {
//         ElMessage.error("请于个人资料处修改密码");
//         next("/");
//       } else {
//         next();
//       }
//     } else {
//       // 没有权限，清除本地存储，提示重新登录并重定向到登录页
//       localStorage.clear();
//       ElMessage.error("登录信息已过期，请重新登录");
//       next("/login");
//     }
//   } catch (error) {
//     console.error(error);
//     ElMessage.error("系统错误");
//     // 清除本地存储
//     localStorage.clear();
//     // 重定向到登录页
//     next("/login");
//   }
// });

// export default router;
