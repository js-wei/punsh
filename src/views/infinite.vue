/*
 * File: d:\works\punsh\src\components\infinite.vue
 * Created Date: 2018-03-09 11:54:38
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-09 12:44:00
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div>
        <scroller
              :on-refresh="refresh"
              :on-infinite="infinite"
              ref="my_scroller">
            <div v-for="(item, index) in items" :key="index" @click="onItemClick(index, item)"
                class="row" :class="{'grey-bg': index % 2 == 0}">
                {{ item }}
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  mounted() {
    for (let i = 1; i <= 20; i++) {
      this.items.push(i + " - keep walking, be 2 with you.");
    }
    this.top = 1;
    this.bottom = 20;
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        let start = this.top - 1;
        for (let i = start; i > start - 10; i--) {
          this.items.splice(0, 0, i + " - keep walking, be 2 with you.");
        }
        this.top = this.top - 10;
        done();
      }, 1500);
    },
    infinite(done) {
      console.log("infinite called..");

      setTimeout(() => {
        let start = this.bottom + 1;
        for (let i = start; i < start + 10; i++) {
          this.items.push(i + " - keep walking, be 2 with you.");
        }
        this.bottom = this.bottom + 10;
        done();
      }, 1500);
    },
    onItemClick(index, item) {
      console.log(index);
    }
  }
};
</script>

<style scoped>
html,
body {
  margin: 0;
}
* {
  box-sizing: border-box;
}
.row {
  width: 100%;
  height: 50px;
  padding: 10px 0;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: #444;
  background-color: #fff;
}
.grey-bg {
  background-color: #eee;
}
</style>