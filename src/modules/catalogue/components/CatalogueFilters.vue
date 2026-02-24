<template>
  <section class="catalogue__filters">
    <v-icon icon="mdi-filter" size="large" class="filters__icon" />

    <v-select
      v-model="groupFilter"
      :items="groupOptions"
      label="Select by group:"
      item-title="title"
      item-value="value"
      variant="underlined"
      density="compact"
      hide-details
      class="filter-select"
      color="primary"
    ></v-select>

    <v-select
      v-model="priceFilter"
      :items="priceOptions"
      label="Sort by price:"
      item-title="title"
      item-value="value"
      variant="underlined"
      density="compact"
      hide-details
      class="filter-select"
      color="primary"
    ></v-select>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useVehicleStore } from "@/modules/vehicle/store";

const vehicleStore = useVehicleStore();
const { groupFilter, priceFilter } = storeToRefs(vehicleStore);

const groupOptions = [
  { title: "All", value: "" },
  { title: "Cars", value: "cars" },
  { title: "Motorcycles", value: "motorcycles" },
];

const priceOptions = [
  { title: "Lower first", value: "asc" },
  { title: "Higher first", value: "desc" },
  { title: "None", value: "" },
];
</script>

<style scoped>
.catalogue__filters {
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
}

.filter-select {
  min-width: 300px;
}

@media (max-width: 768px) {
  .catalogue__filters {
    flex-flow: column;
    align-items: flex-start;
  }

  .filter-select {
    width: 100%;
    min-width: unset;
  }
}
</style>
