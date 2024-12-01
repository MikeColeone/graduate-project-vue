import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/login/LoginView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/admin/indexView.vue"),
    beforeEnter: (to: any, from: any, next: (arg0: string) => void) => {
      const role = localStorage.getItem("userRole");
      if (role == "admin") {
        next("/admin");
      } else {
        next("/");
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(), // 使用哈希模式
  routes,
});

export default router;
