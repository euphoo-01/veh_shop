<template>
  <main>
    <section class="login__wrapper">
      <Transition name="fade-left"
        ><ErrorBubble v-if="error.status" :error="error" :onCleanup="clearError"
      /></Transition>
      <RegisterForm v-if="isRegistering" @switch-mode="switchFormMode" />
      <LoginForm v-else @login="login" @switch-mode="switchFormMode" />
    </section>
  </main>
</template>
<script>
import ErrorBubble from "@/components/ErrorBubble.vue";
import LoginForm from "@/modules/auth/components/LoginForm.vue";
import RegisterForm from "@/modules/auth/components/RegisterForm.vue";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/modules/user/store";

export default {
  components: { ErrorBubble, LoginForm, RegisterForm },
  data() {
    return {
      isRegistering: false,
    };
  },
  methods: {
    ...mapActions(useUserStore, ["login", "clearError"]),
    switchFormMode() {
      this.isRegistering = !this.isRegistering;
    },
  },
  computed: {
    ...mapState(useUserStore, ["error"]),
  },
};
</script>
