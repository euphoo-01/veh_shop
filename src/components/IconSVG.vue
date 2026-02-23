<template>
  <span v-html="svgCode" :class="{ icon: true, [`icon-${size}`]: true, clickable }"></span>
</template>
<script setup lang="ts">
import { checkIfIconNameExist, getSvgIconCode } from "../modules/shared/services/iconsHelper";
import { computed, toRefs, type PropType } from "vue";

export type IconSize = "small" | "medium" | "large" | "extralarge";

const props = defineProps({
  of: {
    type: String,
    required: true,
    validator(value: string) {
      return checkIfIconNameExist(value);
    },
  },
  size: {
    type: String as PropType<IconSize>,
    default: "small",
    validator(value: string) {
      return ["small", "medium", "large", "extralarge"].includes(value);
    },
  },
  clickable: {
    type: Boolean,
    default: false,
  },
});
const { size, clickable } = toRefs(props);

const svgCode = computed(() => {
  return getSvgIconCode(props.of);
});
</script>
<style>
.icon {
  display: inline-block;
  transition: fill 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  padding: 0;
  margin: 0;
}

.icon svg * {
  transition: fill 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  fill: var(--text-color);
}

.clickable:hover svg * {
  fill: var(--primary-color);
}

.clickable {
  cursor: pointer;
}

.clickable:active svg * {
  fill: var(--secondary-color);
}

.icon-small svg {
  height: 12px;
  width: 12px;
  min-height: 12px;
  min-width: 12px;
}

.icon-medium svg {
  height: 16px;
  width: 16px;
  min-height: 16px;
  min-width: 16px;
}

.icon-large svg {
  height: 24px;
  width: 24px;
  min-height: 24px;
  min-width: 24px;
}

.icon-extralarge svg {
  height: 64px;
  width: 64px;
  min-height: 64px;
  min-width: 64px;
}
</style>
