import { getVehiclesPreview } from '@/services/api/vehicles';
import { networker } from '@/services/api';
import { getMotorcyclesPreview } from '@/services/api/motorcycles';
export const vehicleStoreModule = {
  namespaced: true,
  state: () => ({
    cars: [],
    motorcycle: [],
  }),
  mutations: {
    setCars(state, cars) {
      state.cars = cars;
    },
    setMotorcycle(state, motorcycle) {
      state.motorcycle = motorcycle;
    },
  },
  actions: {
    async fetchVehicles({ commit }) {
      const cars = await getVehiclesPreview(networker);
      const motorcycle = await getMotorcyclesPreview(networker);
      commit('setCars', cars.products);
      commit('setMotorcycle', motorcycle.products);
    },
  },
  getters: {
    allCars: (state) => state.cars.products,
    allMotorcycle: (state) => state.motorcycle.products,
    allVehicle: (state) => [...state.cars, ...state.motorcycle],
  },
};
