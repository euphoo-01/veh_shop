<template>
  <v-card
    class="login__form mx-auto pa-4 d-flex flex-column align-center"
    flat
    rounded="0"
    width="100%"
    min-width="250"
    max-width="400"
  >
    <h1 class="text-h4 text-center font-weight-bold mb-4">Sign Up</h1>

    <v-alert
      type="error"
      variant="tonal"
      class="mb-4 w-100 text-body-2"
      density="compact"
      rounded="0"
    >
      Registration isn't available because the API doesn't provide such functionality
    </v-alert>

    <v-form @submit.prevent="emit('register', user)" class="w-100 d-flex flex-column ga-4">
      <v-text-field
        v-model="user.login"
        label="Your login:"
        variant="underlined"
        color="primary"
        hide-details="auto"
        density="comfortable"
      ></v-text-field>

      <v-text-field
        v-model="user.username"
        label="Your name:"
        variant="underlined"
        color="primary"
        hide-details="auto"
        density="comfortable"
      ></v-text-field>

      <v-text-field
        v-model="user.phone"
        label="Your number:"
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
        Register
      </v-btn>
    </v-form>

    <div class="d-flex align-center mt-4">
      <p class="text-body-2 mr-2 mb-0">Have an account?</p>
      <a
        class="text-body-2 text-primary font-weight-bold cursor-pointer text-decoration-underline"
        @click="$emit('switch-mode')"
      >
        Login
      </a>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { RegisterCredentials } from "@/modules/user/types";
import { reactive } from "vue";

const user = reactive<RegisterCredentials>({
  login: "",
  username: "",
  phone: "",
  password: "",
});
const emit = defineEmits(["switch-mode", "register"]);
</script>

<style scoped>
.login__form {
  background-color: rgb(var(--v-theme-background));
}

.cursor-pointer {
  cursor: pointer;
}
</style>
