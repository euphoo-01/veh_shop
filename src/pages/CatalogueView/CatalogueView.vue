<template>
  <main>
    <h1>Catalogue</h1>
    <CatalogueFilters />
    <IconSVG v-if="isLoading" class="catalogue__spinner" of="spinner" size="extralarge" />
    <CatalogueList v-else :vehicles="filteredVehicles" />
  </main>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useVehicleStore } from "@/modules/vehicle/store";
import CatalogueList from "@/modules/catalogue/components/CatalogueList.vue";
import IconSVG from "@/components/IconSVG.vue";
import CatalogueFilters from "@/modules/catalogue/components/CatalogueFilters.vue";
import { onMounted } from "vue";

const vehicleStore = useVehicleStore();

const { filteredVehicles, isLoading } = storeToRefs(vehicleStore);

onMounted(async () => {
  await vehicleStore.fetchVehicles();
});
</script>
<style>
.catalogue__spinner {
  margin: 128px auto;
  display: block;
  width: fit-content;
}
</style>
