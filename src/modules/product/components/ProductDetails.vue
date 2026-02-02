<template>
  <section class="product__details details">
    <div class="details__header">
      <span class="details__brand" v-if="product.brand">{{ product.brand }}</span>
      <h1 class="details__title">{{ product.title }}</h1>
      <div class="details__meta">
        <div class="details__rating" v-if="product.rating">
          <span>★ {{ product.rating }}</span>
        </div>
        <span class="details__sku">SKU: {{ product.sku }}</span>
        <span
          class="details__stock"
          :class="{ 'details__stock--in-stock': product.stock > 0 }"
        >
          {{ product.availabilityStatus }}
        </span>
      </div>
    </div>

    <div class="details__price-row">
      <h2 class="details__price">{{ product.price }} $</h2>
      <span v-if="product.discountPercentage" class="details__discount">
        -{{ product.discountPercentage }}%
      </span>
    </div>

    <div class="details__description">
      <p>{{ product.description }}</p>
    </div>

    <div class="details__actions">
      <ButtonUI
        primary
        @click="$emit('add-to-cart')"
        :disabled="product.stock <= 0"
        class="details__actions_button"
      >
        Add to Cart
      </ButtonUI>
    </div>

    <ProductSpecs :product="product" />
  </section>
</template>

<script>
import ButtonUI from '@/components/ui/ButtonUI.vue';
import ProductSpecs from './ProductSpecs.vue';

export default {
  name: 'ProductDetails',
  components: {
    ButtonUI,
    ProductSpecs,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  emits: ['add-to-cart'],
};
</script>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.details__brand {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary-color);
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 8px;
}

.details__title {
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 700;
}

@media (min-width: 768px) {
  .details__title {
    font-size: 40px;
    line-height: 1.1;
  }
}

.details__meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 12px;
  font-size: 15px;
}

.details__rating {
  background-color: #f1c40f;
  color: #fff;
  padding: 4px 8px;
  font-weight: bold;
}

.details__sku {
  color: var(--secondary-color);
}

.details__stock {
  color: var(--error-color);
  font-weight: 500;
}

.details__stock--in-stock {
  color: #27ae60;
}

.details__price-row {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.details__price {
  margin: 0;
  font-size: 24px;
  color: var(--primary-color);
}

@media (min-width: 768px) {
  .details__price {
    font-size: 32px;
  }
}

.details__discount {
  background-color: var(--error-color);
  color: white;
  padding: 4px 8px;
  font-size: 15px;
  font-weight: bold;
}

.details__description {
  line-height: 1.6;
  color: var(--text-color);
}

.details__actions_button {
  width: 100%;
}

@media (min-width: 768px) {
  .details__actions_button {
    width: fit-content;
  }
}
</style>
