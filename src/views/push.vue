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
            <scroller :on-refresh="refresh" :on-infinite="infinite" 
              height="90%" ref="my_scroller" style="padding-top:80px;" class="my-scroller">
               <!-- custom refresh spinner, use default `spinner` & viewBox 0,0,64,64 class -->
                <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                  <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
                <ul class="content mui-table-view mui-table-view-chevron">
                  <li class="mui-table-view-cell mui-media" v-for="(item,index) in messages" :key="index">
                      <router-link :to="'/push_details/'+item.id"> 
                        <p>
                            日期:{{item.date}} 签到:{{item.punsh}}
                            <span class="mui-pull-right">
                                <span v-if="item.type==2" class="mui-btn-success">正点</span>
                                <span v-if="item.type==3" class="mui-btn-primary">迟到</span>
                                <span v-if="item.type==4" class="mui-btn-warning">早退</span>
                                <span v-if="item.type==5" class="mui-btn-danger">旷工</span>
                            </span>
                        </p>
                        <p>{{item.content}}</p>  
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
import vHead from "@/components/header";

export default {
  data() {
    return {
      title: "签到记录",
      current: 1,
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
        },
        {
          id: 3,
          date: "2018-03-05",
          title: "迟到签到",
          content: "您迟到了10分钟",
          type: 3,
          later: 10,
          punsh: "08:25:54"
        },
        {
          id: 3,
          date: "2018-03-05",
          title: "迟到签到",
          content: "您迟到了10分钟",
          type: 3,
          later: 10,
          punsh: "08:25:54"
        },
        {
          id: 3,
          date: "2018-03-05",
          title: "迟到签到",
          content: "您迟到了10分钟",
          type: 3,
          later: 10,
          punsh: "08:25:54"
        },
        {
          id: 3,
          date: "2018-03-05",
          title: "迟到签到",
          content: "您迟到了10分钟",
          type: 3,
          later: 10,
          punsh: "08:25:54"
        },
        {
          id: 3,
          date: "2018-03-05",
          title: "迟到签到",
          content: "您迟到了10分钟",
          type: 3,
          later: 10,
          punsh: "08:25:54"
        },
        {
          id: 3,
          date: "2018-03-05",
          title: "迟到签到",
          content: "您迟到了10分钟",
          type: 3,
          later: 10,
          punsh: "08:25:54"
        },
        {
          id: 3,
          date: "2018-03-05",
          title: "迟到签到",
          content: "您迟到了10分钟",
          type: 3,
          later: 10,
          punsh: "08:25:54"
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
    refresh(done) {
      setTimeout(() => {
        done();
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
        line-height: 44px;
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
  }
  .mui-table-view-chevron {
    .mui-table-view-cell {
      padding-right: 38px;
    }
  }
}
</style>