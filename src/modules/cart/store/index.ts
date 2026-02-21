import type { CartItem } from "../types";
import type { Product } from "@/modules/vehicle/types";
import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref<CartItem[]>([]);

  watch(
    cartItems,
    (newItems) => {
      localStorage.setItem("cart", JSON.stringify(newItems));
    },
    { deep: true },
  );

  function addItem(product: Product): void {
    let existingItem: CartItem | undefined;
    existingItem = cartItems.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
  }
  function removeItem(productId: number): void {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId);
  }
  function updateQuantity({ id, quantity }: Pick<Product, "id"> & Pick<CartItem, "quantity">) {
    const item: CartItem | undefined = cartItems.value.find((item) => item.id === id);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        cartItems.value = cartItems.value.filter((item) => item.id !== id);
      }
    }
  }
  function clearCart(): void {
    cartItems.value = [];
  }

  function initCart(): void {
    const persistCart = localStorage.getItem("cart");
    if (persistCart) {
      try {
        cartItems.value = JSON.parse(persistCart) as CartItem[];
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    }
  }

  const totalPrice = computed(() => {
    return cartItems.value.reduce((acc, val) => (acc += val.price * val.quantity), 0);
  });

  const totalItems = computed(() => {
    return cartItems.value.length;
  });

  const totalProducts = computed(() => {
    return cartItems.value.reduce((acc, val) => (acc += val.quantity), 0);
  });

  return {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    initCart,
    totalPrice,
    totalItems,
    totalProducts,
  };
});
