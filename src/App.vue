<template>
  <Teleport to="head">
    <meta name="description" :content="$route.meta?.description || 'Veh Shop'" />
  </Teleport>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import { onMounted, watch } from "vue";
import TheHeader from "./app/layout/TheHeader.vue";
import store from "./app/config/store";
import { useUserStore } from "./modules/user/store";
import { useSettingsStore } from "./modules/settings/store";

const userStore = useUserStore();
const settingsStore = useSettingsStore();

(watch(
  () => settingsStore.currentTheme,
  (newValue) => {
    document.documentElement.className = newValue;
  },
),
  { immediate: true });

onMounted(() => {
  store.dispatch("cart/initCart");
  settingsStore.initTheme();

  userStore.initSession();
});
</script>
<style></style>
