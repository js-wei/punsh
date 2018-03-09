<template>
    <div class="message">
        <v-head :title="title"></v-head>
        <scroller :on-refresh="refresh" :on-infinite="infinite" 
            height="90%" ref="my_scroller" style="padding-top:50px;" >
            <!-- custom refresh spinner, use default `spinner` & viewBox 0,0,64,64 class -->
            <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
                <ul class="mui-table-view mui-table-view-chevron message-list-view">
                    <li class="mui-table-view-cell mui-media" v-for="(item,index) in messages" :key="index">
                        <router-link :to="'/message_details/'+item.id" class='mui-navigate-right'>
                            <img class="mui-media-object mui-pull-left" :src="item.head">
                            <div class="mui-media-body">
                                <p class="mui-media-title">{{item.title}}</p>
                                <p class="mui-ellipsis">{{item.content}}</p>
                                <p>{{item.date}}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            <!-- custom infinite spinner -->
            <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
        </scroller>
        
    </div>
</template>
<script>
import vHead from "@/components/header.vue";
export default {
  data() {
    return {
      title: "消息",
      page: 1,
      count: 0,
      messages: [
        {
          id: 1,
          head: "static/images/logo.png",
          title: "公司清明放假通知",
          content:
            "公司清明放假通知定于3月10日到3月13日,请各位公司同仁相互转告",
          date: "03-05"
        },
        {
          id: 2,
          head: "static/images/logo.png",
          title: "公司团建活动",
          content:
            "公司团建活动:为了增进广大员工间的友谊,公司决定于本周六(3月17日)在高新区西部生态城举行团建活动",
          date: "03-14"
        }
      ]
    };
  },
  components: {
    vHead
  },
  methods: {
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
  },
  created() {}
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