import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path:'/login',
    	name:'Login',
    	component: Login
    },
    {
    	path:'/user',
    	name:'User',
    	component: User
    }
  ]
})
