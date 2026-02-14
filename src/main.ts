import '@/app/assets/main.css';

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/app/config/router';
import store from '@/app/config/store';
import vuetify from '@/app/config/vuetify';
import { networker } from '@/modules/shared/services/networker';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(store);
app.use(pinia);
app.use(router);
app.use(vuetify);

networker.setRefreshCallback(async () => {
  return store.dispatch('user/refreshSession');
});

app.mount('#app');
