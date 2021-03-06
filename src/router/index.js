import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Govt from '@/components/Govt'
import Private from '@/components/Private'
import Add from '@/components/Add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/govt',
      name: 'govt',
      component: Govt
    },
    {
      path: '/private',
      name: 'private',
      component: Private
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    }
  ]
})
