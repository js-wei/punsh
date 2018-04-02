<template>
    <footer class="footer" v-if="show">
        <nav>
            <router-link :class="{'active':currentPage==m.href,'report':m.href.indexOf('report')>-1}"  
                :to="m.href.indexOf('report')?m.href:''" 
                v-for="(m,i) in menu" :key="i">
                <span class="mui-icon" :class="m.icon" @click="report(m.href)"></span>
                <span class="mui-tab-label">{{m.title}}</span>
            </router-link>
        </nav>
    </footer>
</template>
<script>
import "../../static/javascript/mui.picker";
import "../../static/javascript/mui.poppicker.js";
export default {
  data() {
    return {
      currentPage: ""
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
    reportText() {},
    reportPicture() {},
    reportVedio() {},
    report($event) {
      if ($event != "report") {
        return;
      }
      let self = this;
      mui.plusReady(() => {
        plus.nativeUI.actionSheet(
          {
            cancel: "取消",
            buttons: [
              { title: "加班申请" },
              { title: "假条申请" },
              { title: "迟到申诉" }
            ]
          },
          e => {
            switch (e.index) {
              case 1:
                self.$router.push('/applyfor')
                break;
              case 2:
                this.reportPicture();
                break;
              case 3:
                this.reportVedio();
                break;
            }
          }
        );
      });
    }
  },

  watch: {
    $route(to, from) {
      // const toDepth = to.path.split('/').length;
      // const fromDepth = from.path.split('/').length;
      // if(to.name){
      //     this.currentPage = this.current || to.name;
      // }else{
      //      this.currentPage = '';
      // }
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
    a {
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