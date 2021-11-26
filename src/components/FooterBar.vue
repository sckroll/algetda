<template>
  <footer class="footer-bar">
    <div class="footer-wrapper">
      <div class="contact">
        <a href="mailto://kimsc0714@gmail.com" class="underline"
          >버그 신고하기</a
        >
      </div>
      <div class="author">
        Created by
        <a href="https://sckroll.github.io" class="underline">Sckroll</a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
footer {
  height: 128px;
  display: flex;
  justify-content: center;
  background-color: $color-grey-4;
}
.footer-wrapper {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  padding: 32px;
  box-sizing: border-box;
}
</style>
