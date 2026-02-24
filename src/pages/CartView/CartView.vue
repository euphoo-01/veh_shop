<template>
  <v-container class="cart-view fill-height align-start">
    <h1 class="text-h4 font-weight-bold mb-8 w-100">Shopping Cart</h1>

    <div v-if="totalItems > 0" class="w-100">
      <v-row>
        <v-col cols="12" md="8">
          <CartList :items="cartItems" />
        </v-col>
        <v-col cols="12" md="4">
          <CartSummary />
        </v-col>
      </v-row>
    </div>

    <EmptyCart v-else class="w-100" />
  </v-container>
</template>

<script setup lang="ts">
import { useCartStore } from "@/modules/cart/store";
import CartList from "@/modules/cart/components/CartList.vue";
import CartSummary from "@/modules/cart/components/CartSummary.vue";
import EmptyCart from "@/modules/cart/components/EmptyCart.vue";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { cartItems, totalItems } = storeToRefs(cartStore);
</script>

<style scoped></style>
