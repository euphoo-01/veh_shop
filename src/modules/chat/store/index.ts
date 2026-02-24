import { defineStore } from "pinia";
import { WSChat } from "../services";
import { reactive } from "vue";

export const useChatStore = defineStore("chat", () => {
  const wsChat = reactive<WSChat>(new WSChat());
  wsChat.setMessageHandler(handleMessage);
  wsChat.connect("wss://ws.ifelse.io");
  const messages = reactive<{ text: string; isMine: boolean }[]>([]);

  function handleMessage(message: string) {
    messages.push({ text: message, isMine: false });
  }
  return { wsChat, messages, handleMessage };
});
