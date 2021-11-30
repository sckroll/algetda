<template>
  <header class="header-bar">
    <div class="left">
      <div class="icon-container" @click="openDrawer">
        <IconBase>
          <IconDrawer></IconDrawer>
        </IconBase>
      </div>
      <Logo></Logo>
      <div class="curr-algorithm"></div>
    </div>
    <div class="right">
      <div class="icon-container" @click="openSettingsPopup">
        <IconBase>
          <IconSettings></IconSettings>
        </IconBase>
      </div>
      <a href="http://sckroll.github.io" class="icon-container">
        <IconBase>
          <IconHome></IconHome>
        </IconBase>
      </a>
      <a href="https://github.com/sckroll/algetda" class="icon-container">
        <IconBase viewBox="0 0 496 512" color="black">
          <IconGitHub></IconGitHub>
        </IconBase>
      </a>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '@/components/common/Logo.vue'
import IconBase from '@/components/icons/IconBase.vue'
import IconDrawer from '@/components/icons/IconDrawer.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconGitHub from '@/components/icons/IconGitHub.vue'

export default Vue.extend({
  components: {
    Logo,
    IconBase,
    IconDrawer,
    IconSettings,
    IconHome,
    IconGitHub,
  },
  methods: {
    openDrawer() {
      this.$store.commit('OPEN_DRAWER')
    },
    openSettingsPopup() {
      this.$store.commit('OPEN_SETTINGS_POPUP')
    },
  },
})
</script>

<style lang="scss" scoped>
header.header-bar {
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 64px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba($color-grey-4, 0.7);
  backdrop-filter: blur(6px);
  box-shadow: 0 0 4px 2px rgba(black, 0.3);

  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
.icon-container {
  height: 32px;
}
svg {
  cursor: pointer;

  &:hover {
    path {
      fill: black;
    }
  }
}
a {
  border-bottom: none;

  &:hover {
    border-bottom: none;
  }
}
</style>
