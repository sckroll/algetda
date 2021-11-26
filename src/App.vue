<template>
  <div id="app">
    <transition name="fade-drawer">
      <DrawerMenu v-if="drawer"></DrawerMenu>
    </transition>
    <transition name="fade">
      <SettingsPopup v-if="settingsPopup"></SettingsPopup>
    </transition>

    <HeaderBar></HeaderBar>
    <router-view />
    <FooterBar v-if="isLanding"></FooterBar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import DrawerMenu from '@/components/DrawerMenu.vue'
import SettingsPopup from '@/components/SettingsPopup.vue'

export default Vue.extend({
  components: {
    HeaderBar,
    FooterBar,
    DrawerMenu,
    SettingsPopup,
  },
  computed: {
    drawer(): boolean {
      return this.$store.state.drawer
    },
    settingsPopup(): boolean {
      return this.$store.state.settingsPopup
    },
    isLanding(): boolean {
      return this.$route.path === '/'
    },
  },
})
</script>
