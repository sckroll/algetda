<template>
  <section class="control-area">
    <div class="control-container">
      <div class="data-input">
        <div class="input-label">{{ structureLabel }} 값</div>
        <TooltipContainer arrow="up center">
          <template slot="element">
            <BaseInput v-model="structureValue" @enter="handleEnter">
            </BaseInput>
          </template>
          <template slot="content">쉼표(,)로 값을 분리해주세요.</template>
        </TooltipContainer>
      </div>
      <div class="data-options">
        <BaseToggleSwitch v-model="switchTest1">test1</BaseToggleSwitch>
        <BaseToggleSwitch v-model="switchTest2">test2</BaseToggleSwitch>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import TooltipContainer from '@/components/common/TooltipContainer.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseToggleSwitch from '@/components/common/BaseToggleSwitch.vue'

export default Vue.extend({
  components: {
    TooltipContainer,
    BaseInput,
    BaseToggleSwitch,
  },
  data() {
    return {
      structureValue: '',
      switchTest1: false,
      switchTest2: false,
    }
  },
  watch: {
    inputValue(val: string[]) {
      this.structureValue = val.join()
    },
  },
  computed: {
    structureLabel(): string {
      return this.$route.name?.split(' - ')[1] ?? '자료 구조'
    },
    inputValue(): string[] {
      return this.$store.state.structureValue
    },
  },
  mounted() {
    this.structureValue = '1,2,3,4,5'
    this.$store.commit('SET_STRUCTURE_VALUE', this.structureValue)
  },
  methods: {
    handleEnter() {
      // TODO: 노드를 추가/수정/삭제할 때 노드 위치가 원래대로 돌아가는 현상 해결
      // 유효성 검사
      if (!this.isValid()) {
        // TODO: 유효성 검사 실패 이유를 툴팁으로 나타내기
      }

      // 1. 맨 앞이나 맨 뒤에 쉼표가 있으면 안 됨

      // 2. 쉼표를 연속해서 두 번 이상 입력하면 안 됨

      // 3. 공백 데이터를 입력하면 안됨

      this.$store.commit('SET_STRUCTURE_VALUE', this.structureValue)
    },
    isValid(): boolean {
      const regex = /^([0-9],)*[0-9]$/g
      return regex.test(this.structureValue)
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
  gap: 16px;
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
.data-options {
  display: flex;
  gap: 32px;
}
</style>
