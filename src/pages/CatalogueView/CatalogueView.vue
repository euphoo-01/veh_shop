<template>
  <main>
    <h1>Catalogue</h1>
    <CatalogueFilters />
    <IconSVG v-if="isLoading" class="catalogue__spinner" of="spinner" size="extralarge" />
    <CatalogueList v-else :vehicles="filteredVehicles" />
  </main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CatalogueList from '@/modules/catalogue/components/CatalogueList.vue';
import IconSVG from '@/components/IconSVG.vue';
import CatalogueFilters from '@/modules/catalogue/components/CatalogueFilters.vue';
export default {
  components: { CatalogueList, IconSVG, CatalogueFilters },
  computed: {
    ...mapGetters({
      allVehicles: 'vehicle/allVehicles',
      filteredVehicles: 'vehicle/filteredVehicles',
      isLoading: 'vehicle/isLoading',
    }),
  },
  methods: {
    ...mapActions('vehicle', ['fetchVehicles']),
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
