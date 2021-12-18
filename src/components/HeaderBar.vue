<template>
  <header class="header-bar" :class="{ landing }">
    <div class="left-side">
      <IconBase @click="openDrawer">
        <IconDrawer></IconDrawer>
      </IconBase>
      <Logo></Logo>
      <div class="curr-structure">{{ currStructure }}</div>
    </div>
    <div class="right-side">
      <TooltipContainer arrow="up center">
        <template slot="element">
          <IconBase @click="openSettingsPopup">
            <IconSettings></IconSettings>
          </IconBase>
        </template>
        <template slot="content">설정</template>
      </TooltipContainer>
      <TooltipContainer arrow="up center">
        <template slot="element">
          <IconBase link="http://sckroll.github.io">
            <IconHome></IconHome>
          </IconBase>
        </template>
        <template slot="content">제작자 홈페이지</template>
      </TooltipContainer>
      <TooltipContainer arrow="up right">
        <template slot="element">
          <IconBase
            viewBox="0 0 496 512"
            color="black"
            link="https://github.com/sckroll/algetda"
          >
            <IconGitHub></IconGitHub>
          </IconBase>
        </template>
        <template slot="content">GitHub</template>
      </TooltipContainer>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '@/components/common/Logo.vue'
import TooltipContainer from '@/components/common/TooltipContainer.vue'
import IconBase from '@/components/icons/IconBase.vue'
import IconDrawer from '@/components/icons/IconDrawer.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconGitHub from '@/components/icons/IconGitHub.vue'

export default Vue.extend({
  components: {
    Logo,
    TooltipContainer,
    IconBase,
    IconDrawer,
    IconSettings,
    IconHome,
    IconGitHub,
  },
  computed: {
    landing(): boolean {
      return this.$route.path === '/'
    },
    currStructure(): string {
      return this.landing ? '' : this.$route.name?.split(' - ')[0] ?? ''
    },
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

  .left-side,
  .right-side {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  &.landing {
    background-color: rgba($color-grey-4, 0.7);
    backdrop-filter: blur(6px);
    box-shadow: 0 2px 4px 1px rgba(black, 0.25);
  }
}
.curr-structure {
  font-size: 1.5em;
  font-weight: 300;
}
a {
  border-bottom: none;

  &:hover {
    border-bottom: none;
  }
}
</style>
