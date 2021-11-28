<template>
  <div class="tooltip">
    <div
      v-if="verticalPos === 'up'"
      class="arrow-container"
      :class="{ [horizontalPos]: horizontalPos }"
    >
      <div class="arrow up"></div>
    </div>
    <div class="content"><slot></slot></div>
    <div
      v-if="verticalPos === 'down'"
      class="arrow-container"
      :class="{ [horizontalPos]: horizontalPos }"
    >
      <div class="arrow down"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
  computed: {
    verticalPos(): string {
      return this.arrow.split(' ')[0]
    },
    horizontalPos(): string {
      return this.arrow.split(' ')[1]
    },
  },
})
</script>

<style lang="scss" scoped>
.tooltip {
  display: flex;
  flex-direction: column;
}
.content {
  padding: 16px;
  box-sizing: border-box;
  font-size: 0.9em;
  background-color: rgba($color-grey-4, 0.7);
}
.arrow-container {
  display: flex;
  padding: 0 32px;

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
.arrow {
  width: 0;
  height: 0;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;

  &.up {
    border-bottom: 32px solid rgba($color-grey-4, 0.7);
  }
  &.down {
    border-top: 32px solid rgba($color-grey-4, 0.7);
  }
}
</style>
