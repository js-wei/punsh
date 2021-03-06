/**
 * File: f:\vue\workonline.com\src\store\actions.js
 * Created Date: '2018-01-25 4:23:58
 * Author: 魏巍
 * -----
 * Last Modified: '2018-03-29 11:36:46
 * Modified By: 魏巍
 * -----
 * Copyright (c) 2018 魏巍
 * ------------------------------------
 * Javascript will save your soul!
 */


import * as types from './mutation-type'

export default{
	/*loading*/
	hideLoading:({commit})=>{
		commit(types.HIDE_LOADING)
	},
	showLoading:({commit})=>{
		commit(types.SHOW_LOADING)
	},
	setLogin:({commit},userInfo)=>{
		commit(types.SET_LOGIN,userInfo);
	},
	setArticle:({commit},article)=>{
		commit(types.CATCH_ARTICLE,article);
	}
}
