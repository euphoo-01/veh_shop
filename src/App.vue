<template>
  <Teleport to="head">
    <meta name="description" :content="pageDescription" />
  </Teleport>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import TheHeader from "./app/layout/TheHeader.vue";
import { useUserStore } from "./modules/user/store";
import { useSettingsStore } from "./modules/settings/store";
import { useCartStore } from "./modules/cart/store";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const settingsStore = useSettingsStore();
const cartStore = useCartStore();
const route = useRoute();

(watch(
  () => settingsStore.currentTheme,
  (newValue) => {
    document.documentElement.className = newValue;
  },
),
  { immediate: true });

const pageDescription = computed(() => {
  const routeDescription = route.meta?.description;
  if (typeof routeDescription === "string") {
    return routeDescription;
  } else {
    return "Veh Shop";
  }
});

onMounted(() => {
  cartStore.initCart();
  settingsStore.initTheme();
  userStore.initSession();
});
</script>
<style></style>
