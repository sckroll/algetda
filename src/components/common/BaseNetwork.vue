<template>
  <div class="network-container">
    <D3Network
      :net-nodes="nodes"
      :net-links="links"
      :options="options"
      class="svg-container"
      @node-click.stop="clickNode"
      @link-click.stop="clickLink"
    ></D3Network>
    <BaseTooltip
      v-model="tooltip"
      vertical="down"
      :elementWidth="options.nodeSize"
      :elementHeight="options.nodeSize"
      :offsetX="tooltipOffsetX"
      :offsetY="tooltipOffsetY"
    >
      <template v-if="isLink">
        <BaseInput
          v-model="newValue"
          placeholder="새 노드 값"
          short
          @enter="addNode"
        ></BaseInput>
        <div
          class="icon-container"
          :class="{ disabled: newValue.length === 0 }"
          @click="addNode"
        >
          <IconBase>
            <IconAdd></IconAdd>
          </IconBase>
        </div>
      </template>
      <template v-else>
        <BaseInput v-model="newValue" short @enter="changeNode"></BaseInput>
        <div
          class="icon-container"
          :class="{ disabled: newValue.length === 0 || newValue === prevValue }"
          @click="changeNode"
        >
          <IconBase>
            <IconConfirm></IconConfirm>
          </IconBase>
        </div>
        <div
          class="icon-container"
          :class="{ disabled: nodes.length < 2 }"
          @click="removeNode"
        >
          <IconBase>
            <IconRemove></IconRemove>
          </IconBase>
        </div>
      </template>
    </BaseTooltip>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import D3Network from 'vue-d3-network'
import BaseTooltip from '@/components/common/BaseTooltip.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import IconBase from '@/components/icons/IconBase.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconRemove from '@/components/icons/IconRemove.vue'
import IconConfirm from '@/components/icons/IconConfirm.vue'
import colors from '@/assets/scss/exportedVariables.scss'
import { NewNode, NewLink, NodeObject, LinkObject } from '@/network-graph.d'

export default Vue.extend({
  components: {
    D3Network,
    BaseTooltip,
    BaseInput,
    IconBase,
    IconAdd,
    IconRemove,
    IconConfirm,
  },
  props: {
    nodes: {
      type: Array as PropType<NewNode[]>,
      required: true,
    },
    links: {
      type: Array as PropType<NewLink[]>,
      required: true,
    },
    directed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      options: {
        nodeSize: 32,
        linkWidth: 4,
        nodeLabels: true,
        linkLabels: true,
        fontSize: 16,
        force: 4096,
      },
      tooltip: false,
      tooltipOffsetX: 0,
      tooltipOffsetY: 0,
      isLink: false,
      prevValue: '',
      newValue: '',
      currNode: null as NodeObject | null,
      currLink: null as LinkObject | null,
    }
  },
  watch: {
    links: {
      deep: true,
      handler() {
        if (!this.directed) return

        this.$el.querySelectorAll('path.link').forEach(link => {
          link.setAttributeNS(null, 'marker-end', 'url(#arrow-head)')
          if (this.bidirectional) {
            link.setAttributeNS(null, 'marker-start', 'url(#arrow-tail)')
          }
        })
      },
    },
    structureValue() {
      this.hideTooltip()
    },
    bidirectional(val: boolean) {
      this.$el.querySelectorAll('path.link').forEach(link => {
        if (val) {
          link.setAttributeNS(null, 'marker-start', 'url(#arrow-tail)')
        } else {
          link.removeAttributeNS(null, 'marker-start')
        }
      })
    },
  },
  computed: {
    structureValue(): string[] {
      return this.$store.state.structureValue
    },
    bidirectional(): boolean {
      return this.$store.state.bidirectional
    },
  },
  mounted() {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const headMarker = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'marker',
    )
    const tailMarker = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'marker',
    )
    const headPolygon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon',
    )
    const tailPolygon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon',
    )
    const linksGroup = this.$el.querySelector('#l-links')

    // #arrow-head
    headMarker.setAttributeNS(null, 'id', 'arrow-head')
    headMarker.setAttributeNS(null, 'orient', 'auto')
    headMarker.setAttributeNS(null, 'markerWidth', '4')
    headMarker.setAttributeNS(null, 'markerHeight', '4')
    headMarker.setAttributeNS(null, 'refX', '8')
    headMarker.setAttributeNS(null, 'refY', '2')
    headPolygon.setAttributeNS(null, 'points', '0 0, 4 2, 0 4')
    headPolygon.setAttributeNS(null, 'fill', colors.colorSecondary)

    // #arrow-tail
    tailMarker.setAttributeNS(null, 'id', 'arrow-tail')
    tailMarker.setAttributeNS(null, 'orient', 'auto')
    tailMarker.setAttributeNS(null, 'markerWidth', '4')
    tailMarker.setAttributeNS(null, 'markerHeight', '4')
    tailMarker.setAttributeNS(null, 'refX', '-4')
    tailMarker.setAttributeNS(null, 'refY', '2')
    tailPolygon.setAttributeNS(null, 'points', '4 4, 0 2, 4 0')
    tailPolygon.setAttributeNS(null, 'fill', colors.colorSecondary)

    headMarker.appendChild(headPolygon)
    tailMarker.appendChild(tailPolygon)
    defs.appendChild(headMarker)
    defs.appendChild(tailMarker)
    linksGroup?.prepend(defs)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.toggleClickHandler)
  },
  methods: {
    clickNode(e: PointerEvent, node: NodeObject) {
      this.isLink = false

      this.currNode = node
      this.prevValue = node.name
      this.newValue = node.name

      this.tooltipOffsetX = e.clientX
      this.tooltipOffsetY = e.clientY

      this.showTooltip()
    },
    clickLink(e: PointerEvent, link: LinkObject) {
      this.isLink = true

      this.currLink = link
      this.prevValue = ''
      this.newValue = ''

      this.tooltipOffsetX = e.clientX
      this.tooltipOffsetY = e.clientY

      this.showTooltip()
    },
    showTooltip() {
      this.tooltip = true

      window.addEventListener('click', this.toggleClickHandler)
    },
    hideTooltip() {
      this.tooltip = false

      this.prevValue = ''
      this.newValue = ''
      this.currNode = null
      this.currLink = null

      window.removeEventListener('click', this.toggleClickHandler)
    },
    toggleClickHandler({ target }: MouseEvent) {
      if (!(target as HTMLElement).classList.contains('click-safe')) {
        this.hideTooltip()
      }
    },
    addNode() {
      if (this.newValue.length === 0) return

      this.$emit('node-add', this.newValue, this.currLink)
    },
    changeNode() {
      if (!this.currNode || this.newValue === this.prevValue) return

      this.currNode.name = this.newValue
      this.$emit('node-change', this.newValue, this.currNode.index)
    },
    removeNode() {
      if (!this.currNode || this.nodes.length < 2) return

      this.$emit('node-remove', this.currNode.index, this.currNode.id)
    },
  },
})
</script>

<style lang="scss" scoped>
.network-container,
.svg-container {
  width: 100%;
  height: 100%;
}
.icon-container {
  height: 32px;

  &.disabled {
    svg {
      cursor: default;
    }
    * {
      stroke: $color-grey-2;
    }
    &:hover {
      * {
        fill: transparent;
      }
    }
  }
}
svg {
  cursor: pointer;

  &:hover {
    * {
      fill: black;
    }
  }
}
</style>
