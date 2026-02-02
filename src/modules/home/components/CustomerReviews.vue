<template>
  <section class="reviews" v-if="reviews.length">
    <h2 class="reviews__title">What Our Customers Say</h2>
    <div class="reviews__grid">
      <div v-for="review in reviews" :key="review.id" class="review__card">
        <p class="card__text">"{{ review.quote }}"</p>
        <p class="card__author">- {{ review.author }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CustomerReviews',
  props: {
    reviews: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.reviews__title {
  text-align: center;
  margin-bottom: 48px;
  position: relative;
}

.reviews__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.review__card {
  background-color: color-mix(in srgb, var(--primary-color) 5%, var(--background-color));
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid color-mix(in srgb, var(--primary-color) 20%, transparent);
  transition: border-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.review__card:hover {
  border-color: var(--primary-color);
}

.card__text {
  font-style: italic;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 24px;
  position: relative;
}

.card__author {
  text-align: right;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .reviews__grid {
    grid-template-columns: 1fr;
  }
}
</style>
