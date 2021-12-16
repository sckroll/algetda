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
      queue: [] as string[][],
      lastNodeId: 0,
      intervalSpeed: 100,
      intervalId: -1,
      currPointer: 0,
    }
  },
  watch: {
    values(newValues: string[], oldValues: string[]) {
      if (this.modifiedByText) {
        this.initQueue()
        return
      }

      if (oldValues.length === 0 && newValues.length > oldValues.length) {
        this.initQueue()
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
    traversingQueue(): boolean {
      return this.$store.state.traversingQueue
    },
  },
  mounted() {
    this.$on('asdf', () => {
      console.log('asdf recieved')
    })
  },
  methods: {
    initQueue() {
      this.pauseTraverse()

      this.queue = []
      this.currPointer = 0
      this.queue.push(['init'])
      this.values.forEach(value => this.queue.push(['insert', value]))
      this.startTraverse()
    },
    startTraverse() {
      this.intervalId = setInterval(() => {
        const [action, value] = this.queue[this.currPointer]

        if (action === 'init') {
          this.nodes = []
          this.links = []
          this.lastNodeId = 0
        } else if (action === 'insert') {
          const dx = 400
          const maxLength = this.values.length

          let fx, _cssClass
          if (this.lastNodeId === 0) {
            fx = dx
            _cssClass = 'head'
          } else {
            fx =
              ((window.innerWidth - dx * 2) / (maxLength - 1)) *
                this.lastNodeId +
              dx

            if (this.lastNodeId === maxLength - 1) {
              _cssClass = 'tail'
            }
          }

          // 노드 추가
          this.nodes.push({
            id: this.lastNodeId,
            name: value,
            fx,
            fy: window.innerHeight / 2,
            pinned: true,
            _cssClass,
          })

          // 간선 추가
          if (this.lastNodeId > 0) {
            this.links.push({
              sid: this.lastNodeId - 1,
              tid: this.lastNodeId,
            })
          }

          this.lastNodeId += 1
        }

        if (this.currPointer < this.queue.length - 1) {
          this.currPointer += 1
        } else {
          this.pauseTraverse()
        }
      }, this.intervalSpeed)
    },
    pauseTraverse() {
      clearInterval(this.intervalId)
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

      // 6. 머리 노드 혹은 꼬리 노드 업데이트
      ;(this.nodes[this.nodes.length - 1] as NewNode)._cssClass = 'tail'
      ;(this.nodes[0] as NewNode)._cssClass = 'head'
    },
  },
})
</script>
