import { createApp } from "vue";
import store from "../src/stores";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import "../src/mock/mock";
import "element-plus/dist/index.css"; // 引入 Element Plus 的样式
// 全局引入
const app = createApp(App);
app.use(ElementPlus);
app.use(store); // 挂载 Vuex
app.use(router);
app.mount("#app");
