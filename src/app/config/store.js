import { createStore } from "vuex";
import { cartStoreModule } from "@/modules/cart/store";
import { homeStoreModule } from "@/modules/home/store";

const store = createStore({
  modules: {
    cart: cartStoreModule,
    home: homeStoreModule,
  },
});

export default store;
