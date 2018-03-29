/*
 * File: d:\works\punsh\src\components\mediaList.vue
 * Created Date: 2018-03-29 11:49:01
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-29 5:42:11
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div>
        <ul class="mui-table-view mui-table-view-chevron message-list-view">
            <li class="mui-table-view-cell mui-media" v-for="(item,index) in list" :key="index">
                <a  @click.stop="forwad(baseUrl+item.id,item.id)" class='mui-navigate-right'>
                    <img class="mui-media-object mui-pull-left" :src="item.head">
                    <div class="mui-media-body">
                        <p class="mui-media-title">{{item.title}}</p>
                        <p class="mui-ellipsis">{{item.content}}</p>
                        <p>{{item.date|time_ago}}</p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    baseUrl: {
      type: String,
      default: ""
    },
    mod: {
      type: String,
      default: "article"
    }
  },
  methods: {
    forwad($url, $id) {
      let _this = this;
      let request = {
        action: "details",
        mod: _this.mod,
        id: $id,
        where: [
          {
            field: "status",
            op: "eq",
            val: _this.mod=='punch'?1:0
          }
        ]
      };
      _this.$fly.get("/query", request).then(res => {
        if (res.data.status) {
          let _data = res.data.data;
          _this.$store.commit("CATCH_ARTICLE", _data);
          _this.$router.push($url);
        }
      });
    }
  }
};
</script>