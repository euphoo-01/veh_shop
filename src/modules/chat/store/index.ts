import { defineStore } from "pinia";
import { WSChat } from "../services";
import { reactive } from "vue";

export const useChatStore = defineStore("chat", () => {
  const wsBaseUrl = import.meta.env.VITE_WS_BASE_URL;
  if (!wsBaseUrl) {
    throw new Error("VITE_WS_BASE_URL is not defined in .env file.");
  }

  const wsChat = reactive<WSChat>(new WSChat());
  wsChat.setMessageHandler(handleMessage);
  wsChat.connect(wsBaseUrl);

  const messages = reactive<{ text: string; isMine: boolean }[]>([]);

  function handleMessage(message: string) {
    messages.push({ text: message, isMine: false });
  }

  function sendMessage(message: string) {
    wsChat.sendMessage(message);
    messages.push({ text: message, isMine: true });
  }

  return { wsChat, messages, sendMessage };
});
