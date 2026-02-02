<template>
  <section class="product__reviews reviews" v-if="reviews && reviews.length">
    <h3 class="reviews__title">Customer Reviews</h3>
    <div class="reviews__list">
      <div v-for="(review, index) in reviews" :key="index" class="reviews__card review">
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
</template>

<script>
export default {
  name: 'ProductReviews',
  props: {
    reviews: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
</script>

<style scoped>
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.review {
  background: var(--background-color);
  border: 1px solid color-mix(in srgb, var(--text-color) 10%, transparent);
  padding: 20px;
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
