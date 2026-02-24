<template>
  <div class="product__details details d-flex flex-column ga-6">
    <div class="details__header">
      <div v-if="product.brand" class="text-overline font-weight-bold text-medium-emphasis mb-2">
        {{ product.brand }}
      </div>

      <h1 class="text-h4 font-weight-bold mb-3">{{ product.title }}</h1>

      <div class="details__meta d-flex align-center flex-wrap ga-4 text-body-2">
        <div v-if="product.rating" class="d-flex align-center">
          <v-chip color="warning" label size="small" class="font-weight-bold px-2">
            ★ {{ product.rating }}
          </v-chip>
        </div>

        <span class="text-medium-emphasis">SKU: {{ product.sku }}</span>

        <span class="font-weight-medium" :class="product.stock > 0 ? 'text-success' : 'text-error'">
          {{ product.availabilityStatus }}
        </span>
      </div>
    </div>

    <div class="details__price-row d-flex align-baseline ga-4">
      <h2 class="text-h4 text-primary font-weight-bold">{{ product.price }} $</h2>
      <v-chip v-if="product.discountPercentage" color="error" label size="small" variant="flat">
        -{{ product.discountPercentage }}%
      </v-chip>
    </div>

    <div class="details__description">
      <p class="text-body-1">{{ product.description }}</p>
    </div>

    <div class="details__actions">
      <v-btn
        color="primary"
        size="large"
        block
        :disabled="product.stock <= 0"
        @click="emit('add-to-cart')"
        rounded="0"
        height="50"
        elevation="0"
        class="text-none"
      >
        Add to Cart
      </v-btn>
    </div>

    <ProductSpecs :product="product" />
  </div>
</template>

<script setup lang="ts">
import ProductSpecs from "./ProductSpecs.vue";
import type { Product } from "@/modules/vehicle/types";
import { toRefs } from "vue";

const props = defineProps<{ product: Product }>();
const emit = defineEmits(["add-to-cart"]);

const { product } = toRefs(props);
</script>

<style scoped>
@media (min-width: 768px) {
  .text-h4 {
    font-size: 2.5rem;
  }
}
</style>
