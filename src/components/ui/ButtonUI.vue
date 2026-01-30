<template>
  <button
    :="$attrs"
    class="button"
    :class="{
      primary: this.primary,
      secondary: this.secondary,
      disabled: this.disabled,
      'secondary-active': this.active && this.secondary,
    }"
  >
    <slot class="button__content"></slot>
  </button>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    primary: {
      type: Boolean,
    },
    secondary: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    active: {
      type: Boolean,
    },
  },
};
</script>
<style scoped>
.button {
  min-width: 150px;
  width: fit-content;
  min-height: 50px;
  padding: 4px 8px;

  border-radius: 0px;
  border: none;
  color: var(--text-color);

  transition:
    background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1),
    border 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.button__content {
  text-align: center;
  font-size: 16px;
  color: var(--text-color);
}

.disabled {
  background-color: var(--secondary-color);
}

.primary {
  background-color: var(--primary-color);
  transition: background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.primary:hover {
  background-color: var(--secondary-color);
  cursor: pointer;
}

.secondary {
  background-color: transparent;
}

.secondary:hover {
  border-bottom: 3px var(--primary-color) solid;
  background-color: color-mix(in srgb, var(--primary-color) 20%, transparent);
  cursor: pointer;
}
</style>
