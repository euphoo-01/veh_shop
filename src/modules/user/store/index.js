import { networker } from '@/modules/shared/services/networker';
import { loginUser, getUserDataByToken, refreshAccessToken } from '@/modules/user/services/api';
import router from '@/app/providers/router';
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
    isLoading: true,
  }),
  mutations: {
    setUser(state, value) {
      state.user = { ...state.user, ...value };
    },
    setRefreshToken(state, refreshToken) {
      state.user.refreshToken = refreshToken;
      localStorage.setItem('refreshToken', refreshToken);
    },
    setAccessToken(state, accessToken) {
      state.user.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
    },
    setAuthorized(state, value) {
      state.isAuthorized = value;
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    },
    clearUser(state) {
      state.user = {
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
    clearTokens() {
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
    },
  },
  actions: {
    async login({ commit, getters }, formData) {
      const result = await loginUser(networker, formData.login, formData.password);
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
        commit('setAccessToken', result.accessToken);
        commit('setRefreshToken', result.refreshToken);
        commit('setAuthorized', true);
        router.push({ name: 'account', params: { username: getters.username } });
      }
    },
    logout({ commit }) {
      commit('setAuthorized', false);
      commit('clearUser');
      commit('clearTokens');
      router.push({ name: 'login' });
    },
    async initSession({ commit, dispatch }) {
      commit('setIsLoading', true);
      // храню не в куках, потому что CORS dummyjson блокирует credentials: "include"
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken && !refreshToken) {
        commit('setIsLoading', false);
        return;
      }

      commit('setAccessToken', accessToken);
      commit('setRefreshToken', refreshToken);

      try {
        await dispatch('getDetailedUserData');
      } catch {
        dispatch('refreshSession')
          .then((result) => {
            commit('setAccessToken', result.accessToken);
            commit('setRefreshToken', result.refreshToken);
          })
          .error(() => {
            commit('setAuthorized', false);
          });
      } finally {
        commit('setIsLoading', false);
      }
    },
    async refreshSession({ commit, getters, dispatch }) {
      commit('setIsLoading', true);
      const result = await refreshAccessToken(networker, getters.refreshToken);
      if (result instanceof Error) {
        if (result.status === 403) {
          commit('setError', { status: 403, message: 'Session expired. Please login again.' });
        } else {
          commit('setError', { status: result.status, message: result.message });
        }
        commit('setIsLoading', false);
        dispatch('logout');
      } else {
        commit('setAccessToken', result.accessToken);
        commit('setIsLoading', false);
        commit('setAuthorized', true);
      }
    },
    async getDetailedUserData({ commit, getters }) {
      commit('setIsLoading', true);
      const result = await getUserDataByToken(networker, getters.accessToken);
      if (result instanceof Error) {
        commit('setError', {
          status: result.status,
          message: result.message,
        });
        commit('setIsLoading', false);
        commit('setAuthorized', false);
      } else {
        commit('setUser', result);
        commit('setAuthorized', true);
        commit('setIsLoading', false);
      }
    },
  },
  getters: {
    username: (state) => {
      return state.user.username;
    },
    userData: (state) => {
      return state.user;
    },
    isAuthorized: (state) => {
      return state.isAuthorized;
    },
    accessToken: (state) => {
      return state.user.accessToken;
    },
    refreshToken: (state) => {
      return state.user.refreshToken;
    },
    error: (state) => {
      return state.error;
    },
    isLoading: (state) => {
      return state.isLoading;
    },
  },
};
