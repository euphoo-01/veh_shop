<template>
  <div>
    <!-- Desktop Menu -->
    <div class="d-none d-md-flex align-center">
      <NavigationMenu
        :username="username"
        :is-authorized="isAuthorized"
        :total-products="totalProducts"
      />
    </div>

    <!-- Mobile Menu -->
    <div class="d-flex d-md-none align-center ga-4">
      <!-- Mobile Cart Icon -->
      <v-btn
        v-if="isAuthorized"
        :to="{ name: 'cart', params: { username } }"
        variant="text"
        icon
        color="on-surface"
        aria-label="Cart"
      >
        <v-badge
          v-if="totalProducts > 0"
          :content="totalProducts > 9 ? '9+' : totalProducts"
          color="error"
          offset-x="6"
          offset-y="6"
        >
          <v-icon icon="mdi-cart" size="large"></v-icon>
        </v-badge>
        <v-icon v-else icon="mdi-cart" size="large"></v-icon>
      </v-btn>

      <!-- Burger Menu -->
      <v-app-bar-nav-icon
        variant="text"
        @click="isBurgerVisible = true"
        aria-label="Menu"
        size="large"
      ></v-app-bar-nav-icon>

      <!-- Mobile Navigation Drawer (Modal) -->
      <v-dialog v-model="isBurgerVisible" fullscreen transition="dialog-bottom-transition">
        <v-card color="background" class="d-flex flex-column h-100">
          <v-toolbar color="surface" density="compact">
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" @click="isBurgerVisible = false"></v-btn>
          </v-toolbar>

          <v-card-text class="d-flex flex-column align-center justify-center fill-height">
            <NavigationMenu
              :username="username"
              :is-authorized="isAuthorized"
              :total-products="totalProducts"
              is-mobile
              @click="isBurgerVisible = false"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/modules/user/store";
import { useCartStore } from "@/modules/cart/store";
import NavigationMenu from "@/modules/navigation/components/NavigationMenu.vue";

const userStore = useUserStore();
const cartStore = useCartStore();

const { username, isAuthorized } = storeToRefs(userStore);
const { totalProducts } = storeToRefs(cartStore);

const isBurgerVisible = ref<boolean>(false);
</script>

<style scoped></style>
