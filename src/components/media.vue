/*
 * File: d:\works\punsh\src\components\media.vue
 * Created Date: 2018-03-12 10:36:25
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-04-13 10:34:55
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="media">
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" 
          class="my-scroller" style="padding-top:265px;">
            <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g>
            </svg>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="(item,index) in mediaList" :key="index">
                    <a @click.stop="forwad('/news_defailt/'+item.id,item.id)">
                        <img class="mui-media-object mui-pull-right"  v-lazy="item.image" v-if="item.image">
                        <div class="mui-media-body">
                            {{item.title}}
                            <p class='mui-ellipsis'>
                                {{item.author}}
                            </p>
                            <p>
                                {{item.date|time_ago}}发布
                            </p>
                        </div>
                    </a>
                </li>
            </ul>
            <!-- custom infinite spinner -->
            <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
              <g>
                <circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle>
              </g>
            </svg>
        </scroller>
        
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    mediaList: {
      type: Array,
      default: []
    }
  },
  computed: {
    ...mapState({
      position: state => state.mutations.scollerPosition
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.my_scroller.scrollBy(this.position.x, this.position.y, true);
    });
  },
  methods: {
    forwad($url, $id) {
      let self = this;
      let position = self.$refs.my_scroller.getPosition();
      self.$store.commit("CATCH_SCOLLER_POSITION", {
        x: position.left,
        y: position.top
      });
      self.$fly
        .get("/query", {
          action: "details",
          mod: "article",
          id: $id,
          field: "id,author,content,image,date,description,keywords,title,hits"
        })
        .then(res => {
          if (res.data.status) {
            let _data = res.data.data;
            self.$store.commit("CATCH_ARTICLE", _data);
            self.$router.push($url);
          }
        });
    },
    refresh(done) {
      this.$emit("refresh", done);
    },
    infinite(done) {
      this.$emit("infinite", done);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/base";
.media {
  padding-top: 0px;
  .mui-table-view {
    .mui-table-view-cell {
      padding: 12px 15px;
      a {
        .mui-media-object {
          max-width: 80px;
          width: 80px;
          height: 80px;
        }
        .mui-media-body {
          padding: 0 2px;
          font-weight: normal;
          white-space: normal;
          font-size: 1.5rem;
          p {
            padding: 1px 0;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
  .mui-table-view-cell > a:not(.mui-btn) {
    margin: -11px -17px;
  }
}
</style>