<template>
  <main>
    <h1>Catalogue</h1>
    <CatalogueFilters />
    <IconSVG v-if="isLoading" class="catalogue__spinner" of="spinner" size="extralarge" />
    <CatalogueList v-else :vehicles="filteredVehicles" />
  </main>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useVehicleStore } from "@/modules/vehicle/store";
import CatalogueList from "@/modules/catalogue/components/CatalogueList.vue";
import IconSVG from "@/components/IconSVG.vue";
import CatalogueFilters from "@/modules/catalogue/components/CatalogueFilters.vue";
export default {
  components: { CatalogueList, IconSVG, CatalogueFilters },
  computed: {
    ...mapState(useVehicleStore, {
      allVehicles: "allVehicles",
      filteredVehicles: "filteredVehicles",
      isLoading: "isLoading",
    }),
  },
  methods: {
    ...mapActions(useVehicleStore, ["fetchVehicles"]),
  },
  async mounted() {
    await this.fetchVehicles();
  },
};
</script>
<style>
.catalogue__spinner {
  margin: 128px auto;
  display: block;
  width: fit-content;
}
</style>
