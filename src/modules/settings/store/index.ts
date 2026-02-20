import { defineStore } from "pinia";
import type { Theme } from "../types";
import { ref } from "vue";

const themes: Theme[] = ["light", "dark"];

function isTheme(theme: unknown): theme is Theme {
  return themes.includes(theme as Theme);
}

export const useSettingsStore = defineStore("settings", () => {
  const currentTheme = ref<Theme>("light");

  function setTheme(value: Theme) {
    currentTheme.value = value;
    localStorage.setItem("currentTheme", value);
  }

  function initTheme() {
    const saved = localStorage.getItem("currentTheme");

    if (saved && isTheme(saved)) {
      currentTheme.value = saved;
    } else {
      currentTheme.value = "light";
    }
  }

  return {
    currentTheme,
    setTheme,
    initTheme,
  };
});
