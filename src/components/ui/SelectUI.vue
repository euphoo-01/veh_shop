<template>
  <select
    :value="modelValue"
    @change="(event) => $emit('update:modelValue', event.target.value)"
    class="select__input"
    aria-label="Select option"
  >
    <option value="" disabled :aria-label="placeholder">{{ placeholder }}</option>
    <slot></slot>
  </select>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Select:',
    },
  },
  emits: ['update:modelValue'],
};
</script>
<style scoped>
.select__input {
  min-width: 300px;
  height: 50px;
  padding: 0px 16px;
  background-color: var(--background-color);
  color: var(--secondary-color);
  border: none;
  border-bottom: 3px solid var(--secondary-color);
  font-size: 16px;
  cursor: pointer;
  outline: none;
  transition:
    border-color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1),
    box-shadow 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);

  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23134252' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}

.select__input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 3px -1px var(--secondary-color);
}

.select__input:open {
  border-color: var(--primary-color);
  box-shadow: 0 0 3px -1px var(--secondary-color);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23134252' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='18 15 12 9 6 15'%3E%3C/polyline%3E%3C/svg%3E");
}
</style>
