<template>
  <Transition name="fade-bottom">
    <div class="form__backdrop" @click="hide" v-if="!isStatic && isVisible">
      <form class="form__content" @submit.prevent @click.stop v-bind="$attrs">
        <slot></slot>
      </form>
    </div>
  </Transition>
  <form class="form__content" @submit.prevent v-if="isStatic" v-bind="$attrs">
    <slot></slot>
  </form>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    isStatic: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['switch-modal'],
  methods: {
    hide() {
      this.$emit('switch-modal', false);
    },
  },
};
</script>
<style scoped>
.form__backdrop {
  z-index: 999;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.form__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin: 0 auto;
  min-width: 250px;
  height: auto;
  border-bottom: 3px var(--secondary-color) solid;
  border-top: 3px var(--secondary-color) solid;
  padding: 16px;
  gap: 8px;
  background-color: var(--background-color);
}
</style>
