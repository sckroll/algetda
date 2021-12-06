<template>
  <section class="control-area">
    <div class="control-container">
      <div class="data-input">
        <BaseInput v-model="structureValue" @enter="handleEnter">
          {{ structureLabel }} 값
        </BaseInput>
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
import BaseInput from '@/components/common/BaseInput.vue'
import BaseToggleSwitch from '@/components/common/BaseToggleSwitch.vue'

export default Vue.extend({
  components: {
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
  computed: {
    structureLabel(): string {
      return this.$route.name?.split(' - ')[1] ?? '자료 구조'
    },
  },
  mounted() {
    this.structureValue = '1,2,3,4,5'
    this.$store.commit('SET_STRUCTURE_VALUE', this.structureValue)
  },
  methods: {
    handleEnter() {
      // 유효성 검사
      const regex = /^([0-9],)*[0-9]$/g
      if (!regex.test(this.structureValue)) {
        return
      }

      this.$store.commit('SET_STRUCTURE_VALUE', this.structureValue)
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
.data-options {
  display: flex;
  gap: 32px;
}
</style>
