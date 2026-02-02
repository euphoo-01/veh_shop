<template>
  <h1 class="cart__title">Shopping Cart</h1>
  <main class="cart">
    <div v-if="cartItems.length > 0" class="cart__container">
      <CartList :items="cartItems" />
      <CartSummary />
    </div>

    <EmptyCart v-else />
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import CartList from '@/modules/cart/components/CartList.vue';
import CartSummary from '@/modules/cart/components/CartSummary.vue';
import EmptyCart from '@/modules/cart/components/EmptyCart.vue';

export default {
  components: {
    CartList,
    CartSummary,
    EmptyCart,
  },
  computed: {
    ...mapGetters('cart', ['cartItems']),
  },
};
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
