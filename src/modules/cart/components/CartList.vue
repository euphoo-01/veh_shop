<template>
  <div class="cart__list">
    <CartItem v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<script>
import CartItem from './CartItem.vue';

export default {
  name: 'CartList',
  components: {
    CartItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.cart__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
