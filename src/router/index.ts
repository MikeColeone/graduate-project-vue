import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(), // 使用哈希模式
  routes,
});

export default router;
