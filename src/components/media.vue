/*
 * File: d:\works\punsh\src\components\media.vue
 * Created Date: 2018-03-12 10:36:25
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-13 9:33:05
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="media">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item,index) in mediaList" :key="index">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-right" :src="item.image" v-if="item.image">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            {{item.description}}
                        </p>
                        <p>
                            {{item.date}}
                        </p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    mediaList: {
      type: Array,
      default: []
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../assets/style/base";
.media {
  padding-top: 0px;
  .mui-table-view {
    .mui-table-view-cell {
      a {
        .mui-media-object {
            max-width: 80px;
            width: 80px;
            height:80px;
        }
        .mui-media-body {
          padding:0 4px;
          font-weight: normal;
          white-space: normal;
          font-size:1.5rem;
          p{
              padding:1px 0;
              font-size:1.2rem;
          }
        }
      }
    }
  }
}
</style>