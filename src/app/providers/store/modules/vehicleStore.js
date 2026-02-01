import { getVehicleById, getVehiclesPreview, getMotorcyclesPreview } from '@/services/api/vehicles';
import { networker } from '@/services/api';
export const vehicleStoreModule = {
  namespaced: true,
  state: () => ({
    cars: [],
    motorcycles: [],
    currentProductCard: {},
    isLoading: false,
    groupFilter: '', // мб cars или motorcycles
    priceFilter: '', // мб asc или desc
  }),
  mutations: {
    setCars(state, cars) {
      state.cars = cars;
    },
    setMotorcycles(state, motorcycles) {
      state.motorcycles = motorcycles;
    },
    setLoading(state, value) {
      state.isLoading = value;
    },
    setGroupFilter(state, value) {
      state.groupFilter = value;
    },
    setPriceFilter(state, value) {
      state.priceFilter = value;
    },
    setCurrentProductCard(state, value) {
      state.currentProductCard = value;
    },
  },
  actions: {
    async fetchVehicles({ commit }) {
      commit('setLoading', true);
      const cars = await getVehiclesPreview(networker);
      const motorcycles = await getMotorcyclesPreview(networker);
      commit('setCars', cars.products || []);
      commit('setMotorcycles', motorcycles.products || []);
      commit('setLoading', false);
    },
    async fetchVehicleById({ commit }, id) {
      commit('setLoading', true);
      const detailedInfo = await getVehicleById(networker, id);
      commit('setCurrentProductCard', detailedInfo);
      commit('setLoading', false);
    },
  },
  getters: {
    allCars: (state) => state.cars,
    allMotorcycles: (state) => state.motorcycles,
    allVehicles: (state) => [...state.cars, ...state.motorcycles],
    filteredVehicles: (state, getters) => {
      let result;
      switch (state.groupFilter) {
        case 'cars':
          result = getters.allCars;
          break;
        case 'motorcycles':
          result = getters.allMotorcycles;
          break;
        default:
          result = getters.allVehicles;
          break;
      }
      if (state.priceFilter === 'asc') {
        return result.sort((a, b) => a.price - b.price);
      } else if (state.priceFilter === 'desc') {
        return result.sort((a, b) => b.price - a.price);
      }
      return result;
    },
    isLoading: (state) => state.isLoading,
    groupFilter: (state) => state.groupFilter,
    priceFilter: (state) => state.priceFilter,
    currentProductCard: (state) => state.currentProductCard,
  },
};
