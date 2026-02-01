<template>
  <main class="product">
    <IconSVG v-if="isLoading" class="product__loader" of="spinner" size="extralarge" />

    <div v-else-if="currentProduct" class="product__container">
      <section class="product__gallery gallery">
        <div class="gallery__main">
          <img :src="displayedImage" :alt="currentProduct.title" class="gallery__image" />
        </div>
        <div class="gallery__list" v-if="currentProduct.images && currentProduct.images.length > 1">
          <img
            v-for="(img, index) in currentProduct.images"
            :key="index"
            :src="img"
            class="gallery__thumbnail"
            :class="{ 'gallery__thumbnail--active': img === displayedImage }"
            @click="selectedImage = img"
            :alt="`${currentProduct.title} view ${index + 1}`"
          />
        </div>
      </section>

      <section class="product__details details">
        <div class="details__header">
          <span class="details__brand" v-if="currentProduct.brand">{{ currentProduct.brand }}</span>
          <h1 class="details__title">{{ currentProduct.title }}</h1>
          <div class="details__meta">
            <div class="details__rating" v-if="currentProduct.rating">
              <span>★ {{ currentProduct.rating }}</span>
            </div>
            <span class="details__sku">SKU: {{ currentProduct.sku }}</span>
            <span
              class="details__stock"
              :class="{ 'details__stock--in-stock': currentProduct.stock > 0 }"
            >
              {{ currentProduct.availabilityStatus }}
            </span>
          </div>
        </div>

        <div class="details__price-row">
          <h2 class="details__price">{{ currentProduct.price }} $</h2>
          <span v-if="currentProduct.discountPercentage" class="details__discount">
            -{{ currentProduct.discountPercentage }}%
          </span>
        </div>

        <div class="details__description">
          <p>{{ currentProduct.description }}</p>
        </div>

        <div class="details__actions">
          <ButtonUI primary @click="addToCart" :disabled="currentProduct.stock <= 0">
            Add to Cart
          </ButtonUI>
        </div>

        <div class="product__specs specs">
          <div class="specs__item">
            <span class="specs__label">Warranty</span>
            <span class="specs__value">{{ currentProduct.warrantyInformation }}</span>
          </div>
          <div class="specs__item">
            <span class="specs__label">Shipping</span>
            <span class="specs__value">{{ currentProduct.shippingInformation }}</span>
          </div>
          <div class="specs__item">
            <span class="specs__label">Return Policy</span>
            <span class="specs__value">{{ currentProduct.returnPolicy }}</span>
          </div>
          <div class="specs__item" v-if="currentProduct.weight">
            <span class="specs__label">Weight</span>
            <span class="specs__value">{{ currentProduct.weight }} kg</span>
          </div>
          <div class="specs__item" v-if="currentProduct.dimensions">
            <span class="specs__label">Dimensions</span>
            <span class="specs__value">
              {{ currentProduct.dimensions.width }} x {{ currentProduct.dimensions.height }} x
              {{ currentProduct.dimensions.depth }}
            </span>
          </div>
        </div>
      </section>

      <section
        class="product__reviews reviews"
        v-if="currentProduct.reviews && currentProduct.reviews.length"
      >
        <h3 class="reviews__title">Customer Reviews</h3>
        <div class="reviews__list">
          <div
            v-for="(review, index) in currentProduct.reviews"
            :key="index"
            class="reviews__card review"
          >
            <div class="review__header">
              <span class="review__author">{{ review.reviewerName }}</span>
              <span class="review__date">{{ formatDate(review.date) }}</span>
            </div>
            <div class="review__rating">
              <span
                v-for="n in 5"
                :key="n"
                class="review__star"
                :class="{ 'review__star--filled': n <= review.rating }"
                >★</span
              >
            </div>
            <p class="review__comment">{{ review.comment }}</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import IconSVG from '@/components/IconSVG.vue';
import ButtonUI from '@/components/ui/ButtonUI.vue';

export default {
  components: { IconSVG, ButtonUI },
  data() {
    return {
      selectedImage: null,
    };
  },
  computed: {
    ...mapGetters({
      currentProduct: 'vehicle/currentProductCard',
      isLoading: 'vehicle/isLoading',
    }),
    displayedImage() {
      if (this.selectedImage) return this.selectedImage;
      if (this.currentProduct && this.currentProduct.thumbnail)
        return this.currentProduct.thumbnail;
      if (
        this.currentProduct &&
        this.currentProduct.images &&
        this.currentProduct.images.length > 0
      )
        return this.currentProduct.images[0];
      return '';
    },
  },
  methods: {
    ...mapActions({ fetchVehicle: 'vehicle/fetchVehicleById' }),
    ...mapMutations({ addItem: 'cart/addItem' }),
    addToCart() {
      this.addItem(this.currentProduct);
    },
    formatDate(dateString) {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  watch: {
    currentProduct() {
      this.selectedImage = null;
    },
  },
  async mounted() {
    await this.fetchVehicle(this.$route.params.id);
  },
};
</script>

<style scoped>
.product {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.product__loader {
  margin: 128px auto;
  display: block;
  width: fit-content;
}

.product__container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

@media (min-width: 768px) {
  .product__container {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gallery__main {
  width: 100%;
  aspect-ratio: 4/3;
  background-color: var(--background-color);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--text-color) 10%, transparent);
}

.gallery__image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.gallery__list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.gallery__thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.gallery__thumbnail:hover {
  opacity: 0.8;
}

.gallery__thumbnail--active {
  border-color: var(--primary-color);
}

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
  font-size: 40px;
  line-height: 1.1;
  font-weight: 700;
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
  border-radius: 4px;
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
  font-size: 32px;
  color: var(--primary-color);
}

.details__discount {
  background-color: var(--error-color);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: bold;
}

.details__description {
  line-height: 1.6;
  color: var(--text-color);
}

.specs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  background-color: color-mix(in srgb, var(--primary-color) 5%, transparent);
  padding: 20px;
  border-radius: 8px;
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

.reviews {
  grid-column: 1 / -1;
  margin-top: 40px;
  padding-top: 40px;
  border-top: 1px solid color-mix(in srgb, var(--text-color) 10%, transparent);
}

.reviews__title {
  margin-bottom: 24px;
}

.reviews__list {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.review {
  background: var(--background-color);
  border: 1px solid color-mix(in srgb, var(--text-color) 10%, transparent);
  padding: 20px;
  border-radius: 8px;
}

.review__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;
}

.review__author {
  font-weight: bold;
}

.review__date {
  color: var(--secondary-color);
}

.review__rating {
  margin-bottom: 12px;
  color: #e0e0e0;
}

.review__star--filled {
  color: #f1c40f;
}

.review__comment {
  margin: 0;
  font-style: italic;
}
</style>
