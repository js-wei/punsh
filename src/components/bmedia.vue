/*
 * File: d:\works\punsh\src\components\bmedia.vue
 * Created Date: 2018-04-02 10:52:56
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-04-02 1:41:05
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="list-wrapper list-wrapper-hook" ref="wrapper">
      <div class="list-wrapper-content">
        <div class="mui-toast-container mui-active" v-if="endText">
          <div class="mui-toast-message">{{endText}}</div>
        </div>
        <slot></slot>
        <div class="top-tip"  v-if="list">
          <span class="refresh-hook">{{refreshText1}}</span>
        </div>
        <ul class="list-content list-content-hook"  v-if="list">
          <li class="list-item" v-for="(item,index) in list" :key="index">
            <div class="avatar" v-if="item.image">
              <img :src="item.image" width="100" height="100"/>
            </div>
            <div class="text"  v-if="list">
              <h2>{{item.title}}</h2>
              <span>{{item.date|time_ago}}</span>
            </div>
          </li>
        </ul>
        <div class="bottom-tip">
          <span class="loading-hook">{{pullDownText1}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      refreshText1: "",
      pullDownText1: "",
      endText: ""
    };
  },
  props: {
    refreshText: {
      type: String,
      default: "下拉刷新"
    },
    pullDownText: {
      type: String,
      default: "查看更多"
    },
    list: Array,
    lastPage: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.refreshText1 = this.refreshText;
    this.pullDownText1 = this.pullDownText;

    this.$nextTick(() => {
      if (this.list) {
        this._initScroll();
      }
    });
  },
  methods: {
    _initScroll() {
      let self = this;
      self.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 1
      });
      self.scroll.on("scroll", position => {
        if (position.y > 30) {
          self.refreshText1 = "释放立即刷新";
        }
      });
      self.scroll.on("touchEnd", position => {
        let maxScrollY = self.scroll.maxScrollY;
        if (position.y > 30) {
          setTimeout(() => {
            self.refreshText1 = "下拉刷新";
            this.endText = "推荐引擎有5条更新";
            self.scroll.refresh();
            setTimeout(() => {
              this.endText = "";
            }, 1e3);
          }, 1000);
        } else if (position.y < maxScrollY - 30) {
          if (self.currentPage > self.lastPage) {
            self.pullDownText1 = "没有更多数据";
            return;
          }
          self.pullDownText1 = "加载中...";
          setTimeout(() => {
            self.pullDownText1 = "查看更多";
            this.endText = "推荐引擎为您加载了5条数据";
            self.scroll.refresh();
            setTimeout(() => {
              this.endText = "";
            }, 1e3);
          }, 1000);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-toast-container {
  top: 0;
  left: 0;
  width: 100%;
  -webkit-transform: none;
  transform: none;
}
.mui-toast-container.mui-active {
  opacity: 0.8;
}
.mui-toast-message {
  padding: 8px 15px;
  background-color: #eb7d46; //定制颜色
  color: #fff;
  border-radius: 0;
  font-size: 13px;
}
.list-wrapper {
  position: fixed;
  z-index: 1;
  top: -20px;
  bottom: 0px;
  left: 0;
  width: 100%;
  background: #f2f2f2;
  overflow: hidden;
  .list-wrapper-content {
    padding-bottom: 100px;
    .top-tip {
      position: absolute;
      top: -40px;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #555;
    }
    .bottom-tip {
      width: 100%;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #777;
      background: #f2f2f2;
    }
    .list-content {
      background: #fff;
      padding-left: 0px;
      .list-item {
        display: flex;
        padding: 10px;
        width: 100%;
        border-bottom: 1px solid #ddd;
        .avatar {
          flex: 0 0 100px;
          border: 1px solid #ddd;
        }
        .text {
          position: relative;
          flex: 1;
          padding-left: 10px;
          h2 {
            font-size: 16px;
            font-weight: normal;
            color: rgb(7, 17, 27);
            span {
              position: absolute;
              bottom: 20px;
              color: rgba(7, 17, 27, 0.7);
            }
          }
        }
      }
    }
  }
}
</style>