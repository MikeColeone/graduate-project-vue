<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 在应用加载时检查是否存在身份信息
onMounted(() => {
  const userRole = localStorage.getItem("userRole");
  if (userRole) {
    if (userRole === "admin") {
      router.push("/admin"); // 跳转到管理员页面
    } else if (userRole === "user") {
      router.push("/user"); // 跳转到用户页面
    }
  }
});
</script>
<template>
  <div>
    <RouterView />
  </div>
</template>
