<template>
  <main class="product">
    <ModalUI :isVisible="isModalVisible" @switch-modal="switchModalVisible(false)"
      ><h2>Success</h2>
      <p>Product {{ productDetails.title }} is succesfully added to shopping cart!</p></ModalUI
    >
    <IconSVG v-if="isLoading" class="product__loader" of="spinner" size="extralarge" />

    <div v-else-if="productDetails" class="product__container">
      <ProductGallery :product="productDetails" />
      <ProductDetails :product="productDetails" @add-to-cart="addToCart" />
      <ProductReviews :reviews="productDetails.reviews" />
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { mapMutations } from "vuex";
import { useVehicleStore } from "@/modules/vehicle/store";
import IconSVG from "@/components/IconSVG.vue";
import ModalUI from "@/components/ui/ModalUI.vue";
import ProductGallery from "@/modules/product/components/ProductGallery.vue";
import ProductDetails from "@/modules/product/components/ProductDetails.vue";
import ProductReviews from "@/modules/product/components/ProductReviews.vue";

export default {
  components: {
    IconSVG,
    ModalUI,
    ProductGallery,
    ProductDetails,
    ProductReviews,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  computed: {
    ...mapState(useVehicleStore, ["productDetails"]),
  },
  methods: {
    ...mapActions(useVehicleStore, ["fetchVehicleById"]),
    ...mapMutations({ addItem: "cart/addItem" }),
    addToCart() {
      if (this.isAuthorized) {
        this.addItem(this.currentProduct);
        this.switchModalVisible(true);
      } else {
        this.$router.push({ name: "login" });
      }
    },
    switchModalVisible(value) {
      this.isModalVisible = value;
    },
  },
  async mounted() {
    await this.fetchVehicleById(this.$route.params.id);
  },
};
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
