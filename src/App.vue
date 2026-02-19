<template>
  <v-app>
    <Teleport to="head">
      <meta name="description" :content="$route.meta?.description || 'Veh Shop'" />
    </Teleport>
    <TheHeader />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import TheHeader from "./app/layout/TheHeader.vue";
import store from "./app/config/store";
import { useUserStore } from "./modules/user/store/userStore";

const userStore = useUserStore();
onMounted(() => {
  store.dispatch("cart/initCart");
  store.dispatch("settings/initTheme");
  userStore.initSession();
});
</script>
<style></style>
