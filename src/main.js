// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import serverUrl from '../config/serverurl'

Vue.config.productionTip = false

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

//font-icon
import 'vue-awesome-for-toolbar/icons'
import Icon from 'vue-awesome-for-toolbar/components/Icon.vue'
Vue.component('icon', Icon)

//过滤器
import Filters from './filters'
Object.keys(Filters).forEach(key => Vue.filter(key, Filters[key]))

//
import Metheds from './metheds'
Object.keys(Metheds).forEach(key => Vue.prototype[key] = Metheds[key])

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = '/api/' //请求基地址
Vue.use(VueAxios, axios);

//fly.js
import fly from 'flyio'
fly.config.baseURL='http://w.jswei.cn/api'
fly.engine = XMLHttpRequest
Vue.prototype.$fly=fly

//高德地图
import VueAMap from 'vue-amap'
Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '4ec8d0cfef06810838575a0a95e0602e',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
    'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'
  ],
  uiVersion: '1.0'
});

//Vuex
import store from './store'
import Toasted from 'vue-toasted'
Vue.use(Toasted, {
  theme: "primary",
  position: "bottom-center",
  duration: 1.5e3
})


//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axios.interceptors.request.use(function (config) { //配置发送请求的信息
  //store.dispatch('SHOW_LOADING');
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) { //配置请求回来的信息
  //store.dispatch('HIDE_LOADING');
  return response;
}, function (error) {
  return Promise.reject(error);
});

// const history = window.sessionStorage;
// history.clear()
// let historyCount = history.getItem('count') * 1 || 0;
// history.setItem('/', 0);

router.beforeEach((to, from, next) => {
  if(to.name=='punch'){
    store.commit('HIDE_FOOTER')
  }else{
    store.commit('SHOW_FOOTER')
  }
  // const toIndex = history.getItem(to.path);
  // const fromIndex = history.getItem(from.path);

  // if (toIndex) {
  //   if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
  //     store.commit('UPDATE_DIRECTION', {direction: 'forward'})
  //   } else {
  //     store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
  //   }
  // } else {
  //   ++historyCount;
  //   history.setItem('count', historyCount);
  //   to.path !== '/' && history.setItem(to.path, historyCount);
  //   store.commit('UPDATE_DIRECTION', {direction: 'forward'})
  // }

  if (to.matched.some(res => res.meta.requiresAuth)) { // 判断是否需要登录权限
    let logined = localStorage.getItem('logined'); //!store.getters.logined ||
    if (!logined) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
