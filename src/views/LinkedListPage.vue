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
  computed: {
    values(): string[] {
      return this.$store.state.structureValue
    },
  },
})
</script>
