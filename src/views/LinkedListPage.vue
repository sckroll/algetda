<template>
  <BaseLinkedList
    :values="values"
    @node-add="addNode"
    @node-change="changeNode"
  ></BaseLinkedList>
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
      values: ['1', '2', '3', '4', '5'],
    }
  },
  methods: {
    addNode(value: string, nextNodeIndex: number) {
      this.values.splice(nextNodeIndex, 0, value)
    },
    changeNode(value: string, index: number) {
      this.values[index] = value
    },
  },
})
</script>
