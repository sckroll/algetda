<template>
  <BaseLinkedList
    :values="values"
    @node-add="addNode"
    @node-change="changeNode"
    @node-remove="removeNode"
  ></BaseLinkedList>
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
      return JSON.parse(`[${this.$store.state.structureValue}]`).map(
        (value: number) => value.toString(),
      )
    },
  },
  methods: {
    addNode(value: string, nextNodeIndex: number) {
      this.values.splice(nextNodeIndex, 0, value)
    },
    changeNode(value: string, index: number) {
      this.values[index] = value
    },
    removeNode(index: number) {
      this.values.splice(index, 1)
    },
  },
})
</script>
