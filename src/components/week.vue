/*
 * File: d:\works\punsh\src\components\week.vue
 * Created Date: 2018-04-13 3:16:43
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-04-13 5:08:11
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
 <div class="date">
   <!-- 年份 月份 -->
   <div class="month">
    <span class="left">{{ currentYear }}年{{ currentMonth }}月,第{{weekNomber}}周</span>
    <span class="right"><i class="fa fa-date"></i><i class="date">{{currentDay1}}</i></span>
   </div>
   <!-- 星期 -->
   <ul class="weekdays">
    <li>一</li>
    <li>二</li>
    <li>三</li>
    <li>四</li>
    <li>五</li>
    <li>六</li>
    <li>日</li>
   </ul>
   <!-- 日期 -->
   <ul class="animated days" 
    @touchstart="touchstart" 
    @touchend="touchend"
    :class="animated">
    <li @click="pick(day)" v-for="(day, index) in days" :key="index">
     <!--本月-->
     <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
     <span v-else>
     <!--今天-->
     <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</span>
     <span v-else>{{ day.getDate() }}</span>
     </span>
    </li>
   </ul>
 </div>
</template>
<script>
export default {
  name: "date",
  data() {
    return {
      currentYear: 1970, // 年份
      currentMonth: 1, // 月份
      currentDay: 1, // 日期
      currentWeek: 1, // 星期
      weekNomber: 1,
      touchXStart: 0,
      currentDay1: 1,
      animated: "",
      days: []
    };
  },
  mounted() {},
  created() {
    this.currentDay1 = new Date().getDate();
    this.initData(null);
    this.weekNomber = this.getWeekNumber(
      this.currentYear,
      this.currentMonth,
      this.currentDay
    );
  },
  methods: {
    touchstart($event) {
      this.touchXStart = $event.changedTouches[0].clientX;
      document
        .querySelector(".days")
        .classList.remove("silde", "slideInRight", "slideInLeft");
    },
    touchend($event) {
      let end = $event.changedTouches[0].clientX;
      document
        .querySelector(".days")
        .classList.add(
          "silde",
          this.touchXStart - end > 0 ? "slideInRight" : "slideInLeft"
        );
      if (this.touchXStart - end > 0) {
        this.weekNext();
      } else {
        this.weekPre();
      }
      this.weekNomber = this.getWeekNumber(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
    },
    formatDate(year, month, day) {
      const y = year;
      let m = month;
      if (m < 10) m = `0${m}`;
      let d = day;
      if (d < 10) d = `0${d}`;
      return `${y}-${m}-${d}`;
    },
    getWeekNumber(y, m, d) {
      var today = null;
      if (y && m && d) {
        today = new Date(y, m - 1, d);
      } else {
        today = new Date();
      }

      var firstDay = new Date(today.getFullYear(), 0, 1);
      var dayOfWeek = firstDay.getDay();
      var spendDay = 1;
      if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1;
      }
      firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
      var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
      var result = Math.ceil(d / 7);
      return result + 1;
    },
    initData(cur) {
      let date = "";
      if (cur) {
        date = new Date(cur);
      } else {
        date = new Date();
      }
      this.currentDay = date.getDate(); // 今日日期 几号
      this.currentYear = date.getFullYear(); // 当前年份
      this.currentMonth = date.getMonth() + 1; // 当前月份
      this.currentWeek = date.getDay(); // 1...6,0  // 星期几
      if (this.currentWeek === 0) {
        this.currentWeek = 7;
      }
      const str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      ); // 今日日期 年-月-日
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
      /* eslint-disabled */
      for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
        const d = new Date(str);
        d.setDate(d.getDate() - i);
        // console.log(y:" + d.getDate())
        this.days.push(d);
      }
      for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
        const d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push(d);
      }
    },
    // 上个星期
    weekPre() {
      const d = this.days[0]; // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() - 7);
      this.initData(d);
    },
    // 下个星期
    weekNext() {
      const d = this.days[6]; // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() + 7);
      this.initData(d);
    },
    // 上一個月  传入当前年份和月份
    pickPre(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    // 下一個月  传入当前年份和月份
    pickNext(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    // 当前选择日期
    pick(date) {
      alert(
        this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      );
    }
  }
};
</script>
<style src="../../static/style/animate.css"></style>
<style lang="scss" scoped>
@import "../assets/style/base";
.date {
  color: #333;
  height: auto;
  margin: 0;
  padding: 0;
  .month {
    list-style-type: none;
    font-size: 1.8rem;
    text-align: left;
    margin-left: 20px;
    position: relative;
    border-bottom: 2px solid lighten(nth($baseColor, 2), 80%);
    padding-bottom: 10px;
    .left {
      display: inline-block;
      width: 50%;
      text-align: left;
    }
    .right {
      display: inline-block;
      width: 48%;
      text-align: right;
      i {
        font-style: normal;
        color: nth($baseColor, 3);
        &.fa {
          font-size: 2.5rem;
          margin-right: 20px;
        }
        &.date {
          font-size: 1.2rem;
          position: absolute;
          bottom: 10px;
          right: 28px;
        }
      }
    }
  }
  .weekdays {
    list-style-type: none;
    display: flex;
    font-size: 1.8rem;
    margin-top: 20px;
    li {
      flex: 1;
      text-align: center;
    }
  }
  .days {
    display: flex;
    list-style-type: none;
    li {
      flex: 1;
      font-size: 1.5rem;
      text-align: center;
      margin-top: 0px;
      line-height: 2.2rem;
      .active {
        display: inline-block;
        width: 2.2rem;
        height: 2.2rem;
        color: #fff;
        border-radius: 50%;
        background-color: nth($baseColor, 3);
      }
    }
  }
  .silde {
    -webkit-transition: 0.5s;
    transition: 0.5s;
  }
  .prev-to {
    -webkit-transform: translate3D(0, 0, 0);
    transform: translate3D(0, 0, 0);
  }
  .next-to {
    -webkit-transform: translate3D(-66.6666%, 0, 0);
    transform: translate3D(-66.6666%, 0, 0);
  }
}
</style>