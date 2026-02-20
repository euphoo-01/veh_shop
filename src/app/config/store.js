import { createStore } from "vuex";
import { cartStoreModule } from "@/modules/cart/store";
import { settingsStoreModule } from "@/modules/settings/store";
import { homeStoreModule } from "@/modules/home/store";

const store = createStore({
  modules: {
    cart: cartStoreModule,
    settings: settingsStoreModule,
    home: homeStoreModule,
  },
});

export default store;
