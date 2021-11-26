<template>
  <section>
    <h1>이해하기 어려운 자료구조와 알고리즘,<br />이제 시각화로 알겠다!</h1>
    <div class="description">
      <p>
        Algetda는 트리, 그래프 등의 자료구조와 다양한 알고리즘을 시각화하는 웹
        사이트입니다.
      </p>
      <p>
        순수 공부 목적으로 구현한 사이드 프로젝트이며,
        <a href="https://visualgo.net" class="underline">VisuAlgo</a>에서 영감을
        받아 만들었습니다.
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
section {
  margin: 64px 0;
}
.description {
  margin-top: 32px;
  font-size: 1.1em;
}
</style>
