import Vue from 'vue'
import Router from 'vue-router'
import ChatIndex from '@/components/ChatIndex'
import Login from '@/components/Login'
import {getCookie, delCookie} from '../util/util.js'

Vue.use(Router)


const routes = [
    {
      path: '/',
      name: 'ChatIndex',
      component: ChatIndex,
      meta:{requireAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    fetch('/api/islogin',{credentials: 'include'}).then(res => {
      res.json().then(rs =>{
        console.log('res----',rs.state,rs);
        router.app.$store.dispatch('login', rs.data);
        if(rs.state) {
          next();
        } else {
          if(getCookie('uid_session')) {
            delCookie('uid_session');
          }
          next({
            path: '/login'
          });
        }
      })

    });
  } else {
    next();
  }
});

export default router;