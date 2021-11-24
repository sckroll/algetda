<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'

export default Vue.extend({
  components: {
    HeaderBar,
  },
})
</script>

<style lang="scss">
* {
  font-family: 'Poppins', 'Spoqa Han Sans Neo', sans-serif;
}
</style>
