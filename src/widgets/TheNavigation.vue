<template>
  <menu class="menu">
    <nav class="menu__content">
      <ButtonUI @click="goToHome" :id="currentRoute === 'home' ? 'active' : ''" secondary
        >Home</ButtonUI
      >
      <ButtonUI @click="goToCatalogue" :id="currentRoute === 'catalogue' ? 'active' : ''" secondary
        >Catalogue</ButtonUI
      >
      <ButtonUI
        @click="goToAccount"
        :id="currentRoute === 'account' ? 'active' : ''"
        secondary
        v-if="isAuthorized"
      >
        Account
      </ButtonUI>
      <ButtonUI @click="goToLogin" :id="currentRoute === 'login' ? 'active' : ''" secondary v-else>
        Login
      </ButtonUI>
      <div class="menu__cart_wrapper" v-if="isAuthorized" @click="goToCart">
        <IconSVG
          of="cart"
          size="large"
          :id="currentRoute === 'cart' ? 'active-icon' : ''"
          clickable
        />
        <span v-if="cartItemCount > 0" class="menu__cart_badge">{{ cartItemCount }}</span>
      </div>
    </nav>
  </menu>
</template>
<script>
import { mapGetters } from 'vuex';
import ButtonUI from '@/components/ui/ButtonUI.vue';
import IconSVG from '@/components/IconSVG.vue';
export default {
  components: { ButtonUI, IconSVG },
  computed: {
    ...mapGetters({
      username: 'user/username',
      isAuthorized: 'user/isAuthorized',
      cartItemCount: 'cart/cartItemCount',
    }),
    currentRoute() {
      return this.$route.name;
    },
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'home' });
    },
    goToCatalogue() {
      this.$router.push({ name: 'catalogue' });
    },
    goToAccount() {
      this.$router.push({ name: 'account', params: { username: this.username } });
    },
    goToCart() {
      this.$router.push({ name: 'cart', params: { username: this.username } });
    },
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
<style>
.menu {
  display: inline-block;
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
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  max-width: 12px;
  max-height: 12px;
  text-align: center;
  line-height: 1;
  pointer-events: none;
}

#active {
  border-bottom: 3px var(--primary-color) solid;
}

#active-icon svg * {
  fill: var(--primary-color);
}
</style>
