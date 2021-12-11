<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="{ disabled, short }"
    class="click-safe"
    :value="value"
    @input="handleInput"
    @keypress="handleEnter"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    short: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleInput({ target }: InputEvent) {
      this.$emit('input', (target as HTMLInputElement).value)
    },
    handleEnter({ key }: KeyboardEvent) {
      if (key === 'Enter') {
        this.$emit('enter')
      }
    },
  },
})
</script>

<style lang="scss" scoped>
input {
  outline: none;
  padding: 4px 8px;
  border: 3px solid $color-grey-1;
  transition: all 0.15s ease;

  &:hover {
    border: 3px solid $color-primary;
    transition: all 0.15s ease;
  }
  &:active,
  &:focus {
    border: 3px solid $color-secondary;
    transition: all 0.15s ease;
  }
  &::placeholder {
    color: $color-grey-2;
  }
  &.disabled {
    border: 3px solid $color-grey-2;
    color: $color-grey-2;
    background-color: $color-grey-4;
  }
  &.short {
    width: 64px;
  }
}
</style>
