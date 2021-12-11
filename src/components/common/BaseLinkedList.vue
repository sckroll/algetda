<template>
  <BaseNetwork
    directed
    :nodes="nodes"
    :links="links"
    @node-add="addNode"
    @node-change="changeNode"
    @node-remove="removeNode"
  ></BaseNetwork>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseNetwork from '@/components/common/BaseNetwork.vue'
import { NewNode, NewLink, NodeObject, LinkObject } from '@/network-graph.d'

export default Vue.extend({
  components: {
    BaseNetwork,
  },
  data() {
    return {
      nodes: [] as (NewNode | NodeObject)[],
      links: [] as (NewLink | LinkObject)[],
      lastNodeId: 0,
    }
  },
  watch: {
    values(newValues: string[], oldValues: string[]) {
      if (this.modifiedByText) {
        this.initNodes()
        return
      }

      if (oldValues.length === 0 && newValues.length > oldValues.length) {
        this.initNodes()
      }
    },
  },
  computed: {
    values(): string[] {
      return this.$store.state.structureValue
    },
    modifiedByText(): boolean {
      return this.$store.state.modifiedByText
    },
  },
  methods: {
    initNodes() {
      this.nodes = this.values.map((value, index) => {
        const dx = 400

        let fx
        if (this.values.length > 1) {
          fx =
            ((window.innerWidth - dx * 2) / (this.values.length - 1)) * index +
            dx
        } else {
          fx = window.innerWidth / 2
        }

        return {
          id: index,
          name: value,
          fx,
          fy: window.innerHeight / 2,
          pinned: true,
        }
      })
      this.links = this.values
        .slice(0, this.values.length - 1)
        .map((_, index) => ({ sid: index, tid: index + 1 }))

      this.lastNodeId = this.values.length - 1
    },
    addNode(value: string, { source, target, index: linkIndex }: LinkObject) {
      // 1. 노드 추가
      const newNode = {
        id: ++this.lastNodeId,
        name: value,
        fx: (source.x + target.x) / 2,
        fy: (source.y + target.y) / 2,
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

      // 4. 값이 추가된 결과물을 스토어에 저장
      const added = [
        ...this.values.slice(0, target.index),
        value,
        ...this.values.slice(target.index),
      ]
      this.$store.commit('SET_MODIFIED_BY_TEXT', false)
      this.$store.commit('SET_STRUCTURE_VALUE', added)
    },
    changeNode(value: string, index: number) {
      const changed = this.values.slice()
      changed[index] = value

      this.$store.commit('SET_MODIFIED_BY_TEXT', false)
      this.$store.commit('SET_STRUCTURE_VALUE', changed)
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
      this.links = this.links.filter(link => {
        if (inLink && outLink) {
          return !(
            (link.sid === (inLink as LinkObject).sid &&
              link.tid === (inLink as LinkObject).tid) ||
            (link.sid === (outLink as LinkObject).sid &&
              link.tid === (outLink as LinkObject).tid)
          )
        } else if (inLink) {
          return (
            link.sid !== (inLink as LinkObject).sid ||
            link.tid !== (inLink as LinkObject).tid
          )
        } else {
          return (
            link.sid !== (outLink as LinkObject).sid ||
            link.tid !== (outLink as LinkObject).tid
          )
        }
      })

      // 4. 노드 삭제
      this.nodes.splice(nodeIndex, 1)

      // 5. 삭제된 값이 적용된 결과물을 스토어에 저장
      const removed = [
        ...this.values.slice(0, nodeIndex),
        ...this.values.slice(nodeIndex + 1),
      ]

      this.$store.commit('SET_MODIFIED_BY_TEXT', false)
      this.$store.commit('SET_STRUCTURE_VALUE', removed)
    },
  },
})
</script>
