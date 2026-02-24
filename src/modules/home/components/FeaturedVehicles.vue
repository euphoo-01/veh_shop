<template>
  <v-container v-if="vehicles.length" class="py-12">
    <h2 class="text-h4 text-center mb-12 font-weight-bold text-on-background">Featured Vehicles</h2>

    <v-row justify="center">
      <v-col v-for="vehicle in vehicles" :key="vehicle.id" cols="12" sm="6" md="4" lg="3">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            class="h-100 d-flex flex-column align-center pt-6 pb-4"
            variant="outlined"
            :color="isHovering ? 'primary' : 'secondary'"
            :style="{
              borderColor: isHovering
                ? 'rgb(var(--v-theme-primary))'
                : 'rgba(var(--v-theme-secondary), 0.3)',
              backgroundColor: isHovering
                ? 'rgba(var(--v-theme-primary), 0.2)'
                : 'rgb(var(--v-theme-surface))',
            }"
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
                :class="{ 'card-image--hover': isHovering }"
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
        </v-hover>
      </v-col>
    </v-row>

    <div class="d-flex justify-center mt-12">
      <v-hover v-slot="{ isHovering, props }">
        <v-btn
          v-bind="props"
          variant="text"
          color="on-surface"
          size="large"
          class="text-none px-8 secondary-btn"
          rounded="0"
          min-width="150"
          height="50"
          :style="{
            backgroundColor: isHovering ? 'rgba(var(--v-theme-primary), 0.2)' : 'transparent',
            borderBottom: isHovering
              ? '3px solid rgb(var(--v-theme-primary))'
              : '3px solid transparent',
          }"
          @click="goToCatalogue"
        >
          View All
        </v-btn>
      </v-hover>
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
.card-image-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.card-image {
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.card-image--hover {
  transform: scale(1.1);
}

.secondary-btn {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>
