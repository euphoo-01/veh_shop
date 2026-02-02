<template>
  <section class="featured" v-if="vehicles.length">
    <h2 class="featured__title">Featured Vehicles</h2>
    <div class="featured__grid">
      <div
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        class="featured__card"
        @click="goToProductCard(vehicle.id)"
      >
        <div class="card__image_wrapper">
          <img
            :src="vehicle.thumbnail"
            :alt="vehicle.title"
            class="card__image"
            crossorigin="anonymous"
          />
        </div>
        <h2 class="card__title">{{ vehicle.title }}</h2>
        <h2 class="card__price">
          <b>${{ vehicle.price }}</b>
        </h2>
      </div>
    </div>
    <div class="featured__action">
      <ButtonUI secondary @click="goToCatalogue"> View All </ButtonUI>
    </div>
  </section>
</template>

<script>
import ButtonUI from '@/components/ui/ButtonUI.vue';

export default {
  name: 'FeaturedVehicles',
  components: {
    ButtonUI,
  },
  props: {
    vehicles: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goToProductCard(id) {
      this.$router.push({ name: 'product', params: { id } });
    },
    goToCatalogue() {
      this.$router.push({ name: 'catalogue' });
    },
  },
};
</script>

<style scoped>
.featured__title {
  text-align: center;
  margin-bottom: 48px;
  position: relative;
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.featured__card {
  background-color: var(--background-color);
  border: 1px solid color-mix(in srgb, var(--secondary-color) 30%, transparent);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured__card:hover {
  background-color: color-mix(in srgb, var(--primary-color) 20%, transparent);
  border-color: var(--primary-color);
  cursor: pointer;
}

.card__image_wrapper {
  width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 24px;
  background-color: transparent;
}

.card__image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  transform: scale(1.5);
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.card__title {
  text-align: center;
}

.card__price {
  color: var(--primary-color);
}

.featured__action {
  margin-top: 48px;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .featured__grid {
    grid-template-columns: 1fr;
  }
}
</style>
