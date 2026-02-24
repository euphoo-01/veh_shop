<script setup lang="ts">
const emit = defineEmits(["open-chat"]);
</script>

<template>
  <div class="chat-launcher">
    <v-btn
      icon="mdi-message-text"
      color="primary"
      size="x-large"
      elevation="0"
      @click="emit('open-chat')"
    ></v-btn>
  </div>
</template>

<style scoped>
.chat-launcher {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}
</style>
