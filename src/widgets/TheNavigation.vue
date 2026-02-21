<template>
  <menu class="menu">
    <NavigationMenu :username :is-authorized :total-products />
  </menu>
  <menu class="menu--mobile">
    <ModalUI @switch-modal="switchModal(false)" :is-visible="isBurgerVisible">
      <div class="menu__buttons--mobile">
        <NavigationMenu :username :is-authorized :total-products is-mobile />
      </div>
    </ModalUI>
    <IconSVG of="menu" size="large" clickable @click="switchModal(true)" />
    <RouterLink
      :to="{ name: 'cart', params: { username } }"
      class="menu__cart_wrapper"
      active-class="menu__icon--active"
      v-if="isAuthorized"
    >
      <IconSVG of="cart" size="large" clickable />
      <span v-if="totalProducts > 0" class="menu__cart_badge">{{
        totalProducts > 9 ? "9+" : totalProducts
      }}</span>
    </RouterLink>
  </menu>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "@/modules/user/store";
import { useCartStore } from "@/modules/cart/store";
import ModalUI from "@/components/ui/ModalUI.vue";
import IconSVG from "@/components/IconSVG.vue";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import NavigationMenu from "@/modules/navigation/components/NavigationMenu.vue";
const userStore = useUserStore();
const cartStore = useCartStore();
const route = useRoute();

const { username, isAuthorized } = storeToRefs(userStore);
const { totalProducts } = cartStore;

const isBurgerVisible = ref<boolean>(false);

const currentRoute = computed(() => {
  return route.name;
});

function switchModal(value: boolean) {
  isBurgerVisible.value = value;
}
</script>
<style>
.menu {
  display: inline-block;
}

.menu--mobile {
  display: none;
  flex-flow: row nowrap;
  gap: 16px;
}

.menu__content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.menu__cart_wrapper {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu__cart_badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: color-mix(in srgb, var(--error-color) 60%, red);
  color: white;
  border-radius: 50%;
  padding: 0px 2px;
  font-size: 12px;
  font-weight: bold;
  max-width: 12px;
  max-height: 12px;
  text-align: center;
  line-height: 1;
  pointer-events: none;
}

.menu__button--active .button {
  border-bottom: 3px var(--primary-color) solid;
}

.menu__icon--active svg * {
  fill: var(--primary-color);
}

.menu__buttons--mobile {
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
}
.menu__cart_wrapper--mobile {
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
}
.menu__buttons--mobile .menu__content {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

@media (max-width: 768px) {
  .menu {
    display: none;
  }
  .menu--mobile {
    display: flex;
  }
}
</style>
