<template>
  <header class="header-bar">
    <div class="left">
      <div class="drawer-icon" @click="openDrawer"></div>
      <Logo></Logo>
      <div class="curr-algorithm"></div>
    </div>
    <div class="right">
      <div class="gear-icon"></div>
      <a href="http://sckroll.github.io" class="home-icon"></a>
      <a href="https://github.com/sckroll/algetda" class="github-icon"></a>
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
  methods: {
    openDrawer() {
      this.$store.commit('OPEN_DRAWER')
    },
  },
})
</script>

<style lang="scss" scoped>
header.header-bar {
  z-index: 5;
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
  cursor: pointer;
  width: 32px;
  height: 32px;
  background-color: $color-grey-3;
  border-bottom: none;

  &:hover {
    border-bottom: none;
  }
}
</style>
