<template>
  <v-container v-if="reviews.length" class="py-16">
    <h2 class="text-h4 text-center mb-12 font-weight-bold text-on-background">
      What Our Customers Say
    </h2>

    <v-row>
      <v-col v-for="review in reviews" :key="review.id" cols="12" md="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            class="h-100 pa-10 d-flex flex-column justify-space-between review-card"
            variant="outlined"
            :ripple="false"
            :style="{
              borderColor: isHovering
                ? 'rgb(var(--v-theme-primary))'
                : 'rgba(var(--v-theme-primary), 0.2)',
            }"
          >
            <v-card-text
              class="text-body-1 font-italic mb-6 text-on-surface"
              style="line-height: 1.6"
            >
              "{{ review.quote }}"
            </v-card-text>

            <v-card-subtitle
              class="text-right text-subtitle-1 font-weight-bold text-primary opacity-100"
              style="letter-spacing: 0.5px"
            >
              - {{ review.author }}
            </v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Quote } from "@/modules/reviews/types";
import { toRefs } from "vue";

const props = withDefaults(defineProps<{ reviews: Quote[] }>(), {
  reviews: () => [],
});
const { reviews } = toRefs(props);
</script>

<style scoped>
.review-card {
  background-color: color-mix(in srgb, rgb(var(--v-theme-primary)) 5%, rgb(var(--v-theme-surface)));
  color: rgb(var(--v-theme-on-surface));
  transition: border-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>
