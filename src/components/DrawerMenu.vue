<template>
  <div class="overlay" @click.self="closeDrawer">
    <section class="drawer-container">
      <div class="upper">
        <div class="close-button-container">
          <IconBase @click="closeDrawer">
            <IconClose></IconClose>
          </IconBase>
        </div>
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
          Created by
          <a href="http://sckroll.github.io" class="underline">Sckroll</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconBase from '@/components/icons/IconBase.vue'
import IconClose from '@/components/icons/IconClose.vue'

export default Vue.extend({
  components: {
    IconBase,
    IconClose,
  },
  data() {
    return {
      menuItems: [] as {
        name?: string
        path: string
      }[],
    }
  },
  mounted() {
    const routes = this.$router.options.routes
    if (routes) {
      this.menuItems.push({
        name: routes[0].name,
        path: routes[0].path,
      })
      routes[1].children?.forEach(child => {
        this.menuItems.push({
          name: child.name,
          path: child.path,
        })
      })
    }
  },
  methods: {
    closeDrawer() {
      this.$store.commit('CLOSE_DRAWER')
    },
  },
})
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 110%;
  height: 100%;
  background-color: rgba(black, 0.3);
}
section.drawer-container {
  width: 384px;
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
  box-shadow: 0 2px 4px 1px rgba(black, 0.25);

  .upper {
    display: flex;
    flex-direction: column;
    gap: 64px;
  }
}
.close-button-container {
  display: flex;
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
