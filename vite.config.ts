import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   port: 8081, // 设置开发服务器的端口
  //   host: "0.0.0.0", // 允许外部访问
  //   // https: {}, // 启用 https
  //   proxy: {
  //     "/api": "http://localhost:3000", // 将/api请求代理到本地3000端口
  //   },
  // },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
