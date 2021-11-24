<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <DrawerMenu></DrawerMenu>
    <router-view />
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
})
</script>
