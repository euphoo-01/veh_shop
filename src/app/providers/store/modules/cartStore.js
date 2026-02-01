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
    },
    removeItem(state, productId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
    },
    updateQuantity(state, { productId, quantity }) {
      const item = state.cartItems.find((item) => item.id === productId);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.cartItems = state.cartItems.filter((i) => i.id !== productId);
        }
      }
    },
    clearCart(state) {
      state.cartItems = [];
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