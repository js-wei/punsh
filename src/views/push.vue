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
                <v-bnavbar :itemList="pushType" class="mui-navbar" @selectItem="selectItem" :isLink="false"></v-bnavbar>
            </ul>
            <scroller :on-refresh="refresh" :on-infinite="infinite" 
              height="90%" ref="my_scroller" style="padding-top:81px;" class="my-scroller">
              <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
                <v-media-list :list="messages" :baseUrl="'/push_details/'" :mod="'punch'"></v-media-list>
              <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
                <g>
                  <circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle>
                </g>
              </svg>
            </scroller>
        </div>
    </div>
</template>

<script>
import vHead from "@/components/header";
import vMediaList from "@/components/mediaList";
import vBnavbar from "@/components/bnavbar";
import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "签到记录",
      current: 0,
      pushType: [
        {
          id: 0,
          title: "全部"
        },
        {
          id: 1,
          title: "正点"
        },
        {
          id: 2,
          title: "迟到"
        },
        {
          id: 3,
          title: "早退"
        },
        {
          id: 4,
          title: "旷工"
        },
        {
          id: 5,
          title: "加班"
        }
      ],
      messages: [],
      current_page: 1,
      last_id: 0,
      last_page: 0
    };
  },
  components: {
    vHead,
    vMediaList,
    vBnavbar
  },
  created() {
    this._initPunch();
  },
  methods: {
    selectItem(item) {
      this.current = item.id;
      this._initPunch();
    },
    refresh(done) {
      let _this = this;
      this.$fly
        .get("/query", {
          action: "refresh",
          mod: "punch",
          where: [
            {
              field: "id",
              op: "gt",
              val: this.last_id
            },
            {
              field: "status",
              op: "eq",
              val: 1
            },
            {
              field: "type",
              op: "eq",
              val: this.current ? this.current : ""
            }
          ],
          order: "id desc"
        })
        .then(res => {
          res = res.data.data;
          _this.messages.unshift(...res);
          _this.last_id = res[0].id;
          // res.forEach(item => {
          //   _this.messages.unshift(item);
          //   _this.last_id = item.id;
          // });
          _this.current_page = 1;
        });
      setTimeout(() => {
        done();
      }, 1500);
    },
    infinite(done) {
      var self = this;
      if (this.current_page >= this.last_page) {
        done(true);
        return;
      }
      let p = ++this.current_page;
      setTimeout(() => {
        this.$fly
          .get("/query", {
            action: "page",
            mod: "punch",
            order: "date desc",
            p: p,
            where: [
              {
                field: "status",
                op: "eq",
                val: 1
              },
              {
                field: "type",
                op: "eq",
                val: this.current ? this.current : ""
              }
            ]
          })
          .then(res => {
            if (!res.data.status) {
              return;
            }
            res = res.data.data;
            let _data = res.data;
            self.messages.push(..._data);
            // _data.forEach(item => {
            //   self.messages.push(item);
            // });
            done();
          });
        done();
      }, 0.5e3);
    },
    _initPunch() {
      this.messages = [];
      this.$fly
        .get("/query", {
          action: "page",
          mod: "punch",
          order: "date desc",
          where: [
            {
              field: "status",
              op: "eq",
              val: 1
            },
            {
              field: "type",
              op: "eq",
              val: this.current ? this.current : ""
            }
          ]
        })
        .then(res => {
          res = res.data.data;
          if (res.data.length) {
            this.messages = res.data;
            this.last_page = res.last_page;
            this.current_page = res.current_page;
            this.last_id = res.data[0].id;
          }
        });
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
      margin: 2px auto;
      position: fixed;
      height: 36px;
      width: 100%;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      z-index: 1000;
      padding-top: 8px;
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