<template>
  <div
    class="tooltip"
    :class="{ show: value }"
    :style="`margin-left: ${offset}px`"
  >
    <div
      v-if="vertical === 'up'"
      class="arrow-container"
      :class="{ [horizontal]: horizontal }"
    >
      <div class="arrow up"></div>
    </div>
    <div class="content"><slot></slot></div>
    <div
      v-if="vertical === 'down'"
      class="arrow-container"
      :class="{ [horizontal]: horizontal }"
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
  },
  data() {
    return {
      tooltipWidth: 0,
    }
  },
  computed: {
    offset(): number {
      return -(this.tooltipWidth - 12 - this.elementWidth) / 2
    },
  },
  mounted() {
    this.tooltipWidth = this.$el.clientWidth
    console.log(this.tooltipWidth)
  },
})
</script>

<style lang="scss" scoped>
.tooltip {
  z-index: 5;
  position: absolute;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: all 0.15s ease;

  &.show {
    opacity: 1;
    transition: all 0.15s ease;
  }
}
.content {
  padding: 16px;
  box-sizing: border-box;
  font-size: 0.9em;
  background-color: rgba($color-grey-4, 0.7);
  backdrop-filter: blur(6px);
}
.arrow-container {
  display: flex;
  padding: 0 32px;

  &.left {
    justify-content: flex-start;
  }
  &.center {
    justify-content: center;
  }
  &.right {
    justify-content: flex-end;
  }
}
.arrow {
  width: 32px;
  height: 32px;
  background-color: rgba($color-grey-4, 0.7);
  backdrop-filter: blur(6px);

  &.up {
    clip-path: polygon(0% 101%, 50% 0%, 100% 101%);
  }
  &.down {
    clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
  }
}
</style>
