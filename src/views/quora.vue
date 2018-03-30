/*
 * File: d:\works\punsh\src\views\quora.vue
 * Created Date: 2018-03-22 9:47:05
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-30 11:40:27
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
   <div>
       <v-bnavbar :itemList="itemList" @selectItem="selectItem" :isLink="false"></v-bnavbar>
   </div>
</template>

<script>
import vBnavbar from "@/components/bnavbar";
export default {
  data() {
    return {
      itemList: [
        {
          id: 1,
          title: "关注",
          url: ""
        },
        {
          id: 2,
          title: "推荐",
          url: ""
        },
        {
          id: 3,
          title: "深圳",
          url: ""
        },
        {
          id: 4,
          title: "视频",
          url: ""
        },
        {
          id: 5,
          title: "音乐",
          url: ""
        },
        {
          id: 6,
          title: "热点",
          url: ""
        },
        {
          id: 7,
          title: "新时代",
          url: ""
        },
        {
          id: 8,
          title: "娱乐",
          url: ""
        },
        {
          id: 9,
          title: "头条号",
          url: ""
        },
        {
          id: 10,
          title: "问答",
          url: ""
        },
        {
          id: 11,
          title: "图片",
          url: ""
        },
        {
          id: 12,
          title: "科技",
          url: ""
        },
        {
          id: 13,
          title: "体育",
          url: ""
        },
        {
          id: 14,
          title: "财经",
          url: ""
        },
        {
          id: 15,
          title: "军事",
          url: ""
        },
        {
          id: 16,
          title: "国际",
          url: ""
        }
      ]
    };
  },
  components: {
    vBnavbar
  },
  methods: {
    selectItem(item) {
      console.log(item.title);
    }
  }
};
</script>
<style lang="scss" scoped>

</style>