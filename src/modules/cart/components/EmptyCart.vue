<template>
  <v-container class="d-flex flex-column align-center justify-center ga-6 py-16">
    <v-icon icon="mdi-cart" size="128" color="secondary" class="empty-cart-icon"></v-icon>
    <p class="text-h5 text-medium-emphasis">Your cart is empty</p>
    <v-btn
      color="primary"
      size="large"
      :to="{ name: 'catalogue' }"
      rounded="0"
      height="50"
      elevation="0"
      class="text-none"
    >
      Go to Catalogue
    </v-btn>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
.empty-cart-icon {
  opacity: 0.2;
}
</style>
