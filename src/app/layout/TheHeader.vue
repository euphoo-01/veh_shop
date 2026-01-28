<template>
  <header>
    <h1>Veh Shop</h1>
    <TheNavigation />
  </header>
</template>
<script>
import TheNavigation from '@/widgets/TheNavigation.vue';
export default {
  components: { TheNavigation },
};
</script>
<style scoped>
header {
  display: flex;
  align-items: row nowrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
</style>
