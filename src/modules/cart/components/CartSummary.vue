<template>
  <aside class="cart__summary summary">
    <h2 class="summary__title">Order Summary</h2>
    <div class="summary__row">
      <span>Items ({{ cartStore.totalItems }}):</span>
      <span>{{ cartStore.totalPrice }} $</span>
    </div>
    <div class="summary__row summary__row--total">
      <span>Total:</span>
      <span>{{ cartStore.totalPrice }} $</span>
    </div>
    <ButtonUI primary class="summary__checkout"> Proceed to Checkout </ButtonUI>
    <ButtonUI secondary class="summary__clear" @click="cartStore.clearCart()">
      Clear Cart
    </ButtonUI>
  </aside>
</template>

<script setup lang="ts">
import { useCartStore } from "../store";
import ButtonUI from "@/components/ui/ButtonUI.vue";

const cartStore = useCartStore();
</script>

<style scoped>
.summary {
  background-color: color-mix(in srgb, var(--primary-color) 5%, transparent);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary__title {
  margin: 0;
  font-size: 24px;
}

.summary__row {
  display: flex;
  justify-content: space-between;
}

.summary__row--total {
  border-top: 1px solid color-mix(in srgb, var(--text-color) 10%, transparent);
  padding-top: 16px;
  font-weight: bold;
  font-size: 20px;
}

.summary__checkout {
  width: 100%;
}

.summary__clear {
  width: 100%;
}
</style>
