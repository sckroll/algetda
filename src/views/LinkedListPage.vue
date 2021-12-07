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
      return this.$store.state.structureValue
    },
  },
  methods: {
    addNode(value: string, nextNodeIndex: number) {
      const added = [
        ...this.values.slice(0, nextNodeIndex),
        value,
        ...this.values.slice(nextNodeIndex),
      ]

      this.$store.commit('SET_STRUCTURE_VALUE', added)
    },
    changeNode(value: string, index: number) {
      const changed = this.values.slice()
      changed[index] = value

      this.$store.commit('SET_STRUCTURE_VALUE', changed)
    },
    removeNode(index: number) {
      const removed = [
        ...this.values.slice(0, index),
        ...this.values.slice(index + 1),
      ]

      this.$store.commit('SET_STRUCTURE_VALUE', removed)
    },
  },
})
</script>
