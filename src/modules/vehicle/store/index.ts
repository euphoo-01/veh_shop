import { ref, computed } from "vue";
import type {
  Car,
  Motorcycle,
  GroupFilter,
  PriceFilter,
  ProductPreview,
  Product,
} from "@/modules/vehicle/types";
import { defineStore } from "pinia";
import { getMotorcyclesPreview, getVehicleById, getVehiclesPreview } from "../services/api";
import { networker, NetworkError } from "@/modules/shared/services/networker";
import { isNotNetworkError } from "@/modules/shared/utils";
export const useVehicleStore = defineStore("vehicle", () => {
  const cars = ref<ProductPreview<Car>[]>();
  const motorcycles = ref<ProductPreview<Motorcycle>[]>();
  const productDetails = ref<Product>();

  const isLoading = ref<boolean>(false);
  const groupFilter = ref<GroupFilter>();
  const priceFilter = ref<PriceFilter>();

  const error = ref<NetworkError>();

  async function fetchVehicles() {
    try {
      isLoading.value = true;
      const carsRes = await getVehiclesPreview(networker);
      const motorcyclesRes = await getMotorcyclesPreview(networker);
      if (isNotNetworkError(carsRes) && isNotNetworkError(motorcyclesRes)) {
        cars.value = carsRes;
        motorcycles.value = motorcyclesRes;
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

  async function fetchVehicleById(id: number) {
    try {
      isLoading.value = true;
      const vehicleRes = await getVehicleById(networker, id);
      if (isNotNetworkError(vehicleRes)) {
        productDetails.value = vehicleRes;
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

  function setPriceFilter(value: PriceFilter): void {
    priceFilter.value = value;
  }

  function setGroupFilter(value: GroupFilter): void {
    groupFilter.value = value;
  }

  const allVehicles = computed<ProductPreview<Car & Motorcycle>[]>(() => {
    if (cars.value && motorcycles.value) {
      return [...cars.value, ...motorcycles.value];
    } else {
      return [];
    }
  });
  const filteredVehicles = computed<ProductPreview<Product>[] | ProductPreview<Car & Motorcycle>[]>(
    () => {
      let result: ProductPreview<Product>[] | ProductPreview<Car & Motorcycle>[];
      switch (groupFilter.value) {
        case "cars":
          if (cars.value) result = cars.value;
          else result = [];
          break;
        case "motorcycles":
          if (motorcycles.value) result = motorcycles.value;
          else result = [];
          break;
        default:
          result = allVehicles.value;
          break;
      }
      switch (priceFilter.value) {
        case "asc":
          return result.sort((a, b) => a.price - b.price);
        case "desc":
          return result.sort((a, b) => b.price - a.price);
        default:
          return result;
      }
    },
  );

  return {
    cars,
    motorcycles,
    productDetails,
    isLoading,
    groupFilter,
    priceFilter,
    error,
    fetchVehicles,
    fetchVehicleById,
    setGroupFilter,
    setPriceFilter,
    allVehicles,
    filteredVehicles,
  };
});
