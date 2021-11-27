<template>
  <div
    class="toggle-switch"
    :class="{ toggled: value, disabled }"
    @click="handleToggle"
  >
    <div class="knob" :class="{ toggled: value, disabled }"></div>
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleToggle() {
      if (this.disabled) return
      this.$emit('input', !this.value)
    },
  },
})
</script>

<style lang="scss" scoped>
.toggle-switch {
  cursor: pointer;
  width: 48px;
  height: 24px;
  padding: 3px;
  box-sizing: border-box;
  border: 3px solid $color-grey-1;
  border-radius: 24px;
  display: flex;
  align-items: center;
  background-color: $color-grey-3;
  transition: all 0.15s ease;

  &.toggled {
    border: 3px solid $color-secondary;
    background-color: $color-primary;
    transition: all 0.15s ease;
  }
  &.disabled {
    cursor: default;
    border: 3px solid $color-grey-3;
    background-color: $color-grey-4;
  }
}
.knob {
  width: 12px;
  height: 12px;
  border-radius: 7px;
  background-color: $color-secondary;
  transition: all 0.15s ease;

  &.toggled {
    transform: translateX(24px);
    transition: all 0.15s ease;
  }
  &.disabled {
    background-color: $color-grey-3;
  }
}
</style>
