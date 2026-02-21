<template>
  <main class="home">
    <HeroSection />
    <FeaturedVehicles :vehicles="featuredVehicles" />
    <CustomerReviews :reviews="reviews" />
  </main>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useHomeStore } from "@/modules/home/store";
import HeroSection from "@/modules/home/components/HeroSection.vue";
import FeaturedVehicles from "@/modules/home/components/FeaturedVehicles.vue";
import CustomerReviews from "@/modules/home/components/CustomerReviews.vue";

export default {
  components: {
    HeroSection,
    FeaturedVehicles,
    CustomerReviews,
  },
  computed: {
    ...mapState(useHomeStore, ["featuredVehicles", "reviews", "isLoading"]),
  },
  methods: {
    ...mapActions(useHomeStore, ["fetchHomeData"]),
  },
  async mounted() {
    await this.fetchHomeData();
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
