<template>
  <main>
    <section class="login__wrapper">
      <Transition name="fade-left"
        ><ErrorBubble v-if="error.status" :error="error" :onCleanup="userStore.clearError"
      /></Transition>
      <RegisterForm v-if="isRegistering" @switch-mode="switchFormMode" />
      <LoginForm v-else @login="userStore.login" @switch-mode="switchFormMode" />
    </section>
  </main>
</template>
<script setup lang="ts">
import ErrorBubble from "@/components/ErrorBubble.vue";
import LoginForm from "@/modules/auth/components/LoginForm.vue";
import RegisterForm from "@/modules/auth/components/RegisterForm.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/modules/user/store";
import { ref } from "vue";

const userStore = useUserStore();

const { error } = storeToRefs(userStore);
const isRegistering = ref<boolean>(false);

function switchFormMode() {
  isRegistering.value = !isRegistering.value;
}
</script>
