<template>
  <menu class="menu">
    <nav class="menu__content">
      <ButtonUI
        @click="goToHome"
        :id="currentRoute === 'home' ? 'menu__button--active' : ''"
        secondary
        >Home</ButtonUI
      >
      <ButtonUI
        @click="goToCatalogue"
        :id="currentRoute === 'catalogue' ? 'menu__button--active' : ''"
        secondary
        >Catalogue</ButtonUI
      >
      <ButtonUI
        @click="goToAccount"
        :id="currentRoute === 'account' ? 'menu__button--active' : ''"
        secondary
        v-if="isAuthorized"
      >
        Account
      </ButtonUI>
      <ButtonUI
        @click="goToLogin"
        :id="currentRoute === 'login' ? 'menu__button--active' : ''"
        secondary
        v-else
      >
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
  <menu class="menu--mobile">
    <ModalUI @switch-modal="switchModal(false)" :is-visible="isBurgerVisible">
      <div class="menu__buttons--mobile">
        <nav class="menu__content">
          <ButtonUI @click="goToHome" :id="currentRoute === 'home' ? 'active' : ''" secondary
            >Home</ButtonUI
          >
          <ButtonUI
            @click="goToCatalogue"
            :id="currentRoute === 'catalogue' ? 'active' : ''"
            secondary
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
          <ButtonUI
            @click="goToLogin"
            :id="currentRoute === 'login' ? 'active' : ''"
            secondary
            v-else
          >
            Login
          </ButtonUI>
        </nav>
      </div>
    </ModalUI>
    <IconSVG of="menu" size="large" clickable @click="switchModal(true)" />
    <div class="menu__cart_wrapper--mobile" v-if="isAuthorized" @click="goToCart">
      <IconSVG
        of="cart"
        size="large"
        :id="currentRoute === 'cart' ? 'cart_icon--active' : ''"
        clickable
      />
      <span v-if="cartItemCount > 0" class="menu__cart_badge">{{ cartItemCount }}</span>
    </div>
  </menu>
</template>
<script>
import { mapGetters } from "vuex";
import { useUserStore } from "@/modules/user/store/userStore";
import { mapState } from "pinia";
import ModalUI from "@/components/ui/ModalUI.vue";
import ButtonUI from "@/components/ui/ButtonUI.vue";
import IconSVG from "@/components/IconSVG.vue";
export default {
  components: { ButtonUI, IconSVG, ModalUI },
  computed: {
    ...mapGetters({
      cartItemCount: "cart/cartItemCount",
    }),
    ...mapState(useUserStore, ["username", "isAuthorized"]),
    currentRoute() {
      return this.$route.name;
    },
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "home" });
      this.switchModal(false);
    },
    goToCatalogue() {
      this.$router.push({ name: "catalogue" });
      this.switchModal(false);
    },
    goToAccount() {
      this.$router.push({ name: "account", params: { username: this.username } });
      this.switchModal(false);
    },
    goToCart() {
      this.$router.push({ name: "cart", params: { username: this.username } });
      this.switchModal(false);
    },
    goToLogin() {
      this.$router.push({ name: "login" });
      this.switchModal(false);
    },
    switchModal(value) {
      this.isBurgerVisible = value;
    },
  },
  data() {
    return {
      isBurgerVisible: false,
    };
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

#menu__button--active {
  border-bottom: 3px var(--primary-color) solid;
}

#cart_icon--active svg * {
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
.menu--mobile {
  display: none;
  flex-flow: row nowrap;
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
