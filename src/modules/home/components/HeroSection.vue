<template>
  <section class="hero">
    <div class="hero__content">
      <h1 class="hero__title">Find Your Dream Ride</h1>
      <p class="hero__subtitle">Explore our premium collection of vehicles and motorcycles.</p>
      <ButtonUI primary @click="goToCatalogue"> Shop Now </ButtonUI>
    </div>
    <div class="hero__image_container">
      <img
        src="@/app/assets/home_banner.webp"
        alt="Home Banner"
        class="hero__image"
        fetchpriority="high"
      />
    </div>
  </section>
</template>

<script>
import ButtonUI from '@/components/ui/ButtonUI.vue';

export default {
  name: 'HeroSection',
  components: {
    ButtonUI,
  },
  methods: {
    goToCatalogue() {
      this.$router.push({ name: 'catalogue' });
    },
  },
};
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 48px 0;
  min-height: 400px;
}

.hero__content {
  flex: 1;
  max-width: 550px;
}

.hero__title {
  margin-bottom: 24px;
  line-height: 1.1;
}

.hero__subtitle {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 32px;
  color: var(--secondary-color);
  max-width: 450px;
}

.hero__image_container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.hero__image {
  width: 100%;
  max-width: 850px;
}

@media (max-width: 1024px) {
  .hero {
    flex-direction: column-reverse;
    text-align: center;
    gap: 40px;
  }

  .hero__content {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .hero__subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .hero__image_container {
    justify-content: center;
  }
}
</style>
