<template>
  <div
    class="tooltip"
    :class="{ show: value, [horizontal]: horizontal }"
    :style="`margin-top: ${offsetHeight}px;`"
  >
    <div
      v-if="vertical === 'up'"
      class="arrow-container"
      :style="`width: ${elementWidth}px`"
    >
      <div class="arrow up"></div>
    </div>
    <div class="content"><slot></slot></div>
    <div
      v-if="vertical === 'down'"
      class="arrow-container"
      :style="`width: ${elementWidth}px`"
    >
      <div class="arrow down"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: String,
      default: 'up',
    },
    horizontal: {
      type: String,
      default: 'center',
    },
    elementWidth: {
      type: Number,
      default: 0,
    },
    elementHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tooltipHeight: 0,
    }
  },
  computed: {
    offsetHeight(): number {
      if (this.vertical === 'up') {
        return this.elementHeight
      } else {
        return -this.tooltipHeight
      }
    },
  },
  mounted() {
    this.tooltipHeight = (this.$el as HTMLDivElement).clientHeight
  },
})
</script>

<style lang="scss" scoped>
$tooltip-background: rgba($color-grey-3, 0.7);

.tooltip {
  z-index: -1;
  position: absolute;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: all 0.15s ease;

  &.show {
    z-index: 5;
    opacity: 1;
    transition: all 0.15s ease;
  }
  &.left {
    align-items: flex-start;
  }
  &.center {
    align-items: center;
  }
  &.right {
    align-items: flex-end;
  }
}
.content {
  padding: 16px;
  box-sizing: border-box;
  font-size: 0.9em;
  background-color: $tooltip-background;
  backdrop-filter: blur(6px);
}
.arrow-container {
  display: flex;
  justify-content: center;
}
.arrow {
  width: 32px;
  height: 32px;
  background-color: $tooltip-background;
  backdrop-filter: blur(6px);

  &.up {
    clip-path: polygon(0% 101%, 50% 0%, 100% 101%);
  }
  &.down {
    clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
  }
}
</style>
