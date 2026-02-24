<template>
  <v-card variant="outlined" color="surface-light" class="pa-4 text-high-emphasis" rounded="0">
    <v-row no-gutters align="center">
      <v-col cols="12" sm="auto" class="d-flex justify-center mb-4 mb-sm-0 mr-sm-6">
        <v-sheet
          width="100"
          height="100"
          color="surface-light"
          class="d-flex align-center justify-center cursor-pointer"
          @click="goToProduct(item.id)"
        >
          <v-img
            :src="item.thumbnail"
            :alt="item.title"
            width="100%"
            height="100%"
            class="ma-2"
            contain
          />
        </v-sheet>
      </v-col>

      <v-col cols="12" sm class="mb-4 mb-sm-0">
        <div class="d-flex flex-column align-center align-sm-start text-center text-sm-left">
          <h3
            class="text-h6 font-weight-bold mb-1 cursor-pointer text-decoration-underline text-primary-hover"
            @click="goToProduct(item.id)"
          >
            {{ item.title }}
          </h3>
          <p class="text-subtitle-2 text-medium-emphasis mb-1">{{ item.brand }}</p>
          <p class="text-body-1 font-weight-bold">{{ item.price }} $</p>
        </div>
      </v-col>

      <v-col cols="12" sm="auto" class="mb-4 mb-sm-0 mr-sm-6">
        <div class="d-flex flex-column align-center">
          <div class="d-flex align-center border rounded-0 pa-1 mb-2">
            <v-btn
              icon="mdi-minus"
              variant="text"
              density="compact"
              size="small"
              color="high-emphasis"
              @click="updateQuantity({ id: item.id, quantity: item.quantity - 1 })"
              :disabled="item.quantity <= 1"
            ></v-btn>
            <span
              class="text-body-1 font-weight-bold mx-3 text-high-emphasis"
              style="min-width: 20px; text-align: center"
            >
              {{ item.quantity }}
            </span>
            <v-btn
              icon="mdi-plus"
              variant="text"
              density="compact"
              size="small"
              color="high-emphasis"
              @click="updateQuantity({ id: item.id, quantity: item.quantity + 1 })"
            ></v-btn>
          </div>
          <v-btn
            variant="text"
            color="error"
            density="compact"
            class="text-caption text-decoration-underline text-none px-0 text-error-hover"
            height="auto"
            @click="removeItem(item.id)"
          >
            Remove
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" sm="auto" class="text-center text-sm-right">
        <p class="text-h6 font-weight-bold mb-0" style="min-width: 100px">
          {{ (item.price * item.quantity).toFixed(2) }} $
        </p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { useCartStore } from "../store";
import type { Product } from "@/modules/vehicle/types";
import { useRouter } from "vue-router";
import { toRefs } from "vue";
import type { CartItem } from "../types";

const router = useRouter();
const cartStore = useCartStore();

const props = defineProps<{ item: CartItem }>();
const { item } = toRefs(props);
const { removeItem, updateQuantity } = cartStore;

function goToProduct(id: Product["id"]) {
  router.push({ name: "product", params: { id } });
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.text-primary-hover:hover {
  color: rgb(var(--v-theme-primary));
}

.text-error-hover:hover {
  color: rgb(var(--v-theme-error)) !important;
}
</style>
