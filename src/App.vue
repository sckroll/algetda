<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <router-view />
    <transition name="fade-drawer">
      <DrawerMenu v-if="drawer"></DrawerMenu>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import DrawerMenu from '@/components/DrawerMenu.vue'

export default Vue.extend({
  components: {
    HeaderBar,
    DrawerMenu,
  },
  computed: {
    drawer(): boolean {
      return this.$store.state.drawer
    },
  },
})
</script>
