<template>
  <main class="home">
    <HeroSection />
    <FeaturedVehicles :vehicles="featuredVehicles" />
    <CustomerReviews :reviews="reviews" />
  </main>
</template>

<script>
import HeroSection from '@/modules/home/components/HeroSection.vue';
import FeaturedVehicles from '@/modules/home/components/FeaturedVehicles.vue';
import CustomerReviews from '@/modules/home/components/CustomerReviews.vue';
import { networker } from '@/services/api';
import { getVehiclesPreview } from '@/services/api/vehicles';
import { getReviews } from '@/services/api/reviews';

export default {
  components: {
    HeroSection,
    FeaturedVehicles,
    CustomerReviews,
  },
  data() {
    return {
      featuredVehicles: [],
      reviews: [],
    };
  },
  async mounted() {
    try {
      const vehiclesData = await getVehiclesPreview(networker, 3);
      if (vehiclesData && vehiclesData.products) {
        this.featuredVehicles = vehiclesData.products;
      }

      const reviewsData = await getReviews(networker);
      if (reviewsData && reviewsData.quotes) {
        this.reviews = reviewsData.quotes;
      }
    } catch (error) {
      console.error('Failed to load home data:', error);
    }
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-bottom: 120px;
}

@media (max-width: 768px) {
  .home {
    gap: 60px;
  }
}
</style>
