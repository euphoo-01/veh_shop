<template>
  <input
    type="text"
    class="input"
    :value="modelValue"
    @input="(event) => $emit('update:modelValue', event.target.value)"
  />
</template>
<script>
export default {
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
};
</script>
<style scoped>
.input {
  background-color: white;
  color: var(--secondary-color);
  border: none;
  border-bottom: 3px var(--secondary-color) solid;
  min-width: 200px;
  min-height: 50px;
  font-size: 16px;
  padding: 0 16px;
  border-radius: 0;
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.input:focus {
  border-bottom: 3px var(--primary-color) solid;
  color: black;
  outline: none;
  box-shadow: 0 0 3px -1px var(--secondary-color);
}
</style>
