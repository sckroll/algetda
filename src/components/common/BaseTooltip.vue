<template>
  <transition name="fade">
    <div
      v-if="value"
      class="tooltip"
      :class="{ [horizontal]: horizontal }"
      :style="offset"
    >
      <div
        v-if="vertical === 'up'"
        class="arrow-container"
        :style="`width: ${elementWidth}px`"
      >
        <div class="arrow up click-safe"></div>
      </div>
      <div class="content click-safe"><slot></slot></div>
      <div
        v-if="vertical === 'down'"
        class="arrow-container"
        :style="`width: ${elementWidth}px`"
      >
        <div class="arrow down click-safe"></div>
      </div>
    </div>
  </transition>
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
      validator: val => ['up', 'down'].includes(val),
    },
    horizontal: {
      type: String,
      default: 'center',
      validator: val => ['left', 'center', 'right'].includes(val),
    },
    elementWidth: {
      type: Number,
      default: 0,
    },
    elementHeight: {
      type: Number,
      default: 0,
    },
    offsetX: {
      type: Number,
    },
    offsetY: {
      type: Number,
    },
  },
  data() {
    return {
      tooltipWidth: 0,
      tooltipHeight: 0,
      unwatcher: null as null | (() => void),
    }
  },
  computed: {
    offset(): string {
      if (this.vertical === 'up') {
        if (this.offsetX && this.offsetY) {
          const x = this.offsetX - this.tooltipWidth / 2
          const y = this.offsetY + 4
          return `left: ${x}px; top: ${y}px;`
        } else {
          return `margin-top: ${this.elementHeight}px;`
        }
      } else {
        if (this.offsetX && this.offsetY) {
          const x = this.offsetX - this.tooltipWidth / 2
          const y = this.offsetY - this.tooltipHeight - 4
          return `left: ${x}px; top: ${y}px;`
        } else {
          return `margin-top: ${-this.tooltipHeight}px;`
        }
      }
    },
  },
  mounted() {
    this.unwatcher = this.$watch('value', () => {
      this.tooltipWidth = (this.$el as HTMLDivElement).clientWidth
      this.tooltipHeight = (this.$el as HTMLDivElement).clientHeight

      if (this.unwatcher) {
        this.unwatcher()
      }
    })
  },
  beforeDestroy() {
    if (this.unwatcher) {
      this.unwatcher()
    }
  },
})
</script>

<style lang="scss" scoped>
$tooltip-background: rgba($color-grey-3, 0.7);

.tooltip {
  position: absolute;
  display: flex;
  flex-direction: column;

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
  display: flex;
  align-items: center;
  gap: 8px;
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
  width: 24px;
  height: 24px;
  background-color: $tooltip-background;
  backdrop-filter: blur(6px);

  &.up {
    clip-path: polygon(0% 105%, 50% 0%, 100% 105%);
  }
  &.down {
    clip-path: polygon(0% -5%, 50% 100%, 100% -5%);
  }
}
</style>
