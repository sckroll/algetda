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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import DrawerMenu from '@/components/DrawerMenu.vue'
import SettingsPopup from '@/components/SettingsPopup.vue'

export default Vue.extend({
  components: {
    HeaderBar,
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
  },
})
</script>
