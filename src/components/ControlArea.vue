<template>
  <section class="control-area">
    <div class="control-container">
      <NodeInitControl></NodeInitControl>
      <div class="node-controller">
        <div class="node-options">
          <BaseToggleSwitch v-model="bidirectional">양방향</BaseToggleSwitch>
        </div>
        <div class="player">
          <TooltipContainer arrow="up center">
            <template slot="element">
              <IconBase @click="stepFirst">
                <IconStepFirst></IconStepFirst>
              </IconBase>
            </template>
            <template slot="content">처음 순서로 이동</template>
          </TooltipContainer>
          <TooltipContainer arrow="up center">
            <template slot="element">
              <IconBase @click="stepBackward">
                <IconStepBackward></IconStepBackward>
              </IconBase>
            </template>
            <template slot="content">이전 순서로 이동</template>
          </TooltipContainer>
          <TooltipContainer arrow="up center">
            <template slot="element">
              <IconBase @click="togglePlay">
                <IconPause v-if="traversingQueue"></IconPause>
                <IconPlay v-else></IconPlay>
              </IconBase>
            </template>
            <template slot="content">
              {{ traversingQueue ? '일시정지' : '재생' }}
            </template>
          </TooltipContainer>
          <TooltipContainer arrow="up center">
            <template slot="element">
              <IconBase @click="stepForward">
                <IconStepForward></IconStepForward>
              </IconBase>
            </template>
            <template slot="content">다음 순서로 이동</template>
          </TooltipContainer>
          <TooltipContainer arrow="up right">
            <template slot="element">
              <IconBase @click="stepLast">
                <IconStepLast></IconStepLast>
              </IconBase>
            </template>
            <template slot="content">마지막 순서로 이동</template>
          </TooltipContainer>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import NodeInitControl from '@/components/NodeInitControl.vue'
import TooltipContainer from '@/components/common/TooltipContainer.vue'
import BaseToggleSwitch from '@/components/common/BaseToggleSwitch.vue'
import IconBase from '@/components/icons/IconBase.vue'
import IconPlay from '@/components/icons/IconPlay.vue'
import IconPause from '@/components/icons/IconPause.vue'
import IconStepFirst from '@/components/icons/IconStepFirst.vue'
import IconStepLast from '@/components/icons/IconStepLast.vue'
import IconStepBackward from '@/components/icons/IconStepBackward.vue'
import IconStepForward from '@/components/icons/IconStepForward.vue'

export default Vue.extend({
  components: {
    NodeInitControl,
    TooltipContainer,
    BaseToggleSwitch,
    IconBase,
    IconPlay,
    IconPause,
    IconStepFirst,
    IconStepLast,
    IconStepBackward,
    IconStepForward,
  },
  data() {
    return {
      bidirectional: false,
    }
  },
  watch: {
    bidirectional(val: boolean) {
      this.$store.commit('SET_BIDIRECTIONAL', val)
    },
  },
  computed: {
    traversingQueue(): boolean {
      return this.$store.state.traversingQueue
    },
  },
  methods: {
    togglePlay() {
      if (this.traversingQueue) {
        this.$store.commit('STOP_TRAVERSING_QUEUE')
        this.$store.commit('SET_QUEUE_COMMAND', 'pause')
      } else {
        this.$store.commit('START_TRAVERSING_QUEUE')
        this.$store.commit('SET_QUEUE_COMMAND', 'play')
      }
    },
    stepFirst() {
      this.$store.commit('SET_QUEUE_COMMAND', 'stepFirst')
    },
    stepLast() {
      this.$store.commit('SET_QUEUE_COMMAND', 'stepLast')
    },
    stepBackward() {
      this.$store.commit('SET_QUEUE_COMMAND', 'stepBackward')
    },
    stepForward() {
      this.$store.commit('SET_QUEUE_COMMAND', 'stepForward')
    },
  },
})
</script>

<style lang="scss" scoped>
section {
  z-index: 3;
  position: absolute;
  top: 0;
  width: 100%;
  height: 128px;
  display: flex;
  align-items: flex-end;
  padding: 16px;
  box-sizing: border-box;
  background-color: rgba($color-grey-4, 0.7);
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 4px 1px rgba(black, 0.25);
}
.control-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.node-controller {
  display: flex;
  align-items: center;
  gap: 32px;

  .player {
    display: flex;
    gap: 8px;
  }
}
</style>
