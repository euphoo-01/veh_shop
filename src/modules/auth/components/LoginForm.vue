<template>
  <v-card
    class="login__form mx-auto pa-4 d-flex flex-column align-center"
    flat
    rounded="0"
    width="100%"
    min-width="250"
    max-width="400"
  >
    <h1 class="text-h4 text-center font-weight-bold mb-4">Sign In</h1>

    <v-form @submit.prevent="handleLogin" class="w-100 d-flex flex-column ga-4">
      <v-text-field
        v-model="user.login"
        label="Your login:"
        variant="underlined"
        color="primary"
        hide-details="auto"
        density="comfortable"
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        label="Your password:"
        type="password"
        variant="underlined"
        color="primary"
        hide-details="auto"
        density="comfortable"
      ></v-text-field>

      <v-btn
        type="submit"
        color="primary"
        block
        flat
        rounded="0"
        height="50"
        class="text-none mt-2"
      >
        Login
      </v-btn>
    </v-form>

    <div class="d-flex align-center mt-4">
      <p class="text-body-2 mr-2 mb-0">Don't have an account yet?</p>
      <a
        class="text-body-2 text-primary font-weight-bold cursor-pointer text-decoration-underline"
        @click="$emit('switch-mode')"
      >
        Register
      </a>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { LoginCredentials } from "@/modules/user/types";

const user = reactive<LoginCredentials>({ login: "", password: "" });
const emit = defineEmits(["login", "switch-mode"]);

function handleLogin() {
  emit("login", user);
}
</script>

<style scoped>
.login__form {
  background-color: rgb(var(--v-theme-background));
}

.cursor-pointer {
  cursor: pointer;
}
</style>
