<template>
  <main class="home-container">
    <DisplaySection></DisplaySection>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import DisplaySection from '@/components/home/DisplaySection.vue'

export default Vue.extend({
  components: {
    DisplaySection,
  },
})
</script>

<style lang="scss">
main.home-container {
  padding: 128px 0 64px;
  text-align: center;
}
</style>
