<template>
  <label class="input-container" :class="{ vertical }">
    <slot></slot>
    <input
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="{ disabled }"
      :value="value"
      @input="handleInput"
    />
  </label>
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
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleInput({ target }: InputEvent) {
      this.$emit('input', (target as HTMLInputElement).value)
    },
  },
})
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;

  &.vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}
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
}
</style>
