import { createRouter, createWebHistory } from 'vue-router';
import AccountView from '@/pages/AccountView/AccountView.vue';
import CatalogueView from '@/pages/CatalogueView/CatalogueView.vue';
import CartView from '@/pages/CartView/CartView.vue';
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
      meta: { loginRequired: true, description: 'User account page' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { loginRequired: false, description: 'Login to your account' },
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: CatalogueView,
      meta: { loginRequired: false, description: 'Browse our catalogue' },
    },
    {
      path: '/product/:id(\\d+)',
      name: 'product',
      component: ProductView,
      meta: { description: 'Product details' },
    },
    {
      path: '/user/:username/cart',
      name: 'cart',
      component: CartView,
      meta: { loginRequired: true, description: 'Your shopping cart' },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { loginRequired: false, description: 'Welcome to Veh Shop' },
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
