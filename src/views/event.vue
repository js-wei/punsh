/*
 * File: d:\works\punsh\src\views\event.vue
 * Created Date: 2018-04-12 10:49:18
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-04-12 2:39:34
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="event">
        <vue-event-calendar :events="demoEvents" ref="calendar" class="calendar" 
            @month-changed="handleMonthChanged">
        </vue-event-calendar>
        <ul class="tabbar">
            <li v-for="(item,index) in tabbar" :key="index">
                <span :class="item.icon"></span>
                <span>{{item.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import vBslider from "@/components/bslider";
export default {
  data() {
    return {
      current: 0,
      currentMouth: 0,
      startX: 0,
      startY: 0,
      demoEvents: [
        {
          date: "2018/4/15",
          title: "eat",
          desc: "longlonglong description"
        },
        {
          date: "2018/4/10",
          title: "this is a title"
        }
      ],
      tabbar: [
        {
          id: 1,
          title: "添加活动",
          icon: "mui-icon mui-icon-plusempty"
        },
        {
          id: 1,
          title: "月",
          icon: "mui-icon mui-icon-minus"
        },
        {
          id: 1,
          title: "周",
          icon: "mui-icon mui-icon-qq"
        },
        {
          id: 1,
          title: "日",
          icon: "mui-icon mui-icon-close"
        },
        {
          id: 1,
          title: "日程",
          icon: "mui-icon mui-icon-info"
        }
      ]
    };
  },
  components: {
    vBslider
  },
  created() {
    this.$store.commit("HIDE_FOOTER");
  },
  mounted() {
    let _this = this;
    let calendar = document.querySelector(".calendar");
    this.currentMouth = this.$refs.calendar.calendarOptions.params.curMonth;
    calendar.addEventListener("touchstart", e => {
      _this.startX = e.changedTouches[0].pageX;
      _this.startY = e.changedTouches[0].pageY;
    });
    calendar.addEventListener("touchmove", e => {
      let endX = e.changedTouches[0].pageX;
      let endY = e.changedTouches[0].pageY;
      let distanceX = endX - _this.startX;
      let distanceY = endY - _this.startY;
      if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0) {
        document.querySelector(".l").click();
      }
      if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
        document.querySelector(".r").click();
      }
    });
  },
  methods: {
    selectItem(id) {},
    handleMonthChanged(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.event {
  padding-bottom: 50px;
  width: 100vw;
  .calendar {
    width: 100vw;
  }
  .tabbar {
    position: fixed;
    bottom: -20px;
    right: 0;
    width: 100%;
    background-color: pink;
    height: 50px;
    line-height: 50px;
    text-align: center;
    li {
      float: left;
      list-style: none;
      margin-right: 5px;
    }
  }
}
</style>