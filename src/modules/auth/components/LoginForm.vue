<template>
  <ModalUI class="login__form" isStatic>
    <h1 class="login__title">Sign In</h1>
    <InputUI placeholder="Your login:" v-model="user.login" />
    <InputUI placeholder="Your password:" v-model="user.password" type="password" />
    <ButtonUI @click="handleLogin" primary>Login</ButtonUI>
    <span class="form__switcher">
      <p class="switcher__description">Don't have an account yet?</p>
      <a class="switcher__action" @click="$emit('switch-mode')">Register</a>
    </span>
  </ModalUI>
</template>

<script>
import ModalUI from '@/components/ui/ModalUI.vue';
import InputUI from '@/components/ui/InputUI.vue';
import ButtonUI from '@/components/ui/ButtonUI.vue';

export default {
  name: 'LoginForm',
  components: {
    ModalUI,
    InputUI,
    ButtonUI,
  },
  data() {
    return {
      user: {
        login: '',
        password: '',
      },
    };
  },
  methods: {
    handleLogin() {
      this.$emit('login', this.user);
    },
  },
  emits: ['login', 'switch-mode'],
};
</script>

<style scoped>
.login__title {
  text-align: center;
  margin: 16px;
}

.form__switcher .switcher__action,
.form__switcher .switcher__description {
  display: inline-block;
  margin-right: 8px;
}
</style>
