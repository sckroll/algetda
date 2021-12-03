<template>
  <D3Network
    :net-nodes="nodes"
    :net-links="links"
    :options="options"
    class="network-container"
  ></D3Network>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import D3Network from 'vue-d3-network'
import colors from '@/assets/scss/exportedVariables.scss'

interface NodeObject {
  id: number
  name?: string
  _color?: string
  _cssClass?: string
  _labelClass?: string
  svgSym?: SVGElement
  _size?: number
  _width?: number
  _height?: number
  _svgAttrs?: any
}
interface LinkObject {
  id?: number
  name?: string
  tid: number
  sid: number
  _color?: string
  _svgAttrs?: any
}

export default Vue.extend({
  components: {
    D3Network,
  },
  props: {
    nodes: {
      type: Array as PropType<NodeObject[]>,
      required: true,
    },
    links: {
      type: Array as PropType<LinkObject[]>,
      required: true,
    },
  },
  data() {
    return {
      options: {
        nodeSize: 48,
        linkWidth: 4,
        nodeLabels: true,
        linkLabels: true,
        fontSize: 20,
        force: 4096,
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.network-container {
  width: 100%;
  height: 100%;
}
</style>
