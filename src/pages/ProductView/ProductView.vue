<template>
  <v-container class="product-view py-8 align-start" style="min-height: 80vh">
    <div v-if="isLoading" class="d-flex justify-center align-center w-100" style="height: 50vh">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

    <div v-else-if="productDetails" class="w-100">
      <v-dialog v-model="isSuccessFormVisible" max-width="400">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold bg-success text-white">
            Success
          </v-card-title>
          <v-card-text class="pa-4">
            <p class="text-body-1">
              Product <strong>{{ productDetails.title }}</strong> is succesfully added to shopping
              cart!
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" variant="text" @click="switchSuccessModalVisible(false)">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="isErrorFormVisible" max-width="400">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold bg-error text-white"> Error </v-card-title>
          <v-card-text class="pa-4">
            <p class="text-body-1">Product not added to the cart!</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" variant="text" @click="switchErrorModalVisible(false)">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-row class="mb-10">
        <v-col cols="12" md="6">
          <ProductGallery :product="productDetails" />
        </v-col>
        <v-col cols="12" md="6">
          <ProductDetails :product="productDetails" @add-to-cart="addToCart" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <ProductReviews :reviews="productDetails.reviews" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useVehicleStore } from "@/modules/vehicle/store";
import { useCartStore } from "@/modules/cart/store";
import { useUserStore } from "@/modules/user/store";
import ProductGallery from "@/modules/product/components/ProductGallery.vue";
import ProductDetails from "@/modules/product/components/ProductDetails.vue";
import ProductReviews from "@/modules/product/components/ProductReviews.vue";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

const vehicleStore = useVehicleStore();
const cartStore = useCartStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const { productDetails, isLoading } = storeToRefs(vehicleStore);
const { isAuthorized } = storeToRefs(userStore);
const { addItem } = cartStore;
const { fetchVehicleById } = vehicleStore;
const isSuccessFormVisible = ref<boolean>(false);
const isErrorFormVisible = ref<boolean>(false);

function addToCart() {
  if (isAuthorized.value && productDetails.value) {
    addItem(productDetails.value);
    switchSuccessModalVisible(true);
  } else if (isAuthorized.value && !productDetails.value) {
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
  const vehId = Number(route.params.id);
  if (vehId) {
    await fetchVehicleById(vehId);
  }
});
</script>

<style scoped>
.product-view {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
