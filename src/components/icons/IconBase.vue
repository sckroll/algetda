<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
  >
    <g :fill="color" :stroke="stroke">
      <slot />
    </g>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    viewBox: {
      type: String,
      default: '0 0 32 32',
    },
    iconName: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'transparent',
    },
    stroke: {
      type: String,
      default: 'black',
    },
    width: {
      type: [Number, String],
      default: 32,
    },
    height: {
      type: [Number, String],
      default: 32,
    },
  },
})
</script>

<style lang="scss" scoped>
* {
  transition: all 0.15s ease;
}
</style>
