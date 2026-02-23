<template>
  <div class="home-view d-flex flex-column" style="gap: 80px; padding-bottom: 120px">
    <HeroSection />
    <FeaturedVehicles :vehicles="featuredVehicles" />
    <CustomerReviews :reviews="reviews" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useHomeStore } from "@/modules/home/store";
import HeroSection from "@/modules/home/components/HeroSection.vue";
import FeaturedVehicles from "@/modules/home/components/FeaturedVehicles.vue";
import CustomerReviews from "@/modules/home/components/CustomerReviews.vue";
import { onMounted } from "vue";

const homeStore = useHomeStore();

const { featuredVehicles, reviews } = storeToRefs(homeStore);
const { fetchHomeData } = homeStore;

onMounted(async () => {
  await fetchHomeData();
});
</script>

<style scoped>
@media (max-width: 768px) {
  .home-view {
    gap: 60px !important;
  }
}
</style>
