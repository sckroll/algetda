<template>
  <section class="control-area">
    <div class="control-container">
      <div class="data-input">
        <div class="input-label">{{ structureLabel }} 값</div>
        <div class="input-content">
          <TooltipContainer
            arrow="up center"
            :fixed="!!errorMessage"
            :error="!!errorMessage"
          >
            <template slot="element">
              <BaseInput v-model="structureValue" @enter="handleConfirm">
              </BaseInput>
            </template>
            <template slot="content">
              {{ errorMessage || '쉼표(,)로 값을 분리해주세요.' }}
            </template>
          </TooltipContainer>
          <TooltipContainer arrow="up center">
            <template slot="element">
              <div
                class="icon-container"
                :class="{ disabled: !isModifiable }"
                @click="handleConfirm"
              >
                <IconBase>
                  <IconConfirm></IconConfirm>
                </IconBase>
              </div>
            </template>
            <template slot="content">입력한 값으로 초기화</template>
          </TooltipContainer>
          <TooltipContainer arrow="up center">
            <template slot="element">
              <div class="icon-container" @click="shuffleNodes">
                <IconBase>
                  <IconRandom></IconRandom>
                </IconBase>
              </div>
            </template>
            <template slot="content">랜덤 값으로 초기화</template>
          </TooltipContainer>
        </div>
      </div>
      <div class="node-controller">
        <div class="node-options">
          <BaseToggleSwitch v-model="bidirectional">양방향</BaseToggleSwitch>
        </div>
        <div class="player">
          <TooltipContainer arrow="up center">
            <template slot="element">
              <div class="icon-container">
                <IconBase>
                  <IconStepFirst></IconStepFirst>
                </IconBase>
              </div>
            </template>
            <template slot="content">처음 순서로 이동</template>
          </TooltipContainer>
          <TooltipContainer arrow="up center">
            <template slot="element">
              <div class="icon-container">
                <IconBase>
                  <IconStepBackward></IconStepBackward>
                </IconBase>
              </div>
            </template>
            <template slot="content">이전 순서로 이동</template>
          </TooltipContainer>
          <TooltipContainer arrow="up center">
            <template slot="element">
              <div class="icon-container" @click="togglePlay">
                <IconBase>
                  <IconPause v-if="traversingQueue"></IconPause>
                  <IconPlay v-else></IconPlay>
                </IconBase>
              </div>
            </template>
            <template slot="content">
              {{ traversingQueue ? '일시정지' : '재생' }}
            </template>
          </TooltipContainer>
          <TooltipContainer arrow="up center">
            <template slot="element">
              <div class="icon-container">
                <IconBase>
                  <IconStepForward></IconStepForward>
                </IconBase>
              </div>
            </template>
            <template slot="content">다음 순서로 이동</template>
          </TooltipContainer>
          <TooltipContainer arrow="up right">
            <template slot="element">
              <div class="icon-container">
                <IconBase>
                  <IconStepLast></IconStepLast>
                </IconBase>
              </div>
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
import TooltipContainer from '@/components/common/TooltipContainer.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseToggleSwitch from '@/components/common/BaseToggleSwitch.vue'
import IconBase from '@/components/icons/IconBase.vue'
import IconConfirm from '@/components/icons/IconConfirm.vue'
import IconRandom from '@/components/icons/IconRandom.vue'
import IconPlay from '@/components/icons/IconPlay.vue'
import IconPause from '@/components/icons/IconPause.vue'
import IconStepFirst from '@/components/icons/IconStepFirst.vue'
import IconStepLast from '@/components/icons/IconStepLast.vue'
import IconStepBackward from '@/components/icons/IconStepBackward.vue'
import IconStepForward from '@/components/icons/IconStepForward.vue'

export default Vue.extend({
  components: {
    TooltipContainer,
    BaseInput,
    BaseToggleSwitch,
    IconBase,
    IconConfirm,
    IconRandom,
    IconPlay,
    IconPause,
    IconStepFirst,
    IconStepLast,
    IconStepBackward,
    IconStepForward,
  },
  data() {
    return {
      structureValue: '',
      bidirectional: false,
      errorMessage: '',
    }
  },
  watch: {
    structureValue(val: string) {
      if (val === this.inputValue.join()) {
        this.errorMessage = ''
      }
    },
    inputValue(val: string[]) {
      this.structureValue = val.join()
    },
    bidirectional(val: boolean) {
      this.$store.commit('SET_BIDIRECTIONAL', val)
    },
  },
  computed: {
    structureLabel(): string {
      return this.$route.name?.split(' - ')[1] ?? '자료 구조'
    },
    inputValue(): string[] {
      return this.$store.state.structureValue
    },
    isModifiable(): boolean {
      return (
        this.structureValue.length > 0 &&
        this.structureValue !== this.inputValue.join()
      )
    },
    traversingQueue(): boolean {
      return this.$store.state.traversingQueue
    },
  },
  mounted() {
    const storedValue = localStorage.getItem('algetdaLinkedList')
    this.structureValue = storedValue ?? '1,2,3,4,5'

    this.$store.commit('SET_MODIFIED_BY_TEXT', true)
    this.$store.commit('SET_STRUCTURE_VALUE', this.structureValue)
  },
  methods: {
    handleConfirm() {
      if (!this.isModifiable) return

      // 유효성 검사
      this.checkValue()
      if (this.errorMessage) return

      this.$store.commit('SET_MODIFIED_BY_TEXT', true)
      this.$store.commit('SET_STRUCTURE_VALUE', this.structureValue)
    },
    checkValue() {
      const value = this.structureValue

      // 1. 값을 입력했는가?
      if (value.length === 0) {
        this.errorMessage = '값을 입력해주세요.'
        return
      }

      // 2. 맨 앞이나 맨 뒤에 쉼표가 있는가?
      if (value[0] === ',' || value[value.length - 1] === ',') {
        this.errorMessage = '쉼표로 시작하거나 끝날 수 없습니다.'
        return
      }

      // 3. 쉼표를 연속해서 두 번 이상 입력했는가?
      if (value.includes(',,')) {
        this.errorMessage = '쉼표를 연속해서 입력할 수 없습니다.'
        return
      }

      // 4. 공백 데이터를 입력했는가?
      if (value.includes(' ')) {
        this.errorMessage = '공백이 포함되어 있습니다.'
        return
      }

      this.errorMessage = ''
    },
    shuffleNodes() {
      const nodeCount = Math.floor(Math.random() * 5) + 4
      const shuffled = [] as number[]
      for (let i = 0; i < nodeCount; i++) {
        shuffled.push(Math.floor(Math.random() * 10))
      }

      this.$store.commit('SET_MODIFIED_BY_TEXT', true)
      this.$store.commit('SET_STRUCTURE_VALUE', shuffled.join(','))
    },
    togglePlay() {
      if (this.traversingQueue) {
        this.$store.commit('STOP_TRAVERSING_QUEUE')
      } else {
        this.$store.commit('START_TRAVERSING_QUEUE')
      }
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
.data-input {
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 500;
}
.input-content {
  display: flex;
  align-items: center;
  gap: 8px;
}
.icon-container {
  height: 32px;

  svg {
    cursor: pointer;

    &:hover {
      * {
        fill: black;
      }
    }
  }
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
