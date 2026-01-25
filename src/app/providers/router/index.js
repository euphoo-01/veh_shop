import { createRouter, createWebHistory } from 'vue-router';
import AccountView from '@/pages/AccountView.vue';
import CatalogueView from '@/pages/CatalogueView.vue';
import CartView from '@/pages/CartView.vue';
import HomeView from '@/pages/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user/:username',
      name: 'account',
      component: AccountView,
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: CatalogueView,
    },
    {
      path: '/user/:username/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
});

export default router;
