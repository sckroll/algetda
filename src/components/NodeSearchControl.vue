<template>
  <div class="node-search-control">
    <div class="input-label">검색</div>
    <div class="input-content">
      <TooltipContainer
        arrow="up center"
        :fixed="!!errorMessage"
        :error="!!errorMessage"
      >
        <template slot="element">
          <BaseInput v-model="targetValue" @enter="handleSearch"></BaseInput>
        </template>
        <template slot="content">{{ TooltipMessage }}</template>
      </TooltipContainer>
      <TooltipContainer arrow="up center">
        <template slot="element">
          <IconBase :disabled="!targetValue" @click="handleSearch">
            <IconConfirm></IconConfirm>
          </IconBase>
        </template>
        <template slot="content">검색</template>
      </TooltipContainer>
    </div>
    <BaseRadio
      group="search-type"
      :items="searchTypes"
      @change="changeType"
    ></BaseRadio>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TooltipContainer from '@/components/common/TooltipContainer.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseRadio from '@/components/common/BaseRadio.vue'
import IconBase from '@/components/icons/IconBase.vue'
import IconConfirm from '@/components/icons/IconConfirm.vue'

export default Vue.extend({
  components: {
    TooltipContainer,
    BaseInput,
    BaseRadio,
    IconBase,
    IconConfirm,
  },
  data() {
    return {
      errorMessage: '',
      targetValue: '',
      searchType: '',
      searchTypes: [
        {
          value: 'value',
          label: '값',
        },
        {
          value: 'index',
          label: '인덱스',
        },
      ],
    }
  },
  watch: {
    targetValue(val: string) {
      if (val === '') {
        this.errorMessage = ''
      }
    },
    searchType() {
      this.targetValue = ''
    },
  },
  computed: {
    TooltipMessage(): string {
      const korString = this.searchType === 'value' ? '값을' : '인덱스를'
      return this.errorMessage || `검색할 노드의 ${korString} 입력하세요.`
    },
  },
  mounted() {
    this.searchType = this.searchTypes[0].value
  },
  methods: {
    handleSearch() {
      if (!this.targetValue) return

      if (this.searchType === 'value') {
        this.$store.commit('SET_TARGET_VALUE', this.targetValue)
      } else if (this.searchType === 'index') {
        // 유효성 검사
        this.checkValue()
        if (this.errorMessage) return

        this.$store.commit('SET_TARGET_INDEX', parseInt(this.targetValue))
      }
    },
    changeType(type: string) {
      this.searchType = type
    },
    checkValue() {
      const value = this.targetValue

      // 1. 공백 데이터를 입력했는가?
      if (value.includes(' ')) {
        this.errorMessage = '공백이 포함되어 있습니다.'
        return
      }

      // 2. 소수점이 포함되어 있는가?
      if (value.includes('.')) {
        this.errorMessage = '소수점을 포함할 수 없습니다.'
        return
      }

      // 3. 0 이상의 정수가 아닌 값을 입력했는가?
      const parsed = parseInt(this.targetValue)
      if (Number.isNaN(parsed) || parsed < 0) {
        this.errorMessage = '0 이상의 정수를 입력해주세요.'
        return
      }

      this.errorMessage = ''
    },
  },
})
</script>

<style lang="scss" scoped>
.node-search-control {
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
