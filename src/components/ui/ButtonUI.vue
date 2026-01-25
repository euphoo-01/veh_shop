<template>
  <button class="button">
    <slot class="button__content"></slot>
  </button>
</template>
<script>
export default {};
</script>
<style scoped>
.button {
  min-width: 150px;
  width: fit-content;
  min-height: 50px;
  padding: 4px 8px;

  border-radius: 16px;
  border: none;

  transition: background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.button__content {
  text-align: center;
  font-size: 16px;
  color: white;
}

.disabled {
  background-color: var(--secondary-color);
}

.primary {
  background-color: var(--primary-color);
}
</style>
