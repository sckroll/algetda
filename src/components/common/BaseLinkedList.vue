<template>
  <BaseNetwork
    directional
    :nodes="nodes"
    :links="links"
    @node-add="addNode"
    @node-change="changeNode"
    @node-remove="removeNode"
  ></BaseNetwork>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import BaseNetwork from '@/components/common/BaseNetwork.vue'
import { NewNode, NewLink, NodeObject, LinkObject } from '@/network-graph.d'

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
      nodes: [] as (NewNode | NodeObject)[],
      links: [] as (NewLink | LinkObject)[],
      lastNodeId: 0,
      lastLinkId: 0,
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
    this.lastLinkId = this.values.length - 2
  },
  methods: {
    addNode(value: string, { source, target, index: linkIndex }: LinkObject) {
      // 1. 노드 추가
      const newNode = {
        id: ++this.lastNodeId,
        name: value,
        fx: (source.x + target.x) / 2,
        fy: source.y - Math.abs(source.x - target.x) / 2,
        pinned: true,
      }
      this.nodes.splice(target.index, 0, newNode)

      // 2. 간선 추가
      const newPrevLink = {
        sid: source.id,
        tid: newNode.id,
      }
      const newNextLink = {
        sid: newNode.id,
        tid: target.id,
      }
      this.links.push(newPrevLink, newNextLink)

      // 3. 기존 간선 삭제
      this.links.splice(linkIndex, 1)

      // 4. 부모 컴포넌트로 이벤트 전달
      this.$emit('node-add', value, target.index)
    },
    changeNode(value: string, index: number) {
      this.$emit('node-change', value, index)
    },
    removeNode(nodeIndex: number, nodeId: number) {
      // 1. 노드의 진입 간선과 진출 간선을 검색
      const inLink = this.links.find(link => link.tid === nodeId)
      const outLink = this.links.find(link => link.sid === nodeId)

      // 2. 진입 간선의 tid를 진출 간선의 tid로 하는 새 간선 객체 추가
      if (inLink && outLink) {
        const newLink = {
          sid: inLink.sid,
          tid: outLink.tid,
        }
        this.links.push(newLink)
      }

      // 3. 기존의 진입 간선과 진출 간선 삭제
      if (inLink) {
        this.links.splice((inLink as LinkObject).index, 1)
      }
      if (outLink) {
        this.links.splice((outLink as LinkObject).index - 1, 1)
      }

      // 4. 노드 삭제
      this.nodes.splice(nodeIndex, 1)

      // 5. 부모 컴포넌트로 이벤트 전달
      this.$emit('node-remove', nodeIndex)
    },
  },
})
</script>
