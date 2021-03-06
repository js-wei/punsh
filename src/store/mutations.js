/**
 * File: f:\vue\workonline.com\src\store\mutations.js
 * Created Date: '2018-01-25 4:24:18
 * Author: 魏巍
 * -----
 * Last Modified: '2018-04-18 10:01:45
 * Modified By: 魏巍
 * -----
 * Copyright (c) 2018 魏巍
 * ------------------------------------
 * Javascript will save your soul!
 */

import {
  HIDE_LOADING,
  SHOW_LOADING,
  SET_LOGIN,
  SHOW_HEADER,
  SHOW_FOOTER,
  HIDE_HEADER,
  HIDE_FOOTER,
  UPDATE_DIRECTION,
  UPDATE_SITE_CONFIG,
  CATCH_ARTICLE,
  CATCH_ARTICLE_LIST,
  CATCH_PUNCH_LIST,
  CATCH_LEAVE_LIST,
  SET_TYPE,
  SET_NETWORK_TYPE,
  CATCH_SCOLLER_POSITION,
  CATCH_PAGE
} from './mutation-type'

const state = {
  loading: false,
  logined: null,
  header: true,
  footer: true,
  navigater: null,
  site: null,
  navigaterBack: null,
  article: {},
  articleList: [],
  punchList: [],
  leaveList: [],
  type: 0,
  networkType: {
    no: 1,
    name: '无网络'
  },
  scollerPosition: {
    x: 0,
    y: 0
  },
  page: {}
};

const mutations = {
  /*loading*/
  [HIDE_LOADING](state) {
    state.loading = false;
  },
  [SHOW_LOADING](state) {
    state.loading = true;
  },
  [SET_LOGIN](state, userInfo) {
    state.logined = userInfo;
  },
  [SHOW_HEADER](state) {
    state.header = true
  },
  [SHOW_FOOTER](state) {
    state.footer = true
  },
  [HIDE_HEADER](state) {
    state.header = false
  },
  [HIDE_FOOTER](state) {
    state.footer = false
  },
  [UPDATE_DIRECTION](state, direction) {
    state.navigater = direction;
  },
  [UPDATE_SITE_CONFIG](state, config) {
    state.site = config;
  },
  [CATCH_ARTICLE](state, article) {
    state.article = article;
  },
  [CATCH_ARTICLE_LIST](state, list) {
    state.articleList = list;
  },
  [CATCH_PUNCH_LIST](state, list) {
    state.punchList = list;
  },
  [CATCH_LEAVE_LIST](state, list) {
    state.leaveList = list;
  },
  [SET_TYPE](state, type) {
    state.type = type;
  },
  [SET_NETWORK_TYPE](state, network) {
    state.networkType = network;
  },
  [CATCH_SCOLLER_POSITION](state, position) {
    state.scollerPosition = position;
  },
  [CATCH_PAGE](state, page) {
    delete page.data;
    state.page = page;
  }
};

const getters = {
  getLoadingState(state) {
    return state.loading;
  },
  getLoginedState(state) {
    return state.logined;
  },
  getHeaderState(state) {
    return state.header;
  },
  getFooterState(state) {
    return state.footer;
  },
  getSiteState(state) {
    return state.site;
  },
  getArticleState(state) {
    return state.article;
  },
  getArticleListState(state) {
    return state.articleList;
  },
  getPunchListState(state) {
    return state.punchList;
  },
  getLeaveListState(state) {
    return state.leaveList;
  },
  getTypeState(state) {
    return state.type;
  },
  getNetworkTypeState(state) {
    return state.networkType;
  },
  getScollerPositionState(state) {
    return state.scollerPosition;
  },
  getPageState(state) {
    return state.scollerPosition;
  }
};

export default {
  state,
  mutations,
  getters
}
