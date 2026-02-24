<template>
  <div class="product__gallery gallery">
    <v-card
      variant="outlined"
      class="gallery__main mb-4 d-flex align-center justify-center overflow-hidden"
      rounded="0"
      color="surface"
    >
      <v-img
        :src="displayedImage"
        :alt="product.title"
        class="gallery__image"
        max-width="100%"
        max-height="100%"
        cover
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </template>
      </v-img>
    </v-card>

    <div
      v-if="product.images && product.images.length > 1"
      class="gallery__list d-flex flex-wrap justify-center ga-3"
    >
      <v-hover v-for="(img, index) in product.images" :key="index" v-slot="{ isHovering, props }">
        <v-card
          v-bind="props"
          width="80"
          height="80"
          rounded="0"
          :variant="img === displayedImage ? 'outlined' : 'flat'"
          :color="img === displayedImage ? 'primary' : 'transparent'"
          class="cursor-pointer gallery__thumbnail"
          @click="selectedImage = img"
          :elevation="isHovering ? 2 : 0"
        >
          <v-img :src="img" :alt="`${product.title} view ${index + 1}`" cover aspect-ratio="1" />
        </v-card>
      </v-hover>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/modules/vehicle/types";
import { ref, computed, watch, toRefs } from "vue";

const props = defineProps<{ product: Product }>();

const { product } = toRefs(props);
const selectedImage = ref<string>("");
const displayedImage = computed(() => {
  if (selectedImage.value) return selectedImage.value;
  if (product.value && product.value.thumbnail) return product.value.thumbnail;
  if (product.value && product.value.images && product.value.images.length > 0)
    return product.value.images[0];
  return "";
});

watch(product.value, () => {
  selectedImage.value = "";
});
</script>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
}

.gallery__main {
  aspect-ratio: 4/3;
  width: 100%;
}

.gallery__thumbnail {
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.v-card--variant-outlined {
  border-width: 2px;
}
</style>
