<template>
  <main class="account">
    <Transition name="fade-left"
      ><ErrorBubble v-if="error.message" :error="error" :onCleanup="clearError"></ErrorBubble
    ></Transition>
    <h1 class="account_title">Account</h1>
    <IconSVG v-if="isLoading" class="account__spinner" of="spinner" size="extralarge" />

    <section v-else class="account__container">
      <AccountDetails :userData="userData" />
      <AccountSettings />
    </section>
  </main>
</template>
<script>
import IconSVG from "@/components/IconSVG.vue";
import ErrorBubble from "@/components/ErrorBubble.vue";
import AccountDetails from "@/modules/account/components/AccountDetails.vue";
import AccountSettings from "@/modules/account/components/AccountSettings.vue";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/modules/user/store/userStore";

export default {
  components: { ErrorBubble, IconSVG, AccountDetails, AccountSettings },
  methods: {
    ...mapActions(useUserStore, ["getDetailedUserData", "clearError"]),
  },
  computed: {
    ...mapState(useUserStore, {
      error: "error",
      userData: "user",
      isLoading: "isLoading",
    }),
  },
  async mounted() {
    await this.getDetailedUserData();
  },
};
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
