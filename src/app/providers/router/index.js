import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user/:username',
      name: 'account',
      component: () => import('@/pages/AccountView/AccountView.vue'),
      meta: { loginRequired: true, description: 'User account page' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginView/LoginView.vue'),
      meta: { loginRequired: false, description: 'Login to your account' },
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: () => import('@/pages/CatalogueView/CatalogueView.vue'),
      meta: { loginRequired: false, description: 'Browse our catalogue' },
    },
    {
      path: '/product/:id(\\d+)',
      name: 'product',
      component: () => import('@/pages/ProductView/ProductView.vue'),
      meta: { description: 'Product details' },
    },
    {
      path: '/user/:username/cart',
      name: 'cart',
      component: () => import('@/pages/CartView/CartView.vue'),
      meta: { loginRequired: true, description: 'Your shopping cart' },
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomeView/HomeView.vue'),
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
