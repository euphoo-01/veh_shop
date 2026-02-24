<template>
  <v-container
    fluid
    class="fill-height d-flex flex-column align-center justify-center login__wrapper pa-0"
  >
    <v-fade-transition hide-on-leave>
      <v-alert
        v-if="error && error.status"
        :title="`Error ${error.status}`"
        :text="error.message ?? ''"
        type="error"
        variant="tonal"
        closable
        @click:close="clearError"
        class="mb-8 w-100"
        max-width="600"
        rounded="0"
        density="comfortable"
      ></v-alert>
    </v-fade-transition>

    <v-fade-transition mode="out-in">
      <RegisterForm v-if="isRegistering" @switch-mode="switchFormMode" />
      <LoginForm v-else @login="login" @switch-mode="switchFormMode" />
    </v-fade-transition>
  </v-container>
</template>

<script setup lang="ts">
import LoginForm from "@/modules/auth/components/LoginForm.vue";
import RegisterForm from "@/modules/auth/components/RegisterForm.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/modules/user/store";
import { ref, onUnmounted } from "vue";

const userStore = useUserStore();

const { error } = storeToRefs(userStore);
const { clearError, login } = userStore;
const isRegistering = ref<boolean>(false);

function switchFormMode() {
  isRegistering.value = !isRegistering.value;
}

onUnmounted(() => {
  if (error.value) {
    clearError();
  }
});
</script>

<style scoped>
.login__wrapper {
  background-color: rgb(var(--v-theme-background));
}
</style>
