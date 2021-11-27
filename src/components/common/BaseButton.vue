<template>
  <button :class="{ disabled }" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      if (this.disabled) return
      this.$emit('click')
    },
  },
})
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  padding: 8px 16px;
  background-color: rgba($color-primary, 0.5);
  border: 3px solid $color-secondary;
  backdrop-filter: blur(6px);
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba($color-primary, 0.9);
    border: 3px solid $color-secondary;
    transition: all 0.15s ease;
  }
  &:active {
    background-color: $color-primary;
    transition: all 0.15s ease;
  }
  &.disabled {
    cursor: default;
    background-color: rgba($color-grey-2, 0.5);
    border: 3px solid $color-grey-1;
  }
}
</style>
