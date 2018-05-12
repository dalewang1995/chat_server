import Vue from 'vue'
import Router from 'vue-router'
import ChatIndex from '@/components/ChatIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ChatIndex',
      component: ChatIndex
    }
  ]
})
