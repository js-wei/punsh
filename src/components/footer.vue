<template>
    <div>
      <footer class="footer" v-if="show" id="footer"> 
          <nav>
              <li :class="{'active':currentPage==m.href,'report':m.href.indexOf('report')>-1}" 
                  v-for="(m,i) in menu" :key="i" @click.stop="forward(m.href)">
                    <span class="mui-icon" :class="m.icon" @click.stop="report" v-if="m.href=='report'"></span>
                  <span class="mui-icon" :class="m.icon" v-if="m.href!='report'"></span>
                  <span class="mui-tab-label">{{m.title}}</span>
              </li>
              <!-- :to="m.href.indexOf('report')?m.href:''"  -->
          </nav>
      </footer>
      <div id="sheet1" class="mui-popover mui-popover-bottom mui-popover-action" v-if="show">
        <!-- 可选择菜单 -->
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" v-for="(item,index) in sheet" :key="index" @click="selectItem(item.url)">
            {{item.title}}
          </li>
        </ul>
        <!-- 取消菜单 -->
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" @click="closeSheet">
            <b>取消</b>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import "../../static/javascript/mui.picker";
import "../../static/javascript/mui.poppicker";
export default {
  data() {
    return {
      currentPage: "",
      sheet: [
        {
          title: "加班/调休",
          url: "/overtime"
        },
        {
          title: "请假申请",
          url: "/applyfor"
        },
        {
          title: "迟到申诉",
          url: "/later"
        },
        {
          title: "待办",
          url: "/event"
        }
      ]
    };
  },
  props: {
    menu: Array,
    current: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    closeSheet() {
      mui("#sheet1").popover("toggle");
    },
    selectItem(url) {
      mui("#sheet1").popover("toggle");
      this.$router.push(url);
    },
    report() {
      mui("#sheet1").popover("toggle");
    },
    forward(url) {
      this.$store.commit("CATCH_SCOLLER_POSITION", {x: 0,y: 0 });
      //this.$store.commit("CATCH_ARTICLE_LIST", null);
      this.$router.replace(url);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/base";
.footer {
  position: fixed;
  bottom: 0 !important;
  height: 55px;
  background-color: nth($baseColor, 3);
  width: 100vw;
  z-index: 100;
  nav {
    width: 100%;
    height: 50px;
    padding-top: 5px;
    position: relative;
    li {
      position: relative;
      display: block;
      float: left;
      text-align: center;
      width: 20vw;
      color: nth($baseColor, 1);
      span {
        display: block;
        height: 100%;
        padding-bottom: 2px;
        &.mui-icon {
          font-size: 2.2rem;
        }
        &.fa-qiandao-kaoqindaqia {
          font-size: 2.3rem;
        }
        &.mui-icon-plus {
          position: relative;
          top: -25px;
          padding: 5px;
          font-size: 5rem;
          background-color: nth($baseColor, 3);
          border-radius: 50%;
        }
        &.mui-tab-label {
          font-size: 1.8rem;
        }
      }
    }
  }
}
</style>