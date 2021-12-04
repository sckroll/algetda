<template>
  <BaseNetwork directional :nodes="nodes" :links="links"></BaseNetwork>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import BaseNetwork from '@/components/common/BaseNetwork.vue'
import { NodeObject, LinkObject } from '@/network-graph.d'

export default Vue.extend({
  components: {
    BaseNetwork,
  },
  props: {
    values: {
      type: Array as PropType<(number | string)[]>,
      required: true,
    },
  },
  computed: {
    nodes(): NodeObject[] {
      return this.values.map((value, index) => ({
        id: index,
        name: value,
        fx:
          ((window.innerWidth - 400 * 2) / (this.values.length - 1)) * index +
          400,
        fy: window.innerHeight / 2,
        pinned: true,
      }))
    },
    links(): LinkObject[] {
      return this.values
        .slice(0, this.values.length - 1)
        .map((_, index) => ({ sid: index, tid: index + 1 }))
    },
  },
})
</script>

<style lang="scss" scoped></style>
