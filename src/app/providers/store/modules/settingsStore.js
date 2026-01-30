export const settingsStoreModule = {
  namespaced: true,
  state: {
    currentTheme: 'light',
  },
  mutations: {
    setTheme(state, value) {
      localStorage.setItem('currentTheme', value);
      state.currentTheme = value;
    },
  },
  actions: {
    initTheme({ commit }) {
      const saved = localStorage.getItem('currentTheme');
      if (!saved) {
        saved = 'light';
      }
      commit('setTheme', saved);
    },
  },
  getters: {
    currentTheme: (state) => {
      return state.currentTheme;
    },
  },
};
