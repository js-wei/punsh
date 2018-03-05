/**
 * File: d:\works\punsh\src\views\leave.vue
 * Created Date: 2018-03-05 4:55:49
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-05 5:32:06
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

/**
 * File: g:\vue\office\src\views\push.vue
 * Created Date: 2018-03-04 4:49:25
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-05 4:54:46
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="push">
        <v-head :title="title" :isSlotRight="isSlotRight">
            <div slot="header-right">
                <!-- <button type="button" class="mui-icon mui-icon-plusempty upload">申请</button> -->
                <router-link to="/get_leave" class="mui-icon mui-icon-plusempty upload">
                  申请
                </router-link>
            </div>
        </v-head>
        <div>
            <ul class="mui-navbar">
                <li :class="{'active':v.id==current}" v-for="(v,i) in pushType" :key="i" @click="changeType(v.id)">
                    <a>{{v.text}}</a>
                </li>
            </ul>
            <div class="mui-content mui-scroll-wrapper" id="pullrefresh">
                <div class="mui-scroll">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media" v-for="(item,index) in messages" 
                            :key="index">
                            <a>    <!-- class='mui-navigate-right' -->
                              <p>
                                  日期:{{item.date}} 假期:{{item.form}} - {{item.to}}
                                  <span class="mui-pull-right">
                                      <span v-if="item.status==1" class="mui-btn-success">通过</span>
                                      <span v-if="item.status==0" class="mui-btn-danger">驳回</span>
                                  </span>
                              </p>
                              <p>{{item.content}},{{item.dur}}假期</p>  
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from "@/components/header";
export default {
  data() {
    return {
      title: "请假记录",
      isSlotRight:true,
      current: 1,
      pushType: [
        {
          id: 1,
          text: "事假"
        },
        {
          id: 2,
          text: "病假"
        },
        {
          id: 3,
          text: "婚假"
        },
        {
          id: 4,
          text: "产假"
        },
        {
          id: 5,
          text: "其他"
        }
      ],
      messages: [
        {
          id: 1,
          date: "2018-01-04",
          title: "事假",
          content: "事假申请",
          status:0,
          form: "06/03/2018",
          to:"08/03/2018",
          dur:'2天'
        },
        {
          id: 1,
          date: "2018-03-04",
          title: "事假",
          content: "事假申请",
          status:1,
          form: "06/03/2018",
          to:"07/03/2018",
          dur:'1天'
        }
      ]
    };
  },
  components: {
    vHead
  },
  methods: {
    changeType(id) {
      console.log(id);
      this.current = id;
    },
    getDataList() {
      let self = this;
      mui.ajax({
        type: "get",
        url: `http://api.jswei.cn/api/punsh&p=${self.page}&type=${
          self.current
        }`,
        success(data) {
          let json = JSON.parse(data).result.data;
          self.messages = self.messages.concat(json); // 合并并且返回一个新数组
          self.page += 1;
          self.count += 5;
          mui("#pullrefresh")
            .pullRefresh()
            .endPullupToRefresh(self.count >= 1000);
        }
      });
    },
    getLastData() {
      let self = this;
      mui.ajax({
        type: "get",
        url: `http://api.jswei.cn/api/punsh&p=1`,
        success(data) {
          let json = JSON.parse(data).result.data;
          self.messages = self.messages.concat(json); // 合并并且返回一个新数组
          self.page = 1;
          self.count = 5;
          mui("#pullrefresh")
            .pullRefresh()
            .endPullupToRefresh(self.count >= 1000);
        }
      });
    },
    pulldownRefresh() {
      this.getLastData();
      setTimeout(() => {
        mui("#pullrefresh")
          .pullRefresh()
          .endPulldownToRefresh();
      }, 1500);
    },
    pullupRefresh() {
      this.getDataList();
      setTimeout(() => {
        mui("#pullrefresh")
          .pullRefresh()
          .endPullupToRefresh();
      }, 1500);
    }
  },
  created() {
    let self = this;
    mui.ready(function() {
      mui.init({
        pullRefresh: {
          container: "#pullrefresh",
          down: {
            auto: false,
            callback: self.pulldownRefresh
          },
          up: {
            contentrefresh: "正在加载...",
            callback: self.pullupRefresh
          }
        }
      });
      //self.getDataList();
    });
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.1, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值 0.0006
      indicators: false //隐藏一条滚动条 增大减速系数。。。
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
      height:auto;
      overflow: hidden;
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
    }
  }
  .upload{
    font-size:1.5rem;
    color:white;
    padding-top:15px;
  }
}
</style>