/*
 * File: d:\works\punsh\src\views\event.vue
 * Created Date: 2018-04-12 10:49:18
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-04-17 10:31:11
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="event">
         <Calendar
          ref="calendar1"
          :events="calendar1.events" 
          :lunar="calendar1.lunar" 
          :value="calendar1.value" 
          :begin="calendar1.begin" 
          :end="calendar1.end" 
          :weeks="calendar1.weeks" 
          :months="calendar1.months" 
          :mouthEnvets="mouthEvents"
          @select="calendar1.select"
          @selectMonth="calendar1.selectMonth"
          @selectYear="calendar1.selectYear">
        </Calendar>
        <!-- <ul class="tabbar">
            <li v-for="(item,index) in tabbar" :key="index">
                <span :class="item.icon"></span>
                <span>{{item.title}}</span>
            </li>
        </ul> -->
    </div>
</template>

<script>
import vBslider from "@/components/bslider";
import Calendar from "@/components/calendar/calendar.vue";
export default {
  data() {
    return {
      current: 0,
      currentMouth: 0,
      startX: 0,
      startY: 0,
      calendar1: {
        lunar: true, //显示农历
        events: {},
        select(value) {
          console.log(value.toString());
        },
        selectMonth(month, year) {
          console.log(year, month);
        },
        selectYear(year) {
          console.log(year);
        },
        timestamp: Date.now()
      },
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
      ],
      mouthEvents:[
        {
          title:'去新城花园酒店吃饭',
          date:'2018/4/12 18:20',
          desc:'应该早到，有重要的贵宾到场'
        },
        {
          title:'到苏州站乘坐高铁去上海了',
          date:'2018/5/1 8:20',
          desc:''
        },
        {
          title:'被忘记订酒店哦',
          date:'2018/4/20 18:20',
          desc:'在上海浦东陈毅广场附近订一个酒店'
        },
      ]
    };
  },
  components: {
    vBslider,
    Calendar
  },
  created() {
    this.$store.commit("HIDE_FOOTER");
  },
  mounted() {},
  methods: {
    selectItem(id) {}
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