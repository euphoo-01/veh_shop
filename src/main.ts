import '@/app/assets/main.css';

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/app/config/router';
import store from '@/app/config/store';
import vuetify from '@/app/config/vuetify';
import { networker } from '@/modules/shared/services/networker';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(vuetify);

networker.setRefreshCallback(async () => {
  return store.dispatch('user/refreshSession');
});

app.mount('#app');
