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
<script>
import { mapMutations, mapGetters } from 'vuex';
import SelectUI from '@/components/ui/SelectUI.vue';
import IconSVG from '@/components/IconSVG.vue';
export default {
  components: { SelectUI, IconSVG },
  computed: {
    ...mapGetters({
      groupFilterGetter: 'vehicle/groupFilter',
      priceFilterGetter: 'vehicle/priceFilter',
    }),
    groupFilter: {
      get() {
        return this.groupFilterGetter;
      },
      set(value) {
        this.mutateGroupFilter(value);
      },
    },
    priceFilter: {
      get() {
        return this.priceFilterGetter;
      },
      set(value) {
        this.mutatePriceFilter(value);
      },
    },
  },
  methods: {
    ...mapMutations({
      mutateGroupFilter: 'vehicle/setGroupFilter',
      mutatePriceFilter: 'vehicle/setPriceFilter',
    }),
  },
};
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
</style>
