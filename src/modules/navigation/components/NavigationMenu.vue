<script setup lang="ts">
import { toRefs } from "vue";
import type { NavigationMenuProps } from "../types";
const props = withDefaults(defineProps<NavigationMenuProps>(), {
  isMobile: false,
  username: "unknown",
});
const { username, isAuthorized, totalProducts, isMobile } = toRefs(props);
</script>

<template>
  <nav class="d-flex align-center flex-column flex-md-row ga-4">
    <v-btn
      :to="{ name: 'home' }"
      variant="text"
      color="on-surface"
      class="nav-btn text-body-1 text-capitalize"
      :class="{ 'w-100': isMobile }"
      rounded="0"
      :ripple="false"
      height="50"
      active-color="primary"
    >
      Home
    </v-btn>

    <v-btn
      :to="{ name: 'catalogue' }"
      variant="text"
      color="on-surface"
      class="nav-btn text-body-1 text-capitalize"
      :class="{ 'w-100': isMobile }"
      rounded="0"
      :ripple="false"
      height="50"
      active-color="primary"
    >
      Catalogue
    </v-btn>

    <template v-if="isAuthorized">
      <v-btn
        :to="{ name: 'account', params: { username } }"
        variant="text"
        color="on-surface"
        class="nav-btn text-body-1 text-capitalize"
        :class="{ 'w-100': isMobile }"
        rounded="0"
        :ripple="false"
        height="50"
        active-color="primary"
      >
        Account
      </v-btn>
    </template>
    <template v-else>
      <v-btn
        :to="{ name: 'login' }"
        variant="text"
        color="on-surface"
        class="nav-btn text-body-1 text-capitalize"
        :class="{ 'w-100': isMobile }"
        rounded="0"
        :ripple="false"
        height="50"
        active-color="primary"
      >
        Login
      </v-btn>
    </template>

    <v-btn
      v-if="isAuthorized && !isMobile"
      :to="{ name: 'cart', params: { username } }"
      icon
      variant="text"
      color="on-surface"
      aria-label="Cart"
      class="cart-btn"
      :ripple="false"
      active-color="primary"
    >
      <v-badge
        v-if="totalProducts > 0"
        :content="totalProducts > 9 ? '9+' : totalProducts"
        color="error"
      >
        <v-icon icon="mdi-cart" size="large"></v-icon>
      </v-badge>
      <v-icon v-else icon="mdi-cart" size="large"></v-icon>
    </v-btn>
  </nav>
</template>

<style scoped>
.nav-btn {
  min-width: 150px;
  border-bottom: 3px solid transparent;
  transition:
    background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1),
    border-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.nav-btn:hover {
  background-color: rgba(var(--v-theme-primary), 0.2);
  border-bottom-color: rgb(var(--v-theme-primary));
}

.nav-btn.v-btn--active {
  border-bottom-color: rgb(var(--v-theme-primary));
}

.cart-btn:hover {
  color: rgb(var(--v-theme-primary));
}
</style>
