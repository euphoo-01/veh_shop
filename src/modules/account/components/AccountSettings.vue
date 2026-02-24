<template>
  <v-sheet
    class="account__settings pa-4 d-flex flex-column h-100 ml-4 justify-space-between"
    width="auto"
    rounded="0"
    :style="{
      backgroundColor:
        'color-mix(in srgb, rgb(var(--v-theme-secondary)) 10%, rgb(var(--v-theme-background)))',
      maxWidth: 'fit-content',
    }"
  >
    <div class="d-flex flex-column ga-4">
      <h3 class="text-h6 font-weight-bold mb-0">Settings</h3>

      <v-select
        v-model="theme"
        :items="themes"
        label="Change theme:"
        variant="underlined"
        color="primary"
        density="compact"
        hide-details="auto"
        class="mt-2"
        min-width="200"
      ></v-select>
    </div>

    <v-btn color="primary" @click="logout" rounded="0" height="50" elevation="0" class="text-none">
      Log Out
    </v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import { useUserStore } from "@/modules/user/store";
import { useSettingsStore } from "@/modules/settings/store";
import { computed } from "vue";

const userStore = useUserStore();
const settingsStore = useSettingsStore();

const { logout } = userStore;

const themes = [
  { title: "Light", value: "light" },
  { title: "Dark", value: "dark" },
];

const theme = computed({
  get() {
    return settingsStore.currentTheme as string;
  },
  set(value: string) {
    if (value === "light" || value === "dark") {
      settingsStore.setTheme(value);
    }
  },
});
</script>

<style scoped></style>
