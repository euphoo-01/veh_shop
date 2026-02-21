import { createStore } from "vuex";
import { cartStoreModule } from "@/modules/cart/store";

const store = createStore({
  modules: {
    cart: cartStoreModule,
  },
});

export default store;
