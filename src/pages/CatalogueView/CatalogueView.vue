<template>
  <v-container>
    <h1 class="text-h3 mb-6 font-weight-bold">Catalogue</h1>
    <CatalogueFilters class="mb-8" />

    <div v-if="isLoading" class="d-flex justify-center spinner-container">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

    <CatalogueList v-else :vehicles="filteredVehicles" />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useVehicleStore } from "@/modules/vehicle/store";
import CatalogueList from "@/modules/catalogue/components/CatalogueList.vue";
import CatalogueFilters from "@/modules/catalogue/components/CatalogueFilters.vue";

const vehicleStore = useVehicleStore();

const { filteredVehicles, isLoading } = storeToRefs(vehicleStore);
const { fetchVehicles } = vehicleStore;

onMounted(async () => {
  await fetchVehicles();
});
</script>

<style scoped>
.spinner-container {
  margin-top: 128px;
  margin-bottom: 128px;
}
</style>
