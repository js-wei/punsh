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

<template>
    <div class="push">
        <v-head :title="title" :isSlotRight="isSlotRight" :backHandler="back">
            <div slot="header-right">
                <router-link to="/applyfor" class="mui-icon mui-icon-plusempty upload">
                  申请
                </router-link>
            </div>
        </v-head>
        <div>
            <ul class="mui-navbar">
              <v-bnavbar :itemList="pushType" class="mui-navbar" @selectItem="selectItem" :isLink="false"></v-bnavbar>
            </ul>
            <scroller :on-refresh="refresh" :on-infinite="infinite" 
              height="90%" ref="my_scroller" style="padding-top:80px;" >
                <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                  <g stroke-width="7" stroke-linecap="round">
                    <line x1="10" x2="10" y1="27.3836" y2="36.4931">
                      <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
                      <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
                      <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate>
                    </line>
                    <line x1="24" x2="24" y1="18.6164" y2="45.3836">
                      <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
                      <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
                      <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate>
                    </line>
                    <line x1="38" x2="38" y1="16.1233" y2="47.8767">
                      <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
                      <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
                      <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate>
                    </line>
                    <line x1="52" x2="52" y1="16" y2="48">
                      <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate>
                      <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate>
                      <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate>
                    </line>
                  </g>
                </svg>
               <v-media-list :list="leave" :baseUrl="'/applay_details/'" :mod="'applay'"></v-media-list>
                <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
                  <g>
                    <circle cx="16" cy="32" stroke-width="0" r="3">
                      <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate>
                      <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
                    </circle>
                    <circle cx="32" cy="32" stroke-width="0" r="3.09351">
                      <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate>
                      <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
                    </circle>
                    <circle cx="48" cy="32" stroke-width="0" r="4.09351">
                      <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate>
                      <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
                    </circle>
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
import {mapState} from 'vuex'
export default {
  data() {
    return {
      title: "请假记录",
      isSlotRight: true,
      current: 0,
      pushType: [
        {
          id: 0,
          title: "全部"
        },
        {
          id: 1,
          title: "事假"
        },
        {
          id: 2,
          title: "病假"
        },
        {
          id: 3,
          title: "婚假"
        },
        {
          id: 4,
          title: "产假"
        },
        {
          id: 5,
          title: "丧假"
        },
        {
          id: 6,
          title: "其他"
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
    vBnavbar,
    vMediaList
  },
  computed: {
    ...mapState({
      leave:state=>state.mutations.leaveList
    })
  },
  methods: {
    selectItem(item) {
      this.current = item.id;
      this._initMessage(false);
    },
    refresh(done) {
      let _this = this;
      this.$fly
        .get("/query", {
          action: "refresh",
          mod: "applay",
          where: [
            {
              field: "id",
              op: "gt",
              val: this.last_id
            },
            {
              field: "type",
              op: "eq",
              val: this.current
            }
          ],
          order: "id desc"
        })
        .then(res => {
          res = res.data.data;
          if (!res.length) return;
          _this.messages.unshift(...res);
          _this.last_id = res[0].id;
          _this.current_page = 1;
          this.$store.commit("CATCH_LEAVE_LIST", _this.messages);
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
            mod: "applay",
            order: "id desc",
            p: p
          })
          .then(res => {
            if (!res.data.status) {
              return;
            }
            res = res.data.data;
            let _data = res.data;
            self.messages.push(..._data);
            this.$store.commit("CATCH_LEAVE_LIST", self.messages);
            done();
          });
        done();
      }, 0.5e3);
    },
    _initMessage(flag=true) {
      if (flag && this.leave.length > 0) {
        return;
      }
      this.$fly
        .get("/query", {
          action: "page",
          mod: "applay",
          order: "date desc",
          where: [
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
          this.$store.commit("CATCH_LEAVE_LIST", res.data);
        });
    },
    back() {
      this.$router.push("/personal");
    }
  },
  created() {
    this._initMessage();
    this.$nextTick(() => {
      this.$refs.my_scroller.triggerPullToRefresh();
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
      margin: 0px auto;
      position: fixed;
      height: 36px;
      width: 100%;
      padding-top: 10px;
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