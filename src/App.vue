<template>
  <Teleport to="head">
    <meta name="description" :content="$route.meta.description || 'Veh Shop'" />
  </Teleport>
  <TheHeader />
  <RouterView />
</template>
<script>
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
  async created() {
    await this.$store.dispatch('user/initSession');
    this.$store.dispatch('cart/initCart');
    this.$store.dispatch('settings/initTheme');
  },
};
</script>
<style></style>
