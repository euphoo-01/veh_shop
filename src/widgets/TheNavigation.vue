<template>
  <menu class="menu">
    <nav class="menu__content">
      <ButtonUI @click="goToHome" :id="currentRoute === 'home' && 'active'" secondary
        >Home</ButtonUI
      >
      <ButtonUI @click="goToCatalogue" :id="currentRoute === 'catalogue' && 'active'" secondary
        >Catalogue</ButtonUI
      >
      <ButtonUI
        @click="goToAccount"
        :id="currentRoute === 'account' && 'active'"
        secondary
        v-if="isAuthorized"
      >
        Account
      </ButtonUI>
      <ButtonUI @click="goToLogin" :id="currentRoute === 'login' && 'active'" secondary v-else>
        Login
      </ButtonUI>
      <IconSVG
        v-if="isAuthorized"
        of="cart"
        size="large"
        :id="currentRoute === 'cart' && 'active-icon'"
        @click="goToCart"
        clickable
      />
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
    ...mapGetters({ username: 'user/username', isAuthorized: 'user/isAuthorized' }),
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

#active {
  border-bottom: 3px var(--primary-color) solid;
}

#active-icon svg * {
  fill: var(--primary-color);
}
</style>
