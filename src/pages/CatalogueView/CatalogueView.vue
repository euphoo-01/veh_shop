<template>
  <div>
    <h1>Catalogue</h1>
    <CatalogueList :vehicles="allVehicle" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CatalogueList from './CatalogueList.vue';
export default {
  components: { CatalogueList },
  computed: {
    ...mapGetters({ allVehicle: 'vehicle/allVehicle' }),
  },
  methods: {
    ...mapActions('vehicle', ['fetchVehicles']),
  },
  mounted() {
    this.fetchVehicles();
  },
};
</script>
<style></style>
