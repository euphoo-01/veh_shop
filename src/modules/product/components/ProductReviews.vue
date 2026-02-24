<template>
  <v-container v-if="reviews && reviews.length" class="product__reviews reviews pa-0 mt-10 pt-10">
    <h3 class="text-h5 font-weight-bold mb-6">Customer Reviews</h3>

    <v-row>
      <v-col v-for="(review, index) in reviews" :key="index" cols="12" sm="6" md="4" class="d-flex">
        <v-card
          variant="outlined"
          class="w-100 pa-5 d-flex flex-column h-100"
          rounded="0"
          :style="{ borderColor: 'rgb(var(--v-theme-surface-light))' }"
        >
          <div class="d-flex justify-space-between mb-2 text-body-2">
            <span class="font-weight-bold">{{ review.reviewerName }}</span>
            <span class="text-medium-emphasis">{{ formatDate(review.date) }}</span>
          </div>

          <v-rating
            :model-value="review.rating"
            color="warning"
            density="compact"
            size="small"
            readonly
            half-increments
            class="mb-3"
          ></v-rating>

          <p class="text-body-2 font-italic mb-0">{{ review.comment }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Review } from "@/modules/vehicle/types";
import { toRefs } from "vue";

const props = defineProps<{ reviews: Review[] }>();
const { reviews } = toRefs(props);

function formatDate(dateString: string) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>

<style scoped>
.reviews {
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}
</style>
