<template>
  <section class="catalogue__filters">
    <IconSVG class="filters__icon" of="filter" size="large" />
    <SelectUI v-model="groupFilter" placeholder="Select by group:">
      <option value="">All</option>
      <option value="cars">Cars</option>
      <option value="motorcycles">Motorcycles</option>
    </SelectUI>
    <SelectUI v-model="priceFilter" placeholder="Sort by price:">
      <option value="asc">Lower first</option>
      <option value="desc">Higher first</option>
      <option value="">None</option>
    </SelectUI>
  </section>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useVehicleStore } from "@/modules/vehicle/store";
import SelectUI from "@/components/ui/SelectUI.vue";
import IconSVG from "@/components/IconSVG.vue";
const vehicleStore = useVehicleStore();
const { groupFilter, priceFilter } = storeToRefs(vehicleStore);
</script>
<style>
.catalogue__filters {
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
}
@media (max-width: 768px) {
  .catalogue__filters {
    flex-flow: column;
    align-items: flex-start;
  }
}
</style>
