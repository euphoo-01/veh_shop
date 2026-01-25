<template>
  <TheHeader />
  <RouterView />
</template>
<script>
import TheHeader from './app/layout/TheHeader.vue';
export default {
  components: { TheHeader },
};
</script>
<style></style>
