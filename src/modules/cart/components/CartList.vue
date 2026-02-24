<template>
  <div class="d-flex flex-column ga-4">
    <CartItem v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<script setup lang="ts">
import CartItem from "./CartItem.vue";
import type { CartItem as CartItemType } from "../types";
import { toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    items: CartItemType[];
  }>(),
  {
    items: () => [],
  },
);
const { items } = toRefs(props);
</script>

<style scoped></style>
