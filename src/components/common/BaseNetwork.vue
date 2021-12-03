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
import { NodeObject, LinkObject } from '@/network-graph.d'

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
    directional: {
      type: Boolean,
      default: false,
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
  mounted() {
    if (this.directional) {
      this.addArrow()
    }
  },
  methods: {
    addArrow() {
      const defs = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'defs',
      )
      const marker = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'marker',
      )
      const polygon = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'polygon',
      )
      const linksGroup = this.$el.querySelector('#l-links')

      marker.setAttributeNS(null, 'id', 'arrow-head')
      marker.setAttributeNS(null, 'orient', 'auto')
      marker.setAttributeNS(null, 'markerWidth', '4')
      marker.setAttributeNS(null, 'markerHeight', '4')
      marker.setAttributeNS(null, 'refX', '10')
      marker.setAttributeNS(null, 'refY', '2')
      polygon.setAttributeNS(null, 'points', '0 0, 4 2, 0 4')
      polygon.setAttributeNS(null, 'fill', colors.colorSecondary)

      marker.appendChild(polygon)
      defs.appendChild(marker)
      linksGroup?.prepend(defs)

      for (let i = 0; i < this.links.length; i++) {
        this.$el
          .querySelector(`#link-${i}`)
          ?.setAttributeNS(null, 'marker-end', 'url(#arrow-head)')
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.network-container {
  width: 100%;
  height: 100%;
}
</style>
