<template>
  <main class="main-container">
    <ControlArea></ControlArea>
    <h1>Main Page</h1>
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import ControlArea from '@/components/ControlArea.vue'

export default Vue.extend({
  components: {
    ControlArea,
  },
})
</script>

<style lang="scss">
main.main-container {
  padding-top: 64px;
}
</style>
