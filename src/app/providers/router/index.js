import { createRouter, createWebHistory } from 'vue-router';
import AccountView from '@/pages/AccountView/AccountView.vue';
import CatalogueView from '@/pages/CatalogueView/CatalogueView.vue';
import CartView from '@/pages/CartView.vue';
import HomeView from '@/pages/HomeView.vue';
import LoginView from '@/pages/LoginView/LoginView.vue';
import store from '../store';

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
      path: '/user/login',
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

router.beforeEach((to, from, next) => {
  if ((to.meta.loginRequired && store.getters['user/isAuthorized']) || !to.meta.loginRequired) {
    next();
  } else {
    next('/user/login');
  }
});

export default router;
