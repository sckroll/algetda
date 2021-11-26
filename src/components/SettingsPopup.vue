<template>
  <div class="overlay" @click.self="closeSettingsPopup">
    <section class="settings-container">
      <header class="popup-header">
        <h2>Settings</h2>
        <div class="close-button" @click="closeSettingsPopup"></div>
      </header>
      <nav class="tabs">
        <div class="tab selected">Tab 1</div>
        <div class="tab">Tab 2</div>
        <div class="tab">Tab 3</div>
      </nav>
      <div class="popup-content"></div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    closeSettingsPopup() {
      this.$store.commit('CLOSE_SETTINGS_POPUP')
    },
  },
})
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
section {
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  padding: 32px;
  box-sizing: border-box;
  background-color: rgba($color-grey-4, 0.7);
  backdrop-filter: blur(8px);
}
header.popup-header {
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
.popup-content {
  background-color: $color-grey-3;
  height: 100%;
}
nav.tabs {
  display: flex;
  gap: 16px;
  font-size: 1.25em;

  .tab {
    cursor: pointer;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
    transition: all 0.15s ease;

    &.selected,
    &:hover {
      border-bottom: 2px solid $color-primary;
      transition: all 0.15s ease;
    }
    &:active {
      color: $color-primary;
      transition: all 0.15s ease;
    }
  }
}
</style>
