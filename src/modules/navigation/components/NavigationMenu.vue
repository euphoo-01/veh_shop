<script setup lang="ts">
import ButtonUI from "@/components/ui/ButtonUI.vue";
import { RouterLink } from "vue-router";
import IconSVG from "@/components/IconSVG.vue";
defineProps({
  username: {
    type: String,
    required: true,
  },
  isAuthorized: {
    type: Boolean,
    required: true,
  },
  totalProducts: {
    type: Number,
    required: true,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <nav class="menu__content">
    <RouterLink :to="{ name: 'home' }" active-class="menu__button--active"
      ><ButtonUI secondary>Home</ButtonUI></RouterLink
    >

    <RouterLink :to="{ name: 'catalogue' }" active-class="menu__button--active"
      ><ButtonUI secondary>Catalogue</ButtonUI></RouterLink
    >
    <RouterLink
      :to="{ name: 'account', params: { username } }"
      active-class="menu__button--active"
      v-if="isAuthorized"
      ><ButtonUI secondary>Account</ButtonUI></RouterLink
    >
    <RouterLink :to="{ name: 'login' }" active-class="menu__button--active" v-else>
      <ButtonUI secondary> Login </ButtonUI>
    </RouterLink>

    <RouterLink
      :to="{ name: 'cart', params: { username } }"
      class="menu__cart_wrapper"
      active-class="menu__icon--active"
      v-if="isAuthorized && !isMobile"
    >
      <IconSVG of="cart" size="large" clickable />
      <span v-if="totalProducts > 0" class="menu__cart_badge">{{
        totalProducts > 9 ? "9+" : totalProducts
      }}</span>
    </RouterLink>
  </nav>
</template>

<style></style>
