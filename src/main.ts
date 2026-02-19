import "@/app/assets/main.css";

import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/app/config/router";
import store from "@/app/config/store";
import vuetify from "@/app/config/vuetify";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(store);
app.use(router);
app.use(vuetify);

app.mount("#app");
