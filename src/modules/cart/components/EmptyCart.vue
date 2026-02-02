<template>
  <div class="cart--empty">
    <IconSVG of="cart" size="extralarge" class="cart__empty_icon" />
    <p class="cart__empty_text">Your cart is empty</p>
    <ButtonUI primary @click="$router.push({ name: 'catalogue' })"> Go to Catalogue </ButtonUI>
  </div>
</template>

<script>
import ButtonUI from '@/components/ui/ButtonUI.vue';
import IconSVG from '@/components/IconSVG.vue';

export default {
  name: 'EmptyCart',
  components: {
    ButtonUI,
    IconSVG,
  },
};
</script>

<style scoped>
.cart--empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
  gap: 24px;
}

.cart__empty_icon {
  opacity: 0.2;
}

.cart__empty_text {
  font-size: 20px;
  color: var(--secondary-color);
}
</style>
