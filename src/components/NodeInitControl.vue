<template>
  <div class="node-init-control">
    <div class="input-label">arr 값</div>
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
          <IconBase :disabled="!isModifiable" @click="handleConfirm">
            <IconConfirm></IconConfirm>
          </IconBase>
        </template>
        <template slot="content">입력한 값으로 초기화</template>
      </TooltipContainer>
      <TooltipContainer arrow="up center">
        <template slot="element">
          <IconBase @click="shuffleNodes">
            <IconRandom></IconRandom>
          </IconBase>
        </template>
        <template slot="content">랜덤 값으로 초기화</template>
      </TooltipContainer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TooltipContainer from '@/components/common/TooltipContainer.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import IconBase from '@/components/icons/IconBase.vue'
import IconConfirm from '@/components/icons/IconConfirm.vue'
import IconRandom from '@/components/icons/IconRandom.vue'

export default Vue.extend({
  components: {
    TooltipContainer,
    BaseInput,
    IconBase,
    IconConfirm,
    IconRandom,
  },
  data() {
    return {
      structureValue: '',
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
  },
  computed: {
    inputValue(): string[] {
      return this.$store.state.structureValue
    },
    isModifiable(): boolean {
      return (
        this.structureValue.length > 0 &&
        this.structureValue !== this.inputValue.join()
      )
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
  },
})
</script>

<style lang="scss" scoped>
.node-init-control {
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
</style>
