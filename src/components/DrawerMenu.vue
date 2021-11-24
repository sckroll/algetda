<template>
  <section class="drawer-container">
    <div class="upper">
      <div class="close-icon"></div>
      <nav>
        <ul>
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link :to="item.path">{{ item.name }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="lower">
      <div class="author">
        Created by <a href="http://sckroll.github.io">Sckroll</a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      menuItems: [
        {
          name: 'Linked list - 연결 리스트',
          path: '#',
        },
        {
          name: 'Tree - 트리',
          path: '#',
        },
        {
          name: 'Graph - 그래프',
          path: '#',
        },
        {
          name: 'Heap - 힙',
          path: '#',
        },
        {
          name: 'Etc. - 기타',
          path: '#',
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
section.drawer-container {
  width: 400px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
  background-color: $color-grey-4;

  .upper {
    display: flex;
    flex-direction: column;
    gap: 64px;
  }
}
.close-icon {
  width: 32px;
  height: 32px;
  background-color: $color-grey-3;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 1.5em;
}
.author {
  font-size: 1.1em;
}
</style>
