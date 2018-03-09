/*
 * File: d:\works\punsh\src\components\goback.vue
 * Created Date: 2018-03-09 8:09:01
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-09 8:09:05
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
  <div class="backToTop">
    <div class="backBtn" v-html="text"></div>
  </div>
</template>

<script>
  export default {
  	name:"backToTop",
  	props:{
  		text:{
  			type:String,
  			default:"返回<br/>顶部"
  		}
  	}
  }
</script>

<style lang="scss">
  .backToTop{
  	position: fixed;
  	right: 1.8rem;
  	bottom:4.5rem;
  	width: 2.5rem;
		height: 2.5rem;
  	background: rgba(7,17,27,.4);
  	border-radius: 50%;
  	display: table;
  	.backBtn{
  		vertical-align: middle;
  		display: table-cell;
  		text-align: center;
  		color:#fff;
  		line-height: 0.8rem;
  		font-size: 0.6rem;
  		font-weight: 700;
  	}
  }
</style>