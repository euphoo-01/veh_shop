<template>
  <v-container class="py-12">
    <v-row align="center" justify="space-between" class="flex-column-reverse flex-md-row">
      <v-col cols="12" md="6" class="text-center text-md-left">
        <h1 class="text-h2 font-weight-bold mb-6 text-on-background">Find Your Dream Ride</h1>
        <p
          class="text-h5 text-secondary mb-8 mx-auto mx-md-0"
          style="line-height: 1.6; max-width: 450px"
        >
          Explore our premium collection of vehicles and motorcycles.
        </p>
        <v-btn
          color="primary"
          size="x-large"
          class="text-none px-8 hero-btn"
          flat
          rounded="0"
          min-width="150"
          height="50"
          @click="goToCatalogue"
        >
          Shop Now
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center justify-md-end mb-8 mb-md-0">
        <v-img :src="homeBanner" alt="Home Banner" max-width="850" width="100%" eager></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import homeBanner from "@/app/assets/home_banner.webp";

const router = useRouter();

function goToCatalogue() {
  router.push({ name: "catalogue" });
}
</script>

<style scoped>
.hero-btn {
  transition: background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.hero-btn:hover {
  background-color: rgb(var(--v-theme-secondary)) !important;
}
</style>
