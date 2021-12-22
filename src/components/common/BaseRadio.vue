<template>
  <div class="radio-group" :class="{ vertical }">
    <div v-for="(item, index) in items" :key="item.value" class="radio-item">
      <input
        type="radio"
        :name="group"
        :id="'radio-' + item.value"
        :value="item.value"
        :checked="index === 0"
        @change="handleChange"
      />
      <label :for="item.id">{{ item.label }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    items: {
      type: Array as PropType<{ value: string; label: string }[]>,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChange({ target }: Event) {
      this.$emit('change', (target as HTMLInputElement).value)
    },
  },
})
</script>

<style lang="scss" scoped>
.radio-group {
  display: flex;
  gap: 16px;

  &.vertical {
    display: block;
  }
}
.radio-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
input[type='radio'] {
  appearance: none;
  cursor: pointer;
  margin: 0;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: $color-grey-3;
  border: 3px solid $color-grey-2;
  transition: all 0.15s ease;

  &:checked {
    background-color: $color-primary;
    border: 3px solid $color-secondary;
    transition: all 0.15s ease;
  }
  &:hover {
    background-color: $color-secondary;
    transition: all 0.15s ease;
  }
}
</style>
