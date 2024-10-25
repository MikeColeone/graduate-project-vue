<script setup lang="ts">
import Aside from "../components/aside.vue";
</script>
<!-- 主布局 -->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><Aside /></el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
