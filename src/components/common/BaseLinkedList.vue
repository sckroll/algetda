<template>
  <BaseNetwork
    directed
    :nodes="nodes"
    :links="links"
    @node-add="addNodeByClick"
    @node-change="changeNodeByClick"
    @node-remove="removeNodeByClick"
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
      currNodeId: 0,
      intervalSpeed: 100,
      intervalId: -1,
      currPointer: 0,
      xPadding: 400,
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
    queueCommand(command: string) {
      switch (command) {
        case 'play':
          if (this.currPointer === this.queue.length) {
            this.initQueue()
          } else {
            this.startTraverse()
          }
          break
        case 'pause':
          this.pauseTraverse()
          break
        case 'stepFirst':
          break
        case 'stepBackward':
          break
        case 'stepForward':
          break
        case 'stepLast':
          break
      }
    },
    currNodeId(currId: number, prevId: number) {
      if (prevId > 0) {
        const newCssClass = this.nodes[prevId - 1]._cssClass?.replace(
          'focus',
          '',
        )
        this.nodes[prevId - 1]._cssClass = newCssClass
      }
      this.nodes[currId - 1]._cssClass += ' focus'
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
    queueCommand(): string {
      return this.$store.state.queueCommand
    },
    nodePositionX(): number {
      if (this.values.length === 1) {
        return window.innerWidth / 2
      } else {
        const graphWidth = window.innerWidth - this.xPadding * 2
        const nodeDistance = graphWidth / (this.values.length - 1)
        return nodeDistance * this.lastNodeId + this.xPadding
      }
    },
    headNode(): NodeObject {
      return this.nodes[0] as NodeObject
    },
    tailNode(): NodeObject {
      return this.nodes[this.nodes.length - 1] as NodeObject
    },
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
      this.$store.commit('START_TRAVERSING_QUEUE')
      this.intervalId = setInterval(() => {
        const [action, value] = this.queue[this.currPointer]

        if (action === 'init') {
          this.initNode()
        } else if (action === 'insert') {
          this.insertNode(value)
        } else if (action === 'update') {
          this.updateNode(value)
        } else if (action === 'remove') {
          this.removeNode(value)
        }

        this.currPointer += 1
        if (this.currPointer === this.queue.length) {
          this.pauseTraverse()
        }
      }, this.intervalSpeed)
    },
    pauseTraverse() {
      clearInterval(this.intervalId)
      this.$store.commit('STOP_TRAVERSING_QUEUE')
    },
    initNode() {
      this.nodes = []
      this.links = []
      this.lastNodeId = 0
      this.currNodeId = 0
    },
    insertNode(value: string) {
      let _cssClass

      if (this.lastNodeId === 0) {
        _cssClass = 'head'
      } else {
        // 이전 꼬리 노드의 색상 변경
        if (this.lastNodeId > 1) {
          const newCssClass = this.tailNode._cssClass.replace('tail', '')
          this.tailNode._cssClass = newCssClass
        }

        _cssClass = 'tail'
      }

      // 노드 추가
      this.nodes.push({
        id: this.lastNodeId,
        name: value,
        fx: this.nodePositionX,
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
      this.currNodeId += 1
    },
    // TODO: 순차 탐색(search) 메소드 구현, 큐에 삽입해서 시각화하는 로직 구현
    // TODO: 노드 추가/수정/삭제 명령 수행 전에 인덱스가 주어지면
    //       해당 인덱스를 찾을 때까지 순차 탐색 수행 후 명령 실행
    //       그리고 그 과정을 모두 시각화
    updateNode(value: string) {
      console.log('updateNode')
    },
    removeNode(value: string) {
      console.log('removeNode')
    },
    searchByValue(value: string) {
      this.currNodeId = 0
    },
    searchByIndex(index: number) {
      this.currNodeId = 0
    },
    addNodeByClick(
      value: string,
      { source, target, index: linkIndex }: LinkObject,
    ) {
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
    changeNodeByClick(value: string, index: number) {
      const changed = this.values.slice()
      changed[index] = value

      this.$store.commit('SET_MODIFIED_BY_TEXT', false)
      this.$store.commit('SET_STRUCTURE_VALUE', changed)
    },
    removeNodeByClick(nodeIndex: number, nodeId: number) {
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
