import { createStore } from 'vuex';
import { vehicleStoreModule } from './modules/vehicleStore';
import { userStoreModule } from './modules/userStore';
import { cartStoreModule } from './modules/cartStore';

const store = createStore({
  modules: { vehicle: vehicleStoreModule, user: userStoreModule, cart: cartStoreModule },
});

export default store;
