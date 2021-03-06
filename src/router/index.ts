import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home - 홈',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/MainPage.vue'),
    children: [
      {
        path: '/linked-list',
        name: 'Linked List - 연결 리스트',
        component: () => import('@/views/LinkedListPage.vue'),
      },
      {
        path: '/tree',
        name: 'Tree - 트리',
        component: () => import('@/views/TreePage.vue'),
      },
      {
        path: '/graph',
        name: 'Graph - 그래프',
        component: () => import('@/views/GraphPage.vue'),
      },
      {
        path: '/heap',
        name: 'Heap - 힙',
        component: () => import('@/views/HeapPage.vue'),
      },
      {
        path: '/etc',
        name: 'Etc. - 기타',
        component: () => import('@/views/EtcPage.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  store.commit('CLOSE_DRAWER')
  store.commit('CLOSE_SETTINGS_POPUP')
  next()
})

export default router
