import { createStore } from 'vuex';
import { vehicleStoreModule } from './modules/vehicleStore';
import { userStoreModule } from './modules/userStore';
import { cartStoreModule } from './modules/cartStore';
import { settingsStoreModule } from './modules/settingsStore';

const store = createStore({
  modules: {
    vehicle: vehicleStoreModule,
    user: userStoreModule,
    cart: cartStoreModule,
    settings: settingsStoreModule,
  },
});

export default store;
