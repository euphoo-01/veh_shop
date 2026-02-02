export const cartStoreModule = {
  namespaced: true,
  state: () => ({
    cartItems: [],
  }),
  mutations: {
    addItem(state, product) {
      const existingItem = state.cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    setCartItems(state, value) {
      state.cartItems = value;
    },
    removeItem(state, productId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    updateQuantity(state, { productId, quantity }) {
      const item = state.cartItems.find((item) => item.id === productId);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.cartItems = state.cartItems.filter((i) => i.id !== productId);
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
  },
  actions: {
    initCart({ commit }) {
      try {
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        if (!Array.isArray(cartItems)) {
          cartItems = [];
        }
        commit('setCartItems', cartItems);
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
        commit('setCartItems', []);
        localStorage.removeItem('cart');
      }
    },
  },
  getters: {
    cartItems: (state) => state.cartItems,
    cartTotal: (state) => {
      return state.cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    },
    cartItemCount: (state) => {
      return state.cartItems.reduce((count, item) => count + item.quantity, 0);
    },
  },
};
