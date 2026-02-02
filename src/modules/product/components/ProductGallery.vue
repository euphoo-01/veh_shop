<template>
  <section class="product__gallery gallery">
    <div class="gallery__main">
      <img
        :src="displayedImage"
        :alt="product.title"
        class="gallery__image"
        crossorigin="anonymous"
      />
    </div>
    <div class="gallery__list" v-if="product.images && product.images.length > 1">
      <img
        v-for="(img, index) in product.images"
        :key="index"
        :src="img"
        class="gallery__thumbnail"
        :class="{ 'gallery__thumbnail--active': img === displayedImage }"
        @click="selectedImage = img"
        :alt="`${product.title} view ${index + 1}`"
        crossorigin="anonymous"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductGallery',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedImage: null,
    };
  },
  computed: {
    displayedImage() {
      if (this.selectedImage) return this.selectedImage;
      if (this.product && this.product.thumbnail) return this.product.thumbnail;
      if (this.product && this.product.images && this.product.images.length > 0)
        return this.product.images[0];
      return '';
    },
  },
  watch: {
    product() {
      this.selectedImage = null;
    },
  },
};
</script>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gallery__main {
  width: auto;
  aspect-ratio: 4/3;
  background-color: var(--background-color);
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
  flex-flow: row wrap;
  justify-content: center;
}

.gallery__thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
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
</style>
