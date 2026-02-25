<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "../store";
import { toRefs, ref } from "vue";

const emit = defineEmits(["update:model-value"]);
const props = defineProps<{ modelValue: boolean }>();

const chatStore = useChatStore();
const { messages } = storeToRefs(chatStore);
const { modelValue } = toRefs(props);
const newMessage = ref<string>("");

function sendMessage() {
  if (newMessage.value.trim()) {
    chatStore.sendMessage(newMessage.value.trim());
    newMessage.value = "";
  }
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:model-value', $event)"
    persistent
    scrollable
    width="550"
    height="800"
    class="chat-dialog"
  >
    <v-card class="d-flex flex-column" rounded="0">
      <v-toolbar color="primary" density="compact">
        <v-toolbar-title>Support Chat</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" @click="emit('update:model-value', false)"></v-btn>
      </v-toolbar>

      <v-card-text class="grow pa-4">
        <div
          v-for="(message, idx) in messages"
          :key="idx"
          class="d-flex mb-4"
          :class="message.isMine ? 'justify-end' : 'justify-start'"
        >
          <v-sheet
            :color="message.isMine ? 'primary' : 'surface-light'"
            class="pa-2"
            max-width="80%"
          >
            {{ message.text }}
          </v-sheet>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-2">
        <v-text-field
          v-model="newMessage"
          placeholder="Type a message..."
          variant="solo"
          density="compact"
          hide-details
          autofocus
          flat
          @keydown.enter="sendMessage"
        ></v-text-field>
        <v-btn
          icon="mdi-send"
          color="primary"
          @click="sendMessage"
          :disabled="!newMessage.trim()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
