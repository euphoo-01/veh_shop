<template>
  <main class="account">
    <Transition name="fade-left"
      ><ErrorBubble
        v-if="error.message"
        :error="error"
        :onCleanup="userStore.clearError"
      ></ErrorBubble
    ></Transition>
    <h1 class="account_title">Account</h1>
    <IconSVG v-if="isLoading" class="account__spinner" of="spinner" size="extralarge" />

    <section v-else class="account__container">
      <AccountDetails :user />
      <AccountSettings />
    </section>
  </main>
</template>
<script setup lang="ts">
import IconSVG from "@/components/IconSVG.vue";
import ErrorBubble from "@/components/ErrorBubble.vue";
import AccountDetails from "@/modules/account/components/AccountDetails.vue";
import AccountSettings from "@/modules/account/components/AccountSettings.vue";
import { useUserStore } from "@/modules/user/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const userStore = useUserStore();

const { error, user, isLoading } = storeToRefs(userStore);

onMounted(async () => {
  await userStore.getDetailedUserData();
});
</script>
<style>
.account__container {
  display: flex;
  position: relative;
  height: 100%;
  flex-flow: row wrap;
  justify-content: center;
}
.account__spinner {
  margin: 64px auto;
  display: block;
  width: fit-content;
}
</style>
