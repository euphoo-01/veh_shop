<template>
  <main class="product">
    <IconSVG v-if="isLoading" class="product__loader" of="spinner" size="extralarge" />

    <div v-else-if="productDetails" class="product__container">
      <ModalUI :isVisible="isSuccessFormVisible" @switch-modal="switchSuccessModalVisible(false)"
        ><h2>Success</h2>
        <p>Product {{ productDetails.title }} is succesfully added to shopping cart!</p></ModalUI
      >
      <ModalUI :isVisible="isErrorFormVisible" @switch-modal="switchErrorModalVisible(false)"
        ><h2>Error</h2>
        <p>Product not added to the cart!</p></ModalUI
      >
      <ProductGallery :product="productDetails" />
      <ProductDetails :product="productDetails" @add-to-cart="addToCart" />
      <ProductReviews :reviews="productDetails.reviews" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useVehicleStore } from "@/modules/vehicle/store";
import { useCartStore } from "@/modules/cart/store";
import { useUserStore } from "@/modules/user/store";
import IconSVG from "@/components/IconSVG.vue";
import ModalUI from "@/components/ui/ModalUI.vue";
import ProductGallery from "@/modules/product/components/ProductGallery.vue";
import ProductDetails from "@/modules/product/components/ProductDetails.vue";
import ProductReviews from "@/modules/product/components/ProductReviews.vue";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import type { Car } from "@/modules/vehicle/types";

const vehicleStore = useVehicleStore();
const cartStore = useCartStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const { productDetails, isLoading } = storeToRefs(vehicleStore);
const { isAuthorized } = storeToRefs(userStore);
const isSuccessFormVisible = ref<boolean>(false);
const isErrorFormVisible = ref<boolean>(false);

function addToCart() {
  if (isAuthorized && productDetails.value) {
    cartStore.addItem(productDetails.value);
    switchSuccessModalVisible(true);
  } else if (isAuthorized && !productDetails.value) {
    switchErrorModalVisible(true);
  } else {
    router.push({ name: "login" });
  }
}

function switchSuccessModalVisible(value: boolean) {
  isSuccessFormVisible.value = value;
}

function switchErrorModalVisible(value: boolean) {
  isErrorFormVisible.value = value;
}

onMounted(async () => {
  const vehId = route.params.id as Car["id"] | undefined;
  if (vehId) {
    await vehicleStore.fetchVehicleById(vehId);
  }
});
</script>

<style scoped>
.product {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

@media (min-width: 768px) {
  .product {
    padding: 24px;
  }
}

.product__loader {
  margin: 128px auto;
  display: block;
  width: fit-content;
}

.product__container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .product__container {
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 40px;
  }
}
</style>
