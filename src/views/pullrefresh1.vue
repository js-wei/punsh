/*
 * File: d:\works\punsh\src\views\pullrefresh1.vue
 * Created Date: 2018-03-08 4:34:24
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-08 5:47:04
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="scroll-list-wrap">
        <scroll ref="scroll"
            :data="items"
            :pullDownRefresh="pullDownRefresh"
            :pullUpLoad="pullUpLoad"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp"
            @click="clickItem"
        style="height:200px;">
        </scroll>
    </div>
</template>

<script>
import Scroll from "../components/scroll.vue";
export default {
  data() {
    return {
      items: [],
      pullDownRefresh: {
        threshold: 50,
        stop: 40
      },
      pullUpLoad: {
        threshold: -50,
        txt: {
          more: "加载更多",
          noMore: "没有数据了"
        }
      }
    };
  },
  created() {
    for (let i = 0; i < 5; i++) {
      this.items.push("index" + i);
    }
  },
  components: {
    Scroll
  },
  methods: {
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (this._isDestroyed) {
          return;
        }
        this.items.unshift("index")
        console.log(this.items)
        // if (Math.random() > 0.5) {
        //   // 如果有新数据
        //   this.items.unshift("更新于:"+new Date())
        // } else {
        //   // 如果没有新数据
        //   this.$refs.scroll.forceUpdate();
        // }
      }, 2000);
    },
    onPullingUp() {
      // 更新数据
      setTimeout(() => {
        if (this._isDestroyed) {
          return;
        }
        // if (Math.random() > 0.5) {
        //   // 如果有新数据
        //   newPage = [];
        //   for (let i = this.items.lenght; i < this.items.lenght + 5; i++) {
        //     newPage.push("index" + i);
        //   }
        //   this.items = this.items.concat(newPage);
        // } else {
        //   // 如果没有新数据
        //   this.$refs.scroll.forceUpdate();
        // }
      }, 1500);
    },
    clickItem() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>

</style>