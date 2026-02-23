<template>
  <v-container v-if="vehicles.length" class="py-12">
    <h2 class="text-h4 text-center mb-12 font-weight-bold text-on-background">Featured Vehicles</h2>

    <v-row justify="center">
      <v-col v-for="vehicle in vehicles" :key="vehicle.id" cols="12" sm="6" md="4" lg="3">
        <v-card
          class="h-100 d-flex flex-column align-center pt-6 pb-4 featured-card"
          variant="outlined"
          @click="goToProductCard(vehicle.id)"
          link
          :ripple="false"
        >
          <div class="card-image-wrapper mb-4">
            <v-img
              :src="vehicle.thumbnail"
              :alt="vehicle.title"
              height="200"
              width="100%"
              class="card-image"
            ></v-img>
          </div>

          <v-card-title
            class="text-center text-wrap pt-0 pb-2 text-body-1 font-weight-bold text-on-surface"
          >
            {{ vehicle.title }}
          </v-card-title>

          <v-card-text class="text-h6 font-weight-bold pt-0 text-primary">
            ${{ vehicle.price }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div class="d-flex justify-center mt-12">
      <v-btn
        variant="text"
        color="on-surface"
        size="large"
        class="text-none px-8 secondary-btn"
        rounded="0"
        min-width="150"
        height="50"
        @click="goToCatalogue"
      >
        View All
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import type { Product, ProductPreview } from "@/modules/vehicle/types";
import { toRefs } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = withDefaults(defineProps<{ vehicles: ProductPreview<Product>[] }>(), {
  vehicles: () => [],
});
const { vehicles } = toRefs(props);

function goToProductCard(id: Product["id"]) {
  router.push({ name: "product", params: { id } });
}
function goToCatalogue() {
  router.push({ name: "catalogue" });
}
</script>

<style scoped>
.featured-card {
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  border-color: rgba(var(--v-theme-secondary), 0.3) !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-card:hover {
  background-color: rgba(var(--v-theme-primary), 0.2);
  border-color: rgb(var(--v-theme-primary)) !important;
  cursor: pointer;
}

.card-image-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.card-image {
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.featured-card:hover .card-image {
  transform: scale(1.1);
}

.secondary-btn {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.secondary-btn:hover {
  background-color: rgba(var(--v-theme-primary), 0.2);
  border-bottom: 3px solid rgb(var(--v-theme-primary));
}
</style>
