<template>
  <aside class="cart__summary summary">
    <h2 class="summary__title">Order Summary</h2>
    <div class="summary__row">
      <span>Items ({{ cartItemCount }}):</span>
      <span>{{ cartTotal }} $</span>
    </div>
    <div class="summary__row summary__row--total">
      <span>Total:</span>
      <span>{{ cartTotal }} $</span>
    </div>
    <ButtonUI primary class="summary__checkout"> Proceed to Checkout </ButtonUI>
    <ButtonUI secondary class="summary__clear" @click="clearCart"> Clear Cart </ButtonUI>
  </aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import ButtonUI from '@/components/ui/ButtonUI.vue';

export default {
  name: 'CartSummary',
  components: {
    ButtonUI,
  },
  computed: {
    ...mapGetters('cart', ['cartTotal', 'cartItemCount']),
  },
  methods: {
    ...mapMutations('cart', ['clearCart']),
  },
};
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
