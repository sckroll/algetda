<template>
  <section class="control-area">
    <div class="control-container">
      <NodeInitControl></NodeInitControl>
      <QueueTraversalControl></QueueTraversalControl>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import NodeInitControl from '@/components/NodeInitControl.vue'
import QueueTraversalControl from '@/components/QueueTraversalControl.vue'

export default Vue.extend({
  components: {
    NodeInitControl,
    QueueTraversalControl,
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
</style>
