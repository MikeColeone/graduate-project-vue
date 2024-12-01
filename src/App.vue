<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import LoadingView from "./components/LoadingView.vue";
const router = useRouter();

onMounted(() => {
  const userRole = localStorage.getItem("userRole");
  if (userRole) {
    if (userRole === "admin") {
      router.push("/admin"); // 跳转到管理员页面
    } else if (userRole === "user") {
      router.push("/user"); // 跳转到用户页面
    } else if (userRole == "teacher") {
      router.push("teacher");
    }
  }
});
</script>
<template>
  <suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <LoadingView />
    </template>
  </suspense>
</template>
