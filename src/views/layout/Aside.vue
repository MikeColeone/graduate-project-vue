<script setup lang="ts">
import { useRouter } from "vue-router";
import TreeMenu from "./TreeMenu.vue";
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

const handleOpen = () => {};
const handleClose = () => {};
const store = useStore();
const isCollapse = computed(() => store.state.menu.isCollapse);
const router = useRouter();
const menuData = reactive(router.options.routes[0]?.children || []);
</script>
<template>
  <div>
    <el-menu
      :style="{ width: !isCollapse ? '230px' : '68px' }"
      style="border-radius: 5px"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="aside-mystyle"
      default-active="2"
      text-color="#fff"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <p class="logo-title" style="padding: 10px">nefu毕设管理系统</p>
      <TreeMenu :index="1" :menuData="menuData" />
    </el-menu>
  </div>
</template>
<style lang="less" scoped>
.aside-mystyle {
  height: 100vh;
}

.logo-title {
  padding: 0;
  margin: 0;
  font-size: 20px;
  text-align: center;
}
</style>
