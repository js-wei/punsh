/**
 * File: g:\vue\office\src\views\push.vue
 * Created Date: 2018-03-04 4:49:25
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-06 2:38:24
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="push">
        <v-head :title="title"></v-head>
        <div>
            <ul class="mui-navbar">
                <li :class="{'active':v.id==current}" v-for="(v,i) in pushType" :key="i" @click="changeType(v.id)">
                    <a>{{v.text}}</a>
                </li>
            </ul>
            <!-- <div class="mui-content mui-scroll-wrapper" id="pullrefresh">
                <div class="mui-scroll">
                    <ul class="mui-table-view mui-table-view-chevron">
                        <li class="mui-table-view-cell mui-media" v-for="(item,index) in messages" 
                            :key="index">
                            <a> 
                              <p>
                                  日期:{{item.date}} 签到:{{item.punsh}}
                                  <span class="mui-pull-right">
                                      <span v-if="item.type==2" class="mui-btn-success">正点</span>
                                      <span v-if="item.type==3" class="mui-btn-primary">迟到</span>
                                      <span v-if="item.type==4" class="mui-btn-warning">早退</span>
                                      <span v-if="item.type==5" class="mui-btn-btn-danger">旷工</span>
                                  </span>
                              </p>
                              <p>{{item.content}}</p>  
                            </a>
                        </li>
                    </ul>
                </div>
            </div> -->

            <div class="wrapper mui-scroll-wrapper" ref="wrapper" 
              style="height:165px;background:yellow;"
              @touchstart="touchStart($event)"
              @touchMove="touchMove($event)">
              <ul class="content mui-table-view mui-table-view-chevron">
                  <li class="mui-table-view-cell mui-media" v-for="(item,index) in messages" 
                      :key="index">
                      <a> 
                        <p>
                            日期:{{item.date}} 签到:{{item.punsh}}
                            <span class="mui-pull-right">
                                <span v-if="item.type==2" class="mui-btn-success">正点</span>
                                <span v-if="item.type==3" class="mui-btn-primary">迟到</span>
                                <span v-if="item.type==4" class="mui-btn-warning">早退</span>
                                <span v-if="item.type==5" class="mui-btn-btn-danger">旷工</span>
                            </span>
                        </p>
                        <p>{{item.content}}</p>  
                      </a>
                  </li>
              </ul>
              <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
              <div class="wrapper-loader" v-if="isPullRefresh">
                <header class="pull-refresh">
                  <div class="down-tip" v-if="isPullStart">下拉更新</div>
                  <div class="up-tip" v-if="isLoadData">松开刷新数据</div>
                  <div class="refresh-tip" v-if="isLoading">加载中……</div>
                </header>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from "@/components/header";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      title: "签到记录",
      current: 1,
      isPullRefresh: false,
      isPullStart: false,
      isLoadData: false,
      isLoading: false,
      startX: 0,
      startY: 0,
      pushType: [
        {
          id: 1,
          text: "全部"
        },
        {
          id: 2,
          text: "正点"
        },
        {
          id: 3,
          text: "迟到"
        },
        {
          id: 4,
          text: "早退"
        },
        {
          id: 5,
          text: "旷工"
        }
      ],
      messages: [
        {
          id: 1,
          date: "2018-01-04",
          title: "正点签到",
          content: "正点签到",
          type: 2,
          later: 0,
          punsh: "07:58:54"
        },
        {
          id: 2,
          date: "2018-03-05",
          title: "正点签到",
          content: "正点签到",
          type: 2,
          later: 0,
          punsh: "07:58:54"
        },
        {
          id: 3,
          date: "2018-03-05",
          title: "迟到签到",
          content: "您迟到了10分钟",
          type: 3,
          later: 10,
          punsh: "08:25:54"
        }
      ]
    };
  },
  components: {
    vHead
  },
  methods: {
    changeType(id) {
      this.current = id;
    },
    touchStart(e) {
      // this.startY = e.targetTouches[0].pageY;
      // this.startX = e.targetTouches[0].pageX;
      // this.startScroll = this.$refs.wrapper.scrollTop || 0;
      // this.isPullRefresh = true;
      // if (this.startY > 100) {
      //   this.isPullStart = true;
      //   this.isLoadData = true;
      // }
      // if (this.startY > 120) {
      //   this.isLoadData = true;
      //   this.isPullStart = false;
      // }
    }
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      self.scroll = new BScroll(".wrapper", {
        click: true,
        scrollY: true,
        pullUpLoad: {
          threshold: -50 // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，
        },
      });
      self.scroll.on("pullingDown", pos => {
        self.isPullRefresh=true;
        self.isPullRefresh=true;
        setTimeout(function () {  
          
        }, 1000);  
        this.$nextTick(function() {
          this.scroll.finishPullUp();
          this.scroll.refresh();
        });
      });
      self.scroll.on("pullingUp", pos => {
        self.isPullRefresh=true;
        self.isPullRefresh=true;
        setTimeout(function () {  
          
        }, 1000);  
        this.$nextTick(function() {
          this.scroll.finishPullUp();
          this.scroll.refresh();
        });
      });
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/base";
.push {
  div {
    ul.mui-navbar {
      padding: 0;
      list-style-type: none;
      width: 90%;
      margin: 10px auto;
      li {
        width: 20%;
        float: left;
        text-align: center;
        a {
          color: lighten(nth($baseColor, 2), 40%);
        }
        &.active {
          a {
            color: nth($baseColor, 2);
          }
        }
      }
    }
    .mui-scroll-wrapper {
      top: 80px;
      position: absolute;
      .mui-table-view-chevron {
        .mui-table-view-cell {
          padding-right: 40px;
        }
      }
      .wrapper-loader {
        position: absolute;
        top: -0.5rem;
        width: 100%;
        height: auto;
        transition-duration: 300ms;
        .pull-refresh {
          position: relative;
          left: 0;
          top: 0;
          width: 100%;
          height: 5rem;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>