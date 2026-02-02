<template>
  <div class="product__specs specs">
    <div class="specs__item">
      <span class="specs__label">Warranty</span>
      <span class="specs__value">{{ product.warrantyInformation }}</span>
    </div>
    <div class="specs__item">
      <span class="specs__label">Shipping</span>
      <span class="specs__value">{{ product.shippingInformation }}</span>
    </div>
    <div class="specs__item">
      <span class="specs__label">Return Policy</span>
      <span class="specs__value">{{ product.returnPolicy }}</span>
    </div>
    <div class="specs__item" v-if="product.weight">
      <span class="specs__label">Weight</span>
      <span class="specs__value">{{ product.weight }} kg</span>
    </div>
    <div class="specs__item" v-if="product.dimensions">
      <span class="specs__label">Dimensions</span>
      <span class="specs__value">
        {{ product.dimensions.width }} x {{ product.dimensions.height }} x
        {{ product.dimensions.depth }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductSpecs',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.specs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  background-color: color-mix(in srgb, var(--primary-color) 5%, transparent);
  padding: 20px;
}

.specs__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.specs__label {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--secondary-color);
  font-weight: 700;
}

.specs__value {
  font-size: 15px;
}
</style>
