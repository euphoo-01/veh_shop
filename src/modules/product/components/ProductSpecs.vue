<template>
  <v-sheet
    class="product__specs pa-5"
    rounded="0"
    color="surface-light"
    :style="{ '--v-theme-surface': 'transparent' }"
  >
    <v-row dense>
      <v-col cols="6" sm="4" md="3" class="d-flex flex-column ga-1">
        <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis">
          Warranty
        </span>
        <span class="text-body-2">{{ product.warrantyInformation }}</span>
      </v-col>

      <v-col cols="6" sm="4" md="3" class="d-flex flex-column ga-1">
        <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis">
          Shipping
        </span>
        <span class="text-body-2">{{ product.shippingInformation }}</span>
      </v-col>

      <v-col cols="6" sm="4" md="3" class="d-flex flex-column ga-1">
        <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis">
          Return Policy
        </span>
        <span class="text-body-2">{{ product.returnPolicy }}</span>
      </v-col>

      <v-col v-if="product.weight" cols="6" sm="4" md="3" class="d-flex flex-column ga-1">
        <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis">
          Weight
        </span>
        <span class="text-body-2">{{ product.weight }} kg</span>
      </v-col>

      <v-col v-if="product.dimensions" cols="12" sm="8" md="6" class="d-flex flex-column ga-1">
        <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis">
          Dimensions
        </span>
        <span class="text-body-2">
          {{ product.dimensions.width }} x {{ product.dimensions.height }} x
          {{ product.dimensions.depth }}
        </span>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import type { Product } from "@/modules/vehicle/types";
import { toRefs } from "vue";

const props = defineProps<{ product: Product }>();
const { product } = toRefs(props);
</script>

<style scoped></style>
