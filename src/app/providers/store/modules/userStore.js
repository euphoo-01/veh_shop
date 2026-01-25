export const userStoreModule = {
  namespaced: true,
  state: () => ({
    username: 'test',
  }),
  mutations: {},
  actions: {},
  getters: {
    getUsername: (state) => {
      return state.username;
    },
  },
};
