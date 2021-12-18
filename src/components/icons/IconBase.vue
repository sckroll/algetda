<template>
  <a v-if="link" :href="link" class="icon-container" :class="{ disabled }">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :viewBox="viewBox"
      :aria-labelledby="iconName"
      class="click-safe"
      :fill="color"
      :stroke="stroke"
    >
      <slot />
    </svg>
  </a>
  <div v-else class="icon-container" :class="{ disabled }" @click="handleClick">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :viewBox="viewBox"
      :aria-labelledby="iconName"
      class="click-safe"
      :fill="color"
      :stroke="stroke"
    >
      <slot />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    link: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
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
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
})
</script>

<style lang="scss" scoped>
.icon-container {
  height: 32px;

  * {
    transition: all 0.15s ease;
  }
  svg {
    cursor: pointer;

    &:hover {
      * {
        fill: black;
      }
    }
  }
  &.disabled {
    svg {
      cursor: default;
    }
    * {
      stroke: $color-grey-2;
    }
    &:hover {
      * {
        fill: transparent;
      }
    }
  }
}
</style>
