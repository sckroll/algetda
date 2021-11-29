<template>
  <div class="tooltip-container">
    <BaseTooltip
      v-if="vertical === 'down'"
      v-model="tooltip"
      :vertical="vertical"
      :horizontal="horizontal"
      :element-width="elementWidth"
    >
      <slot name="content"></slot>
    </BaseTooltip>
    <div
      class="tooltip-target"
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
  },
  data() {
    return {
      tooltip: false,
      elementWidth: 0,
    }
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
    this.elementWidth = (this.$refs.tooltip as HTMLDivElement).clientWidth
  },
  methods: {
    showTooltip() {
      this.tooltip = true
    },
    hideTooltip() {
      this.tooltip = false
    },
  },
})
</script>

<style lang="scss" scoped>
.tooltip-container {
  /* position: relative; */
}
</style>
