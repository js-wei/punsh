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
import ApplyFor from '@/views/applyfor'
import PushDetails from '@/views/push_details'
import NewsDetails from '@/views/news_details'
import Quora from '@/views/quora'
import Edit from '@/views/edit'
import Avatar from '@/views/avatar'
import Information from '@/views/information'
import Map from '@/views/map'
import ApplayDetails from '@/views/applay_details'
import OverTime from '@/views/overtime'
import Later from '@/views/later'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  hashbang: true,
  saveScrollPosition: true,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: [{
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false,
        isBack: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false,
        isBack: true
      }
    },
    {
      path: '/quora',
      name: 'quora',
      component: Quora,
      meta: {
        requiresAuth: false,
        isBack: false
      }
    },
    {
      path: '/base',
      name: 'base',
      component: Edit,
      meta: {
        requiresAuth: false,
        isBack: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: false,
        isBack: true
      }
    },
    {
      path: '/overtime',
      name: 'overtime',
      component: OverTime,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/later',
      name: 'later',
      component: Later,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/applay_details/:id',
      name: 'applay_details',
      component: ApplayDetails,
      meta: {
        requiresAuth: false,
        isBack: true
      }
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
      meta: {
        requiresAuth: false,
        isBack: true
      }
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: Avatar,
      meta: {
        requiresAuth: false,
        isBack: true
      }
    },
    {
      path: '/information',
      name: 'information',
      component: Information,
      meta: {
        requiresAuth: false,
        isBack: true
      }
    },

    {
      path: '/forget',
      name: 'forget',
      component: Forget,
      meta: {
        requiresAuth: false,
        isBack: true
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal,
      meta: {
        requiresAuth: true,
        isBack: false
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/safe',
      name: 'safe',
      component: Safe,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/password',
      name: 'password',
      component: Password,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/phone',
      name: 'phone',
      component: Phone,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/punch',
      name: 'punch',
      component: Punch,
      meta: {
        requiresAuth: true,
        isBack: false
      }
    },
    {
      path: '/message',
      name: 'message',
      component: Message,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/message_details/:id',
      name: 'message_details',
      component: MessageDetails,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/push',
      name: 'push',
      component: Push,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/leave',
      name: 'leave',
      component: Leave,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/applyfor',
      name: 'applyfor',
      component: ApplyFor,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/leave_detail/:id',
      name: 'leave_detail',
      component: GetLeave,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/push_details/:id',
      name: 'push_details',
      component: PushDetails,
      meta: {
        requiresAuth: true,
        isBack: true
      }
    },
    {
      path: '/news_defailt/:id',
      name: 'news_defailt',
      component: NewsDetails,
      meta: {
        requiresAuth: false,
        isBack: true
      }
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '*',
      component: Home
    }
  ]
})
