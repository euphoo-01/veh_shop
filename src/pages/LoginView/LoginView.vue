<template>
  <main>
    <section class="login__wrapper">
      <Transition name="fade-left"
        ><ErrorBubble v-if="error.status" :error="error" :onCleanup="clearError"
      /></Transition>
      <ModalUI class="login__form" static v-if="isRegistering">
        <h1 class="login__title">Sign Up</h1>
        <ErrorBubble
          :error="{
            message:
              'Registration isn\'t available because the API doesn\'t provide such functionality',
          }"
        ></ErrorBubble>
        <InputUI placeholder="Your login:" />
        <InputUI placeholder="Your name:" />
        <InputUI placeholder="Your number:" />
        <InputUI placeholder="Your password:" type="password" />
        <ButtonUI primary>Register</ButtonUI>
        <span class="form__switcher"
          ><p class="switcher__description">Have an account?</p>
          <a class="switcher__action" @click="switchFormMode">Login</a></span
        >
      </ModalUI>
      <ModalUI class="login__form" static v-else>
        <h1 class="login__title">Sign In</h1>
        <InputUI placeholder="Your login:" v-model="user.login" />
        <InputUI placeholder="Your password:" v-model="user.password" type="password" />
        <ButtonUI @click="login(user)" primary>Login</ButtonUI>
        <span class="form__switcher"
          ><p class="switcher__description">Don't have an account yet?</p>
          <a class="switcher__action" @click="switchFormMode">Register</a></span
        >
      </ModalUI>
    </section>
  </main>
</template>
<script>
import ModalUI from '@/components/ui/ModalUI.vue';
import InputUI from '@/components/ui/InputUI.vue';
import ButtonUI from '@/components/ui/ButtonUI.vue';
import ErrorBubble from '@/components/ErrorBubble.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  components: { ModalUI, InputUI, ButtonUI, ErrorBubble },
  data() {
    return {
      isRegistering: false,
      user: {
        login: '',
        password: '',
      },
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
<style>
.login__title {
  text-align: center;
  margin: 16px;
}

.form__switcher .switcher__action,
.form__switcher .switcher__description {
  display: inline-block;
  margin: 8px;
}
</style>
