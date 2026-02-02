<template>
  <div class="cart__item cart_item">
    <div class="cart_item__image-container" @click="goToProduct(item.id)">
      <img
        :src="item.thumbnail"
        :alt="item.title"
        class="cart_item__image"
        crossorigin="anonymous"
      />
    </div>

    <div class="cart_item__info">
      <h3 class="cart_item__name" @click="goToProduct(item.id)">{{ item.title }}</h3>
      <p class="cart_item__brand">{{ item.brand }}</p>
      <p class="cart_item__price">{{ item.price }} $</p>
    </div>

    <div class="cart_item__controls">
      <div class="cart_item__quantity-selector">
        <button
          class="cart_item__button"
          @click="updateQuantity({ productId: item.id, quantity: item.quantity - 1 })"
        >
          -
        </button>
        <span class="cart_item__quantity">{{ item.quantity }}</span>
        <button
          class="cart_item__button"
          @click="updateQuantity({ productId: item.id, quantity: item.quantity + 1 })"
        >
          +
        </button>
      </div>
      <button class="cart_item__remove" @click="removeItem(item.id)">Remove</button>
    </div>

    <p class="cart_item__total">{{ (item.price * item.quantity).toFixed(2) }} $</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations('cart', ['removeItem', 'updateQuantity']),
    goToProduct(id) {
      this.$router.push({ name: 'product', params: { id } });
    },
  },
};
</script>

<style scoped>
.cart_item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 16px;
  padding: 16px;
  border: 1px solid color-mix(in srgb, var(--text-color) 10%, transparent);
  background: var(--background-color);
  align-items: center;
}

@media (min-width: 576px) {
  .cart_item {
    grid-template-columns: 120px 1fr auto auto;
    gap: 24px;
  }
}

.cart_item__image-container {
  width: 100px;
  height: 100px;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--text-color) 5%, transparent);
}

.cart_item__image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.cart_item__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cart_item__name {
  margin: 0;
  font-size: 18px;
  cursor: pointer;
}

.cart_item__name:hover {
  color: var(--primary-color);
}

.cart_item__brand {
  font-size: 14px;
  color: var(--secondary-color);
  margin: 0;
}

.cart_item__price {
  font-weight: bold;
  margin: 8px 0 0 0;
}

.cart_item__controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.cart_item__quantity-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid color-mix(in srgb, var(--text-color) 20%, transparent);
  padding: 4px;
}

.cart_item__button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart_item__button:hover {
  color: var(--primary-color);
}

.cart_item__quantity {
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}

.cart_item__remove {
  background: none;
  border: none;
  color: var(--secondary-color);
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}

.cart_item__remove:hover {
  color: var(--error-color);
}

.cart_item__total {
  font-weight: bold;
  font-size: 18px;
  text-align: right;
  min-width: 100px;
}
</style>
