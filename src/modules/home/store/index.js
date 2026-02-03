import { getVehiclesPreview } from '@/modules/vehicle/services/api';
import { getReviews } from '@/modules/reviews/services/api';
import { networker } from '@/modules/shared/services/networker';

export const homeStoreModule = {
  namespaced: true,
  state: () => ({
    featuredVehicles: [],
    reviews: [],
    isLoading: false,
    error: null,
  }),
  mutations: {
    setFeaturedVehicles(state, vehicles) {
      state.featuredVehicles = vehicles;
    },
    setReviews(state, reviews) {
      state.reviews = reviews;
    },
    setLoading(state, status) {
      state.isLoading = status;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchHomeData({ commit }) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const [vehiclesData, reviewsData] = await Promise.all([
          getVehiclesPreview(networker, 3),
          getReviews(networker),
        ]);

        if (vehiclesData && vehiclesData.products) {
          commit('setFeaturedVehicles', vehiclesData.products);
        }

        if (reviewsData && reviewsData.quotes) {
          commit('setReviews', reviewsData.quotes);
        }
      } catch (error) {
        console.error('Failed to load home data:', error);
        commit('setError', 'Failed to load home page data.');
      } finally {
        commit('setLoading', false);
      }
    },
  },
  getters: {
    featuredVehicles: (state) => state.featuredVehicles,
    reviews: (state) => state.reviews,
    isLoading: (state) => state.isLoading,
  },
};
