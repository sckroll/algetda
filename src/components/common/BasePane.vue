<template>
  <section class="pane-container">
    <header>
      <div class="title-area">
        <h2><slot name="title"></slot></h2>
        <div v-if="closeButton" class="close-button" @click="handleClose"></div>
      </div>
      <nav class="tabs" v-if="tabs">
        <div
          v-for="(tab, index) of tabs"
          :key="index"
          class="tab"
          :class="{ selected: selected === tab }"
          @click="changeTab(tab)"
        >
          {{ tab.name }}
        </div>
      </nav>
    </header>
    <div class="content">
      <template v-if="tabs">
        <keep-alive>
          <slot name="content"></slot>
        </keep-alive>
      </template>
      <slot v-else name="content"></slot>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

interface Tab {
  name: string
  component: string
}

export default Vue.extend({
  props: {
    closeButton: {
      type: Boolean,
      default: false,
    },
    tabs: {
      type: Array as PropType<Tab[]>,
    },
  },
  data() {
    return {
      selected: null as Tab | null,
    }
  },
  mounted() {
    if (this.tabs && this.tabs.length > 0) {
      this.selected = this.tabs[0]
    }
  },
  methods: {
    handleClose() {
      this.$emit('click')
    },
    changeTab(tab: Tab) {
      this.selected = tab
      this.$emit('tab-select', tab)
    },
  },
})
</script>

<style lang="scss" scoped>
section.pane-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  padding: 32px;
  box-sizing: border-box;
  background-color: rgba($color-grey-4, 0.7);
  backdrop-filter: blur(8px);
}
header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.title-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-button {
  cursor: pointer;
  width: 32px;
  height: 32px;
  background-color: $color-grey-3;
}
nav.tabs {
  display: flex;
  gap: 16px;
  font-size: 1.25em;

  .tab {
    cursor: pointer;
    padding: 4px 0;
    border-bottom: 3px solid transparent;
    transition: all 0.15s ease;

    &.selected,
    &:hover {
      border-bottom: 3px solid $color-primary;
      transition: all 0.15s ease;
    }
    &:active {
      color: $color-primary;
      transition: all 0.15s ease;
    }
  }
}
.content {
  height: 100%;
}
</style>
