export const settingsStoreModule = {
  namespaced: true,
  state: {
    currentTheme: 'dark',
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
      const validThemes = ['light', 'dark'];

      const themeToSet = validThemes.includes(saved) ? saved : 'dark';
      commit('setTheme', themeToSet);
    },
  },
  getters: {
    currentTheme: (state) => {
      return state.currentTheme;
    },
  },
};
