<script setup lang="ts">
import Aside from "../views/layout/Aside.vue";
import Header from "../views/layout/Header.vue";
import { RouterView } from "vue-router";
import AdminView from "../views/user/admins/indexView.vue";
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width:auto height="100%"><Aside /></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <!-- <el-main><RouterView /> </el-main> -->
        <el-main><AdminView /> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  height: 100vh;
}
.el-header {
  --el-header-padding: 0px;
}
.el-aside {
  width: auto !important;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
