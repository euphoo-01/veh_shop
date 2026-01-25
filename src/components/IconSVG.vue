<template>
  <span v-html="svgCode" :class="['icon', `icon-${size}`]"></span>
</template>
<script>
import { checkIfIconNameExist, getSvgIconCode } from '@/services/icons/iconsHelper';
export default {
  props: {
    of: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'small',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value);
      },
    },
  },
  computed: {
    svgCode() {
      return getSvgIconCode(this.of);
    },
  },
  watch: {
    of(newVal) {
      if (!checkIfIconNameExist(newVal)) {
        console.warn(`Иконки ${newVal} не существует!`);
      }
    },
  },
};
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
}

.icon:hover svg * {
  fill: var(--primary-color);
}

.icon:active svg * {
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
</style>
