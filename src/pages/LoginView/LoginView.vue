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
import ErrorBubble from '@/components/ErrorBubble.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import LoginForm from '@/modules/auth/components/LoginForm.vue';
import RegisterForm from '@/modules/auth/components/RegisterForm.vue';

export default {
  components: { ErrorBubble, LoginForm, RegisterForm },
  data() {
    return {
      isRegistering: false,
    };
  },
  methods: {
    ...mapActions({ login: 'user/login' }),
    ...mapMutations({ clearError: 'user/clearError' }),
    switchFormMode() {
      this.isRegistering = !this.isRegistering;
    },
  },
  computed: {
    ...mapGetters({ error: 'user/error' }),
  },
};
</script>
