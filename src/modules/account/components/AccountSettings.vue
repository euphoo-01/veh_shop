<template>
  <div class="account__settings info__column">
    <h3 class="settings__title">Settings</h3>
    <label for="select-theme">Change theme:</label>
    <SelectUI placeholder="Change theme:" name="select-theme" v-model="theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </SelectUI>
    <ButtonUI class="settings__logout" @click="logout" primary>Log Out</ButtonUI>
  </div>
</template>

<script>
import ButtonUI from "@/components/ui/ButtonUI.vue";
import SelectUI from "@/components/ui/SelectUI.vue";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/modules/user/store";
import { useSettingsStore } from "@/modules/settings/store";

export default {
  name: "AccountSettings",
  components: {
    ButtonUI,
    SelectUI,
  },
  computed: {
    ...mapState(useSettingsStore, ["currentTheme"]),
    theme: {
      get() {
        return this.currentTheme;
      },
      set(value) {
        this.setTheme(value);
      },
    },
  },
  methods: {
    ...mapActions(useUserStore, ["logout"]),
    ...mapActions(useSettingsStore, ["setTheme"]),
  },
};
</script>

<style scoped>
.info__column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  margin-bottom: 16px;
  line-height: 1;
  min-width: fit-content;
}

.account__settings {
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  gap: 16px;
  flex: 1;
  background-color: color-mix(in srgb, var(--secondary-color) 10%, var(--background-color));
  height: 100vh;
  padding: 16px;
  height: auto;
  margin-left: 16px;
}
</style>
