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
        <BaseInput v-model="newValue" short @enter="addNode"></BaseInput>
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
          :class="{ disabled: newValue.length === 0 }"
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
        nodeSize: 48,
        linkWidth: 4,
        nodeLabels: true,
        linkLabels: true,
        fontSize: 20,
        force: 4096,
      },
      tooltip: false,
      tooltipOffsetX: 0,
      tooltipOffsetY: 0,
      isLink: false,
      newValue: '',
      currNode: null as NodeObject | null,
      currLink: null as LinkObject | null,
    }
  },
  watch: {
    links: {
      deep: true,
      handler() {
        this.$el.querySelectorAll('path.link').forEach(link => {
          link.setAttributeNS(null, 'marker-end', 'url(#arrow-head)')
        })
      },
    },
  },
  mounted() {
    if (this.directed) {
      this.addArrow()
    }
  },
  beforeDestroy() {
    window.removeEventListener('click', this.toggleClickHandler)
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
    },
    clickNode(e: PointerEvent, node: NodeObject) {
      this.isLink = false

      this.currNode = node
      this.newValue = node.name

      this.tooltipOffsetX = e.clientX
      this.tooltipOffsetY = e.clientY

      this.showTooltip()
    },
    clickLink(e: PointerEvent, link: LinkObject) {
      this.isLink = true

      this.currLink = link
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
      this.hideTooltip()
    },
    changeNode() {
      if (!this.currNode) return

      this.currNode.name = this.newValue
      this.$emit('node-change', this.newValue, this.currNode.index)
      this.hideTooltip()
    },
    removeNode() {
      if (!this.currNode || this.nodes.length < 2) return

      this.$emit('node-remove', this.currNode.index, this.currNode.id)
      this.hideTooltip()
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
