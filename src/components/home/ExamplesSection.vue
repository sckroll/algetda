<template>
  <section>
    <h2>다음과 같은 자료구조와 알고리즘을 시각화해서 보여줍니다.</h2>
    <div class="examples">
      <div class="example">
        <div class="illustration"></div>
        <div class="label">
          <h3>Linked list</h3>
        </div>
      </div>
      <div class="example">
        <div class="illustration"></div>
        <div class="label">
          <h3>Graph</h3>
        </div>
      </div>
      <div class="example">
        <div class="illustration"></div>
        <div class="label">
          <h3>Tree (BST)</h3>
        </div>
      </div>
      <div class="example">
        <div class="illustration"></div>
        <div class="label">
          <h3>Min/max heap</h3>
        </div>
      </div>
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

  h2 {
    font-size: 2em;
  }
}
.examples {
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}
.example {
  display: flex;
  flex-direction: column;
  aspect-ratio: 16 / 9;
  background-color: $color-grey-4;

  .illustration {
    flex: 5;
  }
  .label {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h3 {
    font-size: 1.5em;
    font-weight: 500;
  }
}
</style>
