/*
 * File: d:\works\punsh\src\views\quora.vue
 * Created Date: 2018-03-22 9:47:05
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-04-02 1:19:31
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
   <div>
       <!-- <v-bnavbar :itemList="itemList" @selectItem="selectItem" :isLink="false"></v-bnavbar> -->
      <v-bmedia :list="list"></v-bmedia>
   </div>
</template>

<script>
import vBnavbar from "@/components/bnavbar";
import BScroll from "better-scroll";
import vBmedia from "@/components/bmedia";

export default {
  data() {
    return {
      refreshText: "下拉刷新",
      pullDownText: "查看更多",
      scroll: null,
      list:[],
      lastPage: 10,
      currentPage: 11,
      itemList: [
        {
          id: 1,
          title: "关注",
          url: ""
        },
        {
          id: 2,
          title: "推荐",
          url: ""
        },
        {
          id: 3,
          title: "深圳",
          url: ""
        },
        {
          id: 4,
          title: "视频",
          url: ""
        },
        {
          id: 5,
          title: "音乐",
          url: ""
        },
        {
          id: 6,
          title: "热点",
          url: ""
        },
        {
          id: 7,
          title: "新时代",
          url: ""
        },
        {
          id: 8,
          title: "娱乐",
          url: ""
        },
        {
          id: 9,
          title: "头条号",
          url: ""
        },
        {
          id: 10,
          title: "问答",
          url: ""
        },
        {
          id: 11,
          title: "图片",
          url: ""
        },
        {
          id: 12,
          title: "科技",
          url: ""
        },
        {
          id: 13,
          title: "体育",
          url: ""
        },
        {
          id: 14,
          title: "财经",
          url: ""
        },
        {
          id: 15,
          title: "军事",
          url: ""
        },
        {
          id: 16,
          title: "国际",
          url: ""
        }
      ]
    };
  },
  components: {
    vBnavbar,
    vBmedia
  },
  mounted() {
    //this._initScroll();
    this.$fly.get('/query',{
      limit:8
    }).then(res=>{
      this.list=res.data.data;
    });
  },
  methods: {
    selectItem(item) {
      console.log(item.title);
    },
    _initScroll() {
      let self = this;
      self.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 1
      });
      // 滑动中
      self.scroll.on("scroll", position => {
        if (position.y > 30) {
          self.refreshText = "释放立即刷新";
        }
      });
      // 滑动结束
      self.scroll.on("touchEnd", position => {
        let maxScrollY = self.scroll.maxScrollY;
        if (position.y > 30) {
          setTimeout(() => {
            self.refreshText = "下拉刷新";
            mui.toast("推荐引擎有5条更新", { type: "div" });
            self.scroll.refresh();
          }, 1000);
        } else if (position.y < maxScrollY - 30) {
          if (self.currentPage > self.lastPage) {
            self.pullDownText = "没有更多数据";
            return;
          }
          self.pullDownText = "加载中...";
          setTimeout(() => {
            self.pullDownText = "查看更多";
            mui.toast("推荐引擎为您加载了5条数据", { type: "div" });
            self.scroll.refresh();
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  
</style>