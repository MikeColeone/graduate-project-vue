<template>
  <div class="user-list">
    <h3>在线用户</h3>
    <ul>
      <li v-for="user in users" :key="user">{{ user }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const users = ref([]);

onMounted(() => {
  const ws = new WebSocket("ws://localhost:8080/users");
  ws.onmessage = (event) => {
    users.value = JSON.parse(event.data);
  };
});
</script>

<style scoped>
.user-list {
  border: 1px solid #ddd;
  padding: 10px;
  width: 200px;
}
</style>
