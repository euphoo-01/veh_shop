<template>
  <ModalUI class="login__form" isStatic>
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
    <span class="form__switcher">
      <p class="switcher__description">Have an account?</p>
      <a class="switcher__action" @click="$emit('switch-mode')">Login</a>
    </span>
  </ModalUI>
</template>

<script>
import ModalUI from '@/components/ui/ModalUI.vue';
import InputUI from '@/components/ui/InputUI.vue';
import ButtonUI from '@/components/ui/ButtonUI.vue';
import ErrorBubble from '@/components/ErrorBubble.vue';

export default {
  name: 'RegisterForm',
  components: {
    ModalUI,
    InputUI,
    ButtonUI,
    ErrorBubble,
  },
  emits: ['switch-mode'],
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
