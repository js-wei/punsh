/**
 * File: f:\vue\workonline.com\src\store\mutations.js
 * Created Date: '2018-01-25 4:24:18
 * Author: 魏巍
 * -----
 * Last Modified: '2018-03-02 7:22:34
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
	HIDE_FOOTER
} from './mutation-type'

const state={
	loading:false,
	logined:null,
	header:true,
	footer:true
};

const mutations={
	/*loading*/
	[HIDE_LOADING](state){
		state.loading=false;
	},
	[SHOW_LOADING](state){
		state.loading=true;
	},
	[SET_LOGIN](state,userInfo){
		state.logined = userInfo;
	},
	[SHOW_HEADER](state){
		state.header = true
	},
	[SHOW_FOOTER](state){
		state.footer = true
	},
	[HIDE_HEADER](state){
		state.header = false
	},
	[HIDE_FOOTER](state){
		state.footer = false
	}
};

const getters={
	getLoadingState(state){
		return state.loading;
	},
	getLoginedState(state){
		return state.logined;
	},
	getHeaderState(state){
		return state.header;
	},
	getFooterState(state){
		return state.footer
	}
};

export default{
	state,
	mutations,
	getters
}