import { networker } from '@/services/api';
import { loginUser } from '@/services/api/auth';
import router from '../../router';

export const userStoreModule = {
  namespaced: true,
  state: () => ({
    user: {
      username: 'unknown',
      email: '',
      firstName: '',
      lastName: '',
      gender: '',
      image: '',
      address: {
        address: '',
        city: '',
        state: '',
        stateCode: '',
        postalCode: '',
      },
      accessToken: '',
      refreshToken: '',
    },
    isAuthorized: false,
    error: {
      status: null,
      message: null,
    },
  }),
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
    setRefreshToken(state, value) {
      state.user.refreshToken = value;
    },
    setAccessToken(state, value) {
      state.user.accessToken = value;
    },
    setAuthorized(state, value) {
      state.isAuthorized = value;
    },
    clearUser(state) {
      state.user = {
        username: 'unknown',
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
        image: '',
        accessToken: '',
        refreshToken: '',
      };
    },
    setError(state, payload) {
      state.error.status = payload.status;
      state.error.message = payload.message;
    },
    clearError(state) {
      state.error.status = null;
      state.error.message = null;
    },
  },
  actions: {
    // TODO: Обновление токенов
    async login({ commit, getters }, formData) {
      const result = await loginUser(networker, formData.login, formData.password);
      console.log(result);
      if (result instanceof Error) {
        if (result.status === 400) {
          commit('setError', {
            status: result.status,
            message: "Couldn't find the user credentials.",
          });
        } else {
          commit('setError', { status: result.status, message: result.message });
        }
      } else {
        commit('setUser', result);
        commit('setAuthorized', true);
        router.push({ name: 'account', params: { username: getters.username } });
      }
    },
    async logout({ commit }) {
      commit('setAuthorized', false);
      commit('clearUser');
      router.push({ name: 'login' });
    },
  },
  getters: {
    username: (state) => {
      return state.user.username;
    },
    firstName: (state) => {
      return state.user.firstName;
    },
    isAuthorized: (state) => {
      return state.isAuthorized;
    },
    accessToken: (state) => {
      return state.accessToken;
    },
    refreshToken: (state) => {
      return state.refreshToken;
    },
    error: (state) => {
      return state.error;
    },
  },
};
