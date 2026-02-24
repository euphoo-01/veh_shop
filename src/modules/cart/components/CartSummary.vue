<template>
  <v-card color="surface-light" variant="tonal" class="pa-4" rounded="0" elevation="0">
    <v-card-title class="text-h5 font-weight-bold pa-0 mb-4 text-high-emphasis">
      Order Summary
    </v-card-title>

    <div class="d-flex flex-column ga-3 text-high-emphasis">
      <div class="d-flex justify-space-between text-body-1">
        <span>Items ({{ totalItems }}):</span>
        <span class="font-weight-medium">{{ totalPrice }} $</span>
      </div>

      <v-divider class="my-2"></v-divider>

      <div class="d-flex justify-space-between text-h6 font-weight-bold">
        <span>Total:</span>
        <span>{{ totalPrice }} $</span>
      </div>

      <v-btn
        color="primary"
        block
        size="large"
        rounded="0"
        height="50"
        elevation="0"
        class="mt-4 text-none"
      >
        Proceed to Checkout
      </v-btn>

      <v-btn
        variant="text"
        color="error"
        block
        rounded="0"
        height="50"
        class="text-none"
        @click="clearCart()"
      >
        Clear Cart
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useCartStore } from "../store";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { totalItems, totalPrice } = storeToRefs(cartStore);
const { clearCart } = cartStore;
</script>

<style scoped></style>
