import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
export default defineConfig({
  server: {
    proxy: {
      "/api/": {
        target: "http://localhost:8088/2022212890", // 后端服务器地址
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes, req, res) => {
            const token = proxyRes.headers["token"];
            if (token) {
              res.setHeader("token", token);
              console.log("token", token);
            }
          });
        },
        changeOrigin: true,
      },
    },
  },
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
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 允许使用 Less 的 JavaScript 计算功能
        modifyVars: {
          "@primary-color": "#42b983", // 定义全局变量
        },
      },
    },
  },
});
