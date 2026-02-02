<template>
  <header>
    <div class="header__container">
      <img src="@/app/assets/logo.png" alt="Logo" class="header__logo" />
      <h1>Veh Shop</h1>
    </div>

    <TheNavigation />
  </header>
</template>
<script>
import TheNavigation from '@/widgets/TheNavigation.vue';
export default {
  components: { TheNavigation },
};
</script>
<style>
header {
  display: flex;
  align-items: row nowrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.header__container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 32px;
}
.header__logo {
  max-width: 128px;
}
@media (max-width: 768px) {
  .header__logo {
    max-width: 64px;
  }
}
</style>
