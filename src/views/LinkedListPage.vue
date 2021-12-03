<template>
  <BaseLinkedList :values="values"></BaseLinkedList>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseLinkedList from '@/components/common/BaseLinkedList.vue'

export default Vue.extend({
  components: {
    BaseLinkedList,
  },
  data() {
    return {
      values: [1, 2, 3, 4, 5],
    }
  },
})
</script>

<style lang="scss"></style>
