<template>
  <svg v-html="svgCode" :class="['icon', `icon-${size}`]"></svg>
</template>
<script>
import { getSvgIconCode } from '@/services/icons/iconsHelper';
export default {
  name: 'IconSVG',
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
};
</script>
<style scoped>
.icon {
  box-sizing: border-box;
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  padding: 0;
  margin: 0;
}

.icon-small {
  height: 12px;
  width: 12px;
  min-height: 12px;
  min-width: 12px;
}

.icon-medium {
  height: 16px;
  width: 16px;
  min-height: 16px;
  min-width: 16px;
}

.icon-large {
  height: 24px;
  width: 24px;
  min-height: 24px;
  min-width: 24px;
}
</style>
