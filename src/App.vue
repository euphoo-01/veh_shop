<template>
  <Teleport to="head">
    <meta name="description" :content="pageDescription" />
  </Teleport>
  <v-app>
    <TheHeader />
    <main>
      <RouterView />
      <ChatWindow v-model="isChatOpen" />
      <ChatLauncher @open-chat="isChatOpen = true" />
    </main>
  </v-app>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useTheme } from "vuetify";
import TheHeader from "./app/layout/TheHeader.vue";
import ChatLauncher from "./modules/chat/components/ChatLauncher.vue";
import ChatWindow from "./modules/chat/components/ChatWindow.vue";
import { useUserStore } from "./modules/user/store";
import { useSettingsStore } from "./modules/settings/store";
import { useCartStore } from "./modules/cart/store";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const settingsStore = useSettingsStore();
const cartStore = useCartStore();
const route = useRoute();
const theme = useTheme();

const isChatOpen = ref<boolean>(false);

const pageDescription = computed(() => {
  const routeDescription = route.meta?.description;
  if (typeof routeDescription === "string") {
    return routeDescription;
  } else {
    return "Veh Shop";
  }
});

watch(
  () => settingsStore.currentTheme,
  (newValue) => {
    document.documentElement.className = newValue;
    theme.change(newValue);
  },
  { immediate: true },
);

onMounted(() => {
  cartStore.initCart();
  settingsStore.initTheme();
  userStore.initSession();
});
</script>
<style></style>
