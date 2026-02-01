<template>
  <section class="error__wrapper">
    <h3 class="error__code">Error {{ error.status }}</h3>
    <p class="error__message">{{ error.message }}</p>
  </section>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      validator(value) {
        if (!value.message || !value.status) {
          return false;
        }
        return true;
      },
      required: true,
    },
    onCleanup: {
      type: Function,
      default: () => {},
    },
  },
  unmounted() {
    this.onCleanup();
  },
};
</script>
<style scoped>
.error__wrapper {
  background-color: var(--error-color);
  padding: 16px;
  max-width: 600px;
  margin: 16px auto;
}
.error__code,
.error__message {
  color: color-mix(in srgb, var(--error-color) 40%, black);
}
</style>
