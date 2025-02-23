<template>
  <div class="chat-container">
    <div class="chat-box">
      <div v-for="msg in messages" :key="msg.id" class="message">
        <strong>{{ msg.user }}:</strong> {{ msg.text }}
      </div>
    </div>
    <input
      v-model="inputMessage"
      placeholder="输入消息..."
      @keyup.enter="sendMessage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const ws = ref(null);
const messages = ref([]);
const inputMessage = ref("");
const userName = ref(`用户${Math.floor(Math.random() * 1000)}`);

onMounted(() => {
  ws.value = new WebSocket("ws://localhost:8080/chat");

  ws.value.onmessage = (event) => {
    const data = JSON.parse(event.data);
    messages.value.push(data);
  };

  ws.value.onclose = () => {
    console.log("WebSocket 连接已关闭");
  };
});

onUnmounted(() => {
  if (ws.value) ws.value.close();
});

const sendMessage = () => {
  if (!inputMessage.value.trim()) return;
  const message = {
    user: userName.value,
    text: inputMessage.value,
  };
  ws.value.send(JSON.stringify(message));
  inputMessage.value = "";
};
</script>

<style scoped>
.chat-container {
  width: 100%;
  max-width: 500px;
  margin: auto;
}
.chat-box {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}
.message {
  padding: 5px;
  border-bottom: 1px solid #eee;
}
input {
  width: 100%;
  padding: 8px;
}
</style>
