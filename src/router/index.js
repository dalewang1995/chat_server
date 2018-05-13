import Vue from 'vue'
import Router from 'vue-router'
import ChatIndex from '@/components/ChatIndex'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ChatIndex',
      component: ChatIndex
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
