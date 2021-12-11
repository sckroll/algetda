<template>
  <div class="tooltip-container" :class="{ [horizontal]: horizontal }">
    <BaseTooltip
      v-if="vertical === 'down'"
      v-model="tooltip"
      :vertical="vertical"
      :horizontal="horizontal"
      :element-width="elementWidth"
      :element-height="elementHeight"
      :error="error"
    >
      <slot name="content"></slot>
    </BaseTooltip>

    <div
      class="tooltip-target"
      :class="{ toggle }"
      @click.stop="toggleTooltip"
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
      ref="tooltip"
    >
      <slot name="element"></slot>
    </div>

    <BaseTooltip
      v-if="vertical === 'up'"
      v-model="tooltip"
      :vertical="vertical"
      :horizontal="horizontal"
      :element-width="elementWidth"
      :element-height="elementHeight"
      :error="error"
    >
      <slot name="content"></slot>
    </BaseTooltip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseTooltip from '@/components/common/BaseTooltip.vue'

export default Vue.extend({
  components: {
    BaseTooltip,
  },
  props: {
    arrow: {
      type: String,
      default: 'down center',
      validator: value => {
        const vertical = ['up', 'down']
        const horizontal = ['left', 'center', 'right']
        const splitted = value.split(' ')

        return (
          splitted.length === 2 &&
          vertical.includes(splitted[0]) &&
          horizontal.includes(splitted[1])
        )
      },
    },
    toggle: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tooltip: false,
      elementWidth: 0,
      elementHeight: 0,
    }
  },
  watch: {
    fixed: {
      immediate: true,
      handler(val) {
        this.tooltip = val
      },
    },
  },
  computed: {
    vertical(): string {
      return this.arrow.split(' ')[0]
    },
    horizontal(): string {
      return this.arrow.split(' ')[1]
    },
  },
  mounted() {
    const el = this.$refs.tooltip as HTMLDivElement

    this.elementWidth = el.clientWidth
    this.elementHeight = el.clientHeight
  },
  beforeDestroy() {
    window.removeEventListener('click', this.toggleClickHandler)
  },
  methods: {
    showTooltip() {
      if (this.fixed || this.toggle) return

      this.tooltip = true
    },
    hideTooltip() {
      if (this.fixed || this.toggle) return

      this.tooltip = false
    },
    toggleTooltip() {
      if (this.fixed || !this.toggle) return

      this.tooltip = !this.tooltip
      if (this.tooltip) {
        window.addEventListener('click', this.toggleClickHandler)
      } else {
        window.removeEventListener('click', this.toggleClickHandler)
      }
    },
    toggleClickHandler({ target }: MouseEvent) {
      if (!(target as HTMLElement).classList.contains('click-safe')) {
        this.toggleTooltip()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.tooltip-container {
  display: flex;

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
.tooltip-target {
  display: flex;
}
.toggle {
  cursor: pointer;
}
</style>
