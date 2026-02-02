<template>
  <main class="home">
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__title">Find Your Dream Ride</h1>
        <p class="hero__subtitle">Explore our premium collection of vehicles and motorcycles.</p>
        <ButtonUI primary @click="goToCatalogue"> Shop Now </ButtonUI>
      </div>
      <div class="hero__image_container">
        <img src="@/app/assets/home_banner.webp" alt="Home Banner" class="hero__image" fetchpriority="high"/>
      </div>
    </section>

    <section class="featured" v-if="featuredVehicles.length">
      <h2 class="featured__title">Featured Vehicles</h2>
      <div class="featured__grid">
        <div
          v-for="vehicle in featuredVehicles"
          :key="vehicle.id"
          class="featured__card"
          @click="goToProductCard(vehicle.id)"
        >
          <div class="card__image_wrapper">
            <img
              :src="vehicle.thumbnail"
              :alt="vehicle.title"
              class="card__image"
              crossorigin="anonymous"
            />
          </div>
          <h2 class="card__title">{{ vehicle.title }}</h2>
          <h2 class="card__price">
            <b>${{ vehicle.price }}</b>
          </h2>
        </div>
      </div>
      <div class="featured__action">
        <ButtonUI secondary @click="goToCatalogue"> View All </ButtonUI>
      </div>
    </section>

    <section class="reviews" v-if="reviews.length">
      <h2 class="reviews__title">What Our Customers Say</h2>
      <div class="reviews__grid">
        <div v-for="review in reviews" :key="review.id" class="review__card">
          <p class="card__text">"{{ review.quote }}"</p>
          <p class="card__author">- {{ review.author }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ButtonUI from '@/components/ui/ButtonUI.vue';
import { networker } from '@/services/api';
import { getVehiclesPreview } from '@/services/api/vehicles';
import { getReviews } from '@/services/api/reviews';

export default {
  components: {
    ButtonUI,
  },
  data() {
    return {
      featuredVehicles: [],
      reviews: [],
    };
  },
  methods: {
    goToProductCard(id) {
      this.$router.push({ name: 'product', params: { id } });
    },
    goToCatalogue() {
      this.$router.push({ name: 'catalogue' });
    },
  },
  async mounted() {
    // не создавал новый модуль во vuex, т.к. посчитал это избыточным
    try {
      const vehiclesData = await getVehiclesPreview(networker, 3);
      if (vehiclesData && vehiclesData.products) {
        this.featuredVehicles = vehiclesData.products;
      }

      const reviewsData = await getReviews(networker);
      if (reviewsData && reviewsData.quotes) {
        this.reviews = reviewsData.quotes;
      }
    } catch (error) {
      console.error('Failed to load home data:', error);
    }
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-bottom: 120px;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 48px 0;
  min-height: 400px;
}

.hero__content {
  flex: 1;
  max-width: 550px;
}

.hero__title {
  margin-bottom: 24px;
  line-height: 1.1;
}

.hero__subtitle {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 32px;
  color: var(--secondary-color);
  max-width: 450px;
}

.hero__image_container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.hero__image {
  width: 100%;
  max-width: 850px;
}

.featured__title,
.reviews__title {
  text-align: center;
  margin-bottom: 48px;
  position: relative;
}

.featured__grid,
.reviews__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.featured__card {
  background-color: var(--background-color);
  border: 1px solid color-mix(in srgb, var(--secondary-color) 30%, transparent);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured__card:hover {
  background-color: color-mix(in srgb, var(--primary-color) 20%, transparent);
  border-color: var(--primary-color);
  cursor: pointer;
}

.card__image_wrapper {
  width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 24px;
  background-color: transparent;
}

.card__image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  transform: scale(1.5);
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.card__title {
  text-align: center;
}

.card__price {
  color: var(--primary-color);
}

.featured__action {
  margin-top: 48px;
  display: flex;
  justify-content: center;
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

@media (max-width: 1024px) {
  .hero {
    flex-direction: column-reverse;
    text-align: center;
    gap: 40px;
  }

  .hero__content {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .hero__subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .hero__image_container {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .home {
    gap: 60px;
  }

  .featured__grid,
  .reviews__grid {
    grid-template-columns: 1fr;
  }
}
</style>
