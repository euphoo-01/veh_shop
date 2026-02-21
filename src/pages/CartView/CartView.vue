<template>
  <h1 class="cart__title">Shopping Cart</h1>
  <main class="cart">
    <div v-if="cartStore.totalItems > 0" class="cart__container">
      <CartList :items="cartStore.cartItems" />
      <CartSummary />
    </div>

    <EmptyCart v-else />
  </main>
</template>

<script setup lang="ts">
import { useCartStore } from "@/modules/cart/store";
import CartList from "@/modules/cart/components/CartList.vue";
import CartSummary from "@/modules/cart/components/CartSummary.vue";
import EmptyCart from "@/modules/cart/components/EmptyCart.vue";

const cartStore = useCartStore();
</script>

<style scoped>
.cart {
  padding: 24px;
}

.cart__title {
  margin-bottom: 32px;
}

.cart__container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 992px) {
  .cart__container {
    grid-template-columns: 1fr 350px;
    align-items: start;
  }
}
</style>
