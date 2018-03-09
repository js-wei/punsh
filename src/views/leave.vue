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
                <router-link to="/applyfor" class="mui-icon mui-icon-plusempty upload">
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
            <scroller :on-refresh="refresh" :on-infinite="infinite" 
              height="90%" ref="my_scroller" style="padding-top:80px;" >
               <!-- custom refresh spinner, use default `spinner` & viewBox 0,0,64,64 class -->
                <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                  <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
                <ul class="content mui-table-view mui-table-view-chevron">
                  <li class="mui-table-view-cell mui-media" v-for="(item,index) in messages" :key="index">
                      <router-link :to="'leave_detail/'+item.id">
                        <p>
                            日期:{{item.date}} 假期:{{item.form}} - {{item.to}}
                            <span class="mui-pull-right">
                                <span v-if="item.status==1" class="mui-btn-success">已通过</span>
                                <span v-if="item.status==0" class="mui-btn-danger">被驳回</span>
                                <span v-if="item.status==2" class="mui-btn-royal">申请中</span>
                            </span>
                        </p>
                        <p>{{item.content}},{{item.dur}}假期</p>  
                      </router-link>
                  </li>
              </ul>
              <!-- custom infinite spinner -->
              <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
                <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
            </scroller>
        </div>
    </div>
</template>

<script>
import vHead from "@/components/header"
export default {
  data() {
    return {
      title: "请假记录",
      isSlotRight: true,
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
          status: 0,
          form: "06/03/2018",
          to: "08/03/2018",
          dur: "2天"
        },
        {
          id: 1,
          date: "2018-03-04",
          title: "事假",
          content: "事假申请",
          status: 1,
          form: "06/03/2018",
          to: "07/03/2018",
          dur: "1天"
        },
        {
          id: 1,
          date: "2018-03-04",
          title: "事假",
          content: "事假申请",
          status: 2,
          form: "06/03/2018",
          to: "07/03/2018",
          dur: "1天"
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
    refresh(done) {
      setTimeout(() => {
        done(true);
      }, 1500);
    },
    infinite(done) {
      setTimeout(() => {
        done(true);
      }, 1500);
    },
    onItemClick(index, item) {
      console.log(index);
    }
  },
  created() {}
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
      margin: 0px auto;
      position: fixed;
      height: 36px;
      width: 100%;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      z-index: 1000;
      color: #666;
      li {
        width: 20%;
        float: left;
        text-align: center;
        line-height: 36px;
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
    .upload {
      font-size: 1.5rem;
      color: white;
      padding-top: 19px;
    }
  }
  .mui-table-view-chevron {
    .mui-table-view-cell {
      padding-right: 38px;
    }
  }
}
</style>