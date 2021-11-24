<template>
  <header class="header-bar">
    <div class="left">
      <div class="drawer-icon"></div>
      <Logo></Logo>
      <div class="curr-algorithm"></div>
    </div>
    <div class="right">
      <div class="gear-icon"></div>
      <div class="home-icon"></div>
      <div class="github-icon"></div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '@/components/Logo.vue'

export default Vue.extend({
  components: {
    Logo,
  },
})
</script>

<style lang="scss" scoped>
header.header-bar {
  height: 64px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color-grey-4;

  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
.drawer-icon,
.gear-icon,
.home-icon,
.github-icon {
  width: 32px;
  height: 32px;
  background-color: $color-grey-3;
}
</style>
