<template>
  <BaseNetwork
    directional
    :nodes="nodes"
    :links="links"
    @node-add="addNode"
    @node-change="changeNode"
  ></BaseNetwork>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import BaseNetwork from '@/components/common/BaseNetwork.vue'
import { NewNode, NewLink, NodeObject } from '@/network-graph.d'

export default Vue.extend({
  components: {
    BaseNetwork,
  },
  props: {
    values: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  data() {
    return {
      nodes: [] as NewNode[],
      links: [] as NewLink[],
      lastNodeId: 0,
    }
  },
  mounted() {
    this.nodes = this.values.map((value, index) => ({
      id: index,
      name: value,
      fx:
        ((window.innerWidth - 400 * 2) / (this.values.length - 1)) * index +
        400,
      fy: window.innerHeight / 2,
      pinned: true,
    }))
    this.links = this.values
      .slice(0, this.values.length - 1)
      .map((_, index) => ({ sid: index, tid: index + 1 }))

    this.lastNodeId = this.values.length - 1
  },
  methods: {
    addNode(value: string, source: NodeObject, target: NodeObject) {
      // 노드 추가
      const newNode = {
        id: ++this.lastNodeId,
        name: value,
        fx: (source.x + target.x) / 2,
        fy: source.y - Math.abs(source.x - target.x) / 2,
        pinned: true,
      }
      const nextNodeIndex = this.nodes.findIndex(node => {
        return node.id === target.id
      })
      this.nodes.splice(nextNodeIndex, 0, newNode)

      // 간선 추가
      const newPrevLink = {
        sid: source.id,
        tid: newNode.id,
      }
      const newNextLink = {
        sid: newNode.id,
        tid: target.id,
      }
      this.links.push(newPrevLink, newNextLink)

      // 기존 간선 삭제
      const removedLinkIndex = this.links.findIndex(link => {
        return link.sid === source.id && link.tid === target.id
      })
      this.links.splice(removedLinkIndex, 1)

      // 부모 컴포넌트로 이벤트 전달
      this.$emit('node-add', value, nextNodeIndex)
    },
    changeNode(value: string, index: number) {
      this.$emit('node-change', value, index)
    },
  },
})
</script>
