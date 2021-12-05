<template>
  <div class="overlay" @mousedown.self="closeSettingsPopup">
    <BasePane
      class="settings-container"
      closeButton
      :tabs="tabs"
      @tab-select="selectTab"
      @popup-close="closeSettingsPopup"
    >
      <template slot="title">Settings</template>
      <template slot="content">
        <component v-if="selectedTab" :is="selectedTab.component"></component>
      </template>
    </BasePane>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BasePane from '@/components/common/BasePane.vue'

interface Tab {
  name: string
  component: string
}

export default Vue.extend({
  components: {
    BasePane,
    Tab1Content: () => import('@/components/Tab1Content.vue'),
    Tab2Content: () => import('@/components/Tab2Content.vue'),
    Tab3Content: () => import('@/components/Tab3Content.vue'),
  },
  data() {
    return {
      tabs: [
        {
          name: 'Tab1',
          component: 'Tab1Content',
        },
        {
          name: 'Tab2',
          component: 'Tab2Content',
        },
        {
          name: 'Tab3',
          component: 'Tab3Content',
        },
      ],
      selectedTab: null as Tab | null,
    }
  },
  mounted() {
    this.selectedTab = this.tabs[0]
  },
  methods: {
    closeSettingsPopup() {
      this.$store.commit('CLOSE_SETTINGS_POPUP')
    },
    selectTab(tab: Tab) {
      this.selectedTab = tab
    },
  },
})
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.settings-container {
  width: 600px;
  height: 400px;
}
</style>
