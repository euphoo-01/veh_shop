import '@/app/assets/main.css';

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/app/providers/router';
import store from '@/app/providers/store';
import { networker } from '@/modules/shared/services/networker';

const app = createApp(App);

app.use(store);
app.use(router);

networker.setRefreshCallback(async () => {
  return store.dispatch('user/refreshSession');
});

app.mount('#app');
