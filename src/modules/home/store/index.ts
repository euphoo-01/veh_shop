import { defineStore } from "pinia";
import { ref } from "vue";
import type { Car, ProductPreview } from "@/modules/vehicle/types";
import type { Quote } from "@/modules/reviews/types";
import { networker, NetworkError } from "@/modules/shared/services/networker";
import { getVehiclesPreview } from "@/modules/vehicle/services/api";
import { getReviews } from "@/modules/reviews/services/api";
import { isNotNetworkError } from "@/modules/shared/utils";

export const useHomeStore = defineStore("home", () => {
  const featuredVehicles = ref<ProductPreview<Car>[]>();
  const reviews = ref<Quote[]>();
  const isLoading = ref<boolean>(false);
  const error = ref<NetworkError>();

  async function fetchHomeData() {
    isLoading.value = true;
    try {
      const [vehiclesRes, reviewsRes] = await Promise.all([
        getVehiclesPreview(networker, 3),
        getReviews(networker),
      ]);

      if (isNotNetworkError(vehiclesRes)) {
        featuredVehicles.value = vehiclesRes;
      }

      if (isNotNetworkError(reviewsRes)) {
        reviews.value = reviewsRes;
      }
    } catch (e) {
      if (e instanceof NetworkError) {
        error.value = e;
      } else if (e instanceof Error) {
        error.value = { message: e.message, name: e.name, status: 1 };
      }
    } finally {
      isLoading.value = false;
    }
  }

  return {
    featuredVehicles,
    reviews,
    isLoading,
    error,
    fetchHomeData,
  };
});
