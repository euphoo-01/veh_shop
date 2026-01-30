<template>
  <TheHeader />
  <RouterView />
</template>
<script>
// TODO: Главная страница
// TODO: Корзина
// TODO: Пагинация
import TheHeader from './app/layout/TheHeader.vue';
import { mapGetters } from 'vuex';
export default {
  components: { TheHeader },
  computed: {
    ...mapGetters({ currentTheme: 'settings/currentTheme' }),
  },
  watch: {
    currentTheme: {
      handler(newTheme) {
        document.documentElement.className = newTheme;
      },
      immediate: true,
    },
  },
};
</script>
<style></style>
