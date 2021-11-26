<template>
  <main class="home-container">
    <div class="center-wrapper">
      <TopDisplaySection></TopDisplaySection>
      <ExamplesSection></ExamplesSection>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import TopDisplaySection from '@/components/home/TopDisplaySection.vue'
import ExamplesSection from '@/components/home/ExamplesSection.vue'

export default Vue.extend({
  components: {
    TopDisplaySection,
    ExamplesSection,
  },
})
</script>

<style lang="scss">
main.home-container {
  display: flex;
  justify-content: center;
  padding: 128px 0 64px;
}
.center-wrapper {
  width: 1200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 64px;
}
</style>
