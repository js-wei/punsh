import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/home'
import Personal from '@/views/personal'
import Login from '@/views/login'
import Register from '@/views/register'
import Forget from '@/views/forget'
import Setting from '@/views/setting'
import Safe from '@/views/safe'
import Phone from '@/views/phone'
import Password from '@/views/password'
import Feedback from '@/views/feedback'
import Punch from '@/views/punch'
import Message from '@/views/message'
import MessageDetails from '@/views/message_details'
import Push from '@/views/push'
import Leave from '@/views/leave'
import GetLeave from '@/views/get_leave'


Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/forget',
      name:'forget',
      component:Forget
    },
    {
      path:'/personal',
      name:'personal',
      component:Personal,
      meta: { requiresAuth: true }
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: { requiresAuth: true }
    },
    {
      path: '/safe',
      name: 'safe',
      component: Safe,
      meta: { requiresAuth: true }
    },
    {
      path: '/password',
      name: 'password',
      component: Password,
      meta: { requiresAuth: true }
    },
    {
      path: '/phone',
      name: 'phone',
      component: Phone,
      meta: { requiresAuth: true }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback,
      meta: { requiresAuth: true }
    },
    {
      path:'/setting',
      name:'setting',
      component:Setting,
      meta: { requiresAuth: true }
    },
    {
      path:'/punch',
      name:'punch',
      component:Punch,
      meta: { requiresAuth: true }
    },
    {
      path:'/message',
      name:'message',
      component:Message,
      meta:{requiresAuth: true}
    },
    {
      path:'/message_details/:id',
      name:'message_details',
      component:MessageDetails,
      meta:{requiresAuth: true}
    },
    {
      path:'/push',
      name:'push',
      component:Push,
      meta:{requiresAuth: true}
    },
    {
      path:'/leave',
      name:'leave',
      component:Leave,
      meta:{requiresAuth: true}
    },
    {
      path:'/get_leave',
      name:'get_leave',
      component:GetLeave,
      meta:{requiresAuth: true}
    },
    {
      path: '/',
      component: Home
    }
  ]
})
