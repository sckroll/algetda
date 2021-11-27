<template>
  <main class="main-container">
    <ControlArea></ControlArea>
    <section class="visual-area">
      <router-view></router-view>
    </section>
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
section.visual-area {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
