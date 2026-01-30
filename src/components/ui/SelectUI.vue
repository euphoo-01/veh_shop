<template>
  <div class="select_wrapper">
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="select__input"
      aria-label="Select option"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <slot></slot>
    </select>
  </div>
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
.select_wrapper {
  position: relative;
  display: inline-block;
  min-width: 300px;
}

.select__input {
  width: 100%;
  height: 50px;
  padding: 0 40px 0 16px;
  background-color: var(--background-color);
  color: var(--secondary-color);
  border: none;
  border-bottom: 3px solid var(--secondary-color);
  font-size: 16px;
  cursor: pointer;
  outline: none;
  appearance: none;
  transition:
    border-color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1),
    box-shadow 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.select__input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 3px -1px var(--secondary-color);
  color: var(--text-color);
}

.select_wrapper::after {
  content: '';
  position: absolute;
  right: 12px;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid var(--secondary-color);
  pointer-events: none;
  transition: border-top-color 0.2s ease;
  transition:
    transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1),
    border 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.select_wrapper:focus-within::after {
  border-top-color: var(--primary-color);
  transform: rotate(180deg);
}
.select__input:focus + .select_wrapper::after {
  border-top-color: var(--primary-color);
}
</style>
