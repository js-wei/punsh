<template>
    <div class="message">
        <v-head :title="title"></v-head>
        <scroller :on-refresh="refresh" :on-infinite="infinite" 
            height="100%" ref="my_scroller" style="padding-top:48px;" >
            <!-- custom refresh spinner, use default `spinner` & viewBox 0,0,64,64 class -->
            <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
                <!-- <ul class="mui-table-view mui-table-view-chevron message-list-view">
                    <li class="mui-table-view-cell mui-media" v-for="(item,index) in messages" :key="index">
                        <a :to="'/message_details/'+item.id" class='mui-navigate-right'>
                            <img class="mui-media-object mui-pull-left" :src="item.head">
                            <div class="mui-media-body">
                                <p class="mui-media-title">{{item.title}}</p>
                                <p class="mui-ellipsis">{{item.content}}</p>
                                <p>{{item.date|time_ago}}</p>
                            </div>
                        </a>
                    </li>
                </ul> -->
                <v-media-list :list="messages" :baseUrl="'/message_details/'" :mod="'message'"></v-media-list>
            <!-- custom infinite spinner -->
            <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
        </scroller>
    </div>
</template>
<script>
import vHead from "@/components/header.vue";
import vMediaList from "@/components/mediaList";
export default {
  data() {
    return {
      title: "消息",
      current_page: 1,
      last_id: 0,
      last_page: 0,
      messages: []
    };
  },
  components: {
    vHead,
    vMediaList
  },
  mounted() {
    //document.querySelector("._v-content").style.paddingBottom = 50 + "px";
  },
  methods: {
    refresh(done) {
      let _this = this;
      this.$fly
        .get("/query", {
          action: "refresh",
          mod: "message",
          where: [
            {
              field: "id",
              op: "gt",
              val: this.last_id
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
            mod: "message",
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
            // _data.forEach(item => {
            //   self.messages.push(item);
            // });
            done();
          });
        done();
      }, 0.5e3);
    },
    _initMessage() {
      this.$fly
        .get("/query", {
          action: "page",
          mod: "message",
          order: "id desc"
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
    },
    onItemClick(index, item) {
      console.log(index);
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
.message {
  .message-list {
    .message-list-view {
      li {
        width: 100vw;
        a {
          width: 100%;
          .mui-media-body {
            p {
              width: 100px;
              height: auto;
              padding-bottom: 2px;
            }
          }
        }
      }
    }
  }
  .mui-card:nth-last-child(1) {
    margin-bottom: 70px;
  }
  .mui-card-header > img:first-child {
    width: 100%;
    height: 100%;
  }
  .mui-pull-bottom-pocket {
    position: inherit;
  }
}
</style>