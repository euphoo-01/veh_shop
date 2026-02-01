import { createRouter, createWebHistory } from 'vue-router';
import AccountView from '@/pages/AccountView/AccountView.vue';
import CatalogueView from '@/pages/CatalogueView/CatalogueView.vue';
import CartView from '@/pages/CartView.vue';
import HomeView from '@/pages/HomeView/HomeView.vue';
import LoginView from '@/pages/LoginView/LoginView.vue';
import store from '../store';
import ProductView from '@/pages/ProductView/ProductView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user/:username',
      name: 'account',
      component: AccountView,
      meta: { loginRequired: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { loginRequired: false },
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: CatalogueView,
      meta: { loginRequired: false },
    },
    {
      path: '/product/:id(\\d+)',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/user/:username/cart',
      name: 'cart',
      component: CartView,
      meta: { loginRequired: true },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { loginRequired: false },
    },
  ],
});

let initPromise = null;

router.beforeEach(async (to, from, next) => {
  if (!initPromise) {
    initPromise = store.dispatch('user/initSession');
    await initPromise;
  }

  if (to.meta.loginRequired && !store.getters['user/isAuthorized']) {
    next({ name: 'login' });
    return;
  }
  next();
  return;
});

export default router;
