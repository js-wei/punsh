<template>
  <div id="app">
    <!-- <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" keep-alive></transition> -->
     <router-view class="router" ref="router" keep-alive v-cloak/>
     <!-- <button @click="_pushPunchMessage">推送通知</button> -->
    <v-footer :menu="menu" v-if="getFooterState" id="tabbar"></v-footer>
  </div>
</template>

<script>
import vHead from "@/components/header.vue";
import vSlider from "@/components/slider.vue";
import vFooter from "@/components/footer.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      isFootershow: true,
      transitionName: "slide-left",
      menu: [
        {
          title: "首页",
          href: "/home",
          icon: "mui-icon-home"
        },
        {
          title: "打卡",
          href: "/punch",
          icon: "fa fa-qiandao-kaoqindaqia"
        },
        {
          title: "",
          href: "report",
          icon: "mui-icon-plus"
        },
        {
          title: "圈子",
          href: "/quora",
          icon: "mui-icon-pengyouquan"
        },
        {
          title: "我的",
          href: "/personal",
          icon: "mui-icon-contact"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getFooterState"]),
    ...mapState({
      isBack: state => state.mutations.navigaterBack,
      config: state => state.mutations.site
    })
  },
  components: {
    vFooter
  },
  methods: {
    _initSite() {
      if (this.site) {
        return;
      }
      this.$fly.get("/config").then(res => {
        this.$store.commit("UPDATE_SITE_CONFIG", res.data.data);
      });
      this._pushPunchMessage();
    },
    _addTouchEvents() {
      document.querySelector(".spinner-holder").style.display = "none";
      document
        .querySelector("._v-content")
        .addEventListener("touchstart", e => {
          document.querySelector(
            ".pull-to-refresh-layer"
          ).style.backgroundImage =
            "url('http://7xvgyf.com1.z0.glb.clouddn.com/2018031214175824091meeting.png?imageMogr2/quality/90/thumbnail/127x45!')";
          document.querySelector(".spinner-holder").style.display = "none";
        });
      document.querySelector("._v-content").addEventListener("touchend", e => {
        document.querySelector(".pull-to-refresh-layer").style.backgroundImage =
          "none";
        document.querySelector(".spinner-holder").style.display = "block";
      });
    },
    _networkinfo() {
      var types = {};
      types[plus.networkinfo.CONNECTION_UNKNOW] = "Unknown connection";
      types[plus.networkinfo.CONNECTION_NONE] = "None connection";
      types[plus.networkinfo.CONNECTION_ETHERNET] = "Ethernet connection";
      types[plus.networkinfo.CONNECTION_WIFI] = "WiFi connection";
      types[plus.networkinfo.CONNECTION_CELL2G] = "Cellular 2G connection";
      types[plus.networkinfo.CONNECTION_CELL3G] = "Cellular 3G connection";
      types[plus.networkinfo.CONNECTION_CELL4G] = "Cellular 4G connection";
      if (plus.networkinfo.getCurrentType() == 3) {
        this.$store.commit("SET_NETWORK_TYPE", { no: 3, name: "WIFI网络" });
      }
      if (plus.networkinfo.getCurrentType() > 3) {
        this.$store.commit("SET_NETWORK_TYPE", { no: 2, name: "移动流量" });
      }
      if (plus.networkinfo.getCurrentType() == 1) {
        this.$store.commit("SET_NETWORK_TYPE", { no: 1, name: "无网络" });
      }
    },
    _onNetChange() {
      var nt = plus.networkinfo.getCurrentType();
      switch (nt) {
        case plus.networkinfo.CONNECTION_ETHERNET:
        case plus.networkinfo.CONNECTION_WIFI:
          mui.toast("当前网络为WiFi");
          this.$store.commit("SET_NETWORK_TYPE", { no: 3, name: "WIFI网络" });
          break;
        case plus.networkinfo.CONNECTION_CELL2G:
        case plus.networkinfo.CONNECTION_CELL3G:
        case plus.networkinfo.CONNECTION_CELL4G:
          mui.toast("非WiFi网络,请注意流量");
          this.$store.commit("SET_NETWORK_TYPE", { no: 2, name: "移动流量" });
          break;
        default:
          mui.toast("当前没有网络");
          this.$store.commit("SET_NETWORK_TYPE", { no: 1, name: "无网络" });
          break;
      }
    },
    _pushPunchMessage() {
      //推送签到消息
      if (!window.plus) {
        return;
      }
      let date = new Date();
      let hours = date.getHours();
      if (hours > 7 && hours < 9) {
        plus.push.createMessage("别忘记上班打卡");
      }
      if (hours > 17 && hours < 18) {
        plus.push.createMessage("别忘记下班打卡");
      }
    }
  },
  created() {
    let _this = this;
    _this._initSite();
  },
  mounted() {
    let _this = this;
    setTimeout(() => {
      mui.plusReady(function() {
        plus.navigator.setStatusBarBackground("#eb7d46");
        document.querySelector(".footer").style.top =
          plus.display.resolutionHeight - 55 + "px";
        _this._networkinfo(); //网络信息
        document.addEventListener("netchange", _this._onNetChange, false); //监听网络
        plus.key.addEventListener(
          "backbutton",
          e => {
            _this.$router.back();
            return false;
          },
          false
        );
        _this._pushPunchMessage(); //推送消息
      });
    }, 0.5e3);
  },
  watch: {
    $route(to, from) {}
  }
};
</script>
<style>
html {
  font-size: 66.5%;
}
.mui-content.mui-scroll-wrapper {
  overflow: auto;
}
.mui-slider.mui-fullscreen
  .mui-slider-group
  .mui-control-content
  .mui-scroll-wrapper {
  overflow: auto;
}
.mui-bar-nav ~ .mui-content {
  padding-top: 0;
}
.mui-popup-button {
  border-right: 0.1px solid rgba(0, 0, 0, 0.1);
}
.mui-popup-button:after {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
<style scoped>
.router {
  padding-top: 42px;
  height: 90%;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 150ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>

<style lang="scss">
@import "./assets/style/base";
body {
  margin: 0;
  padding: 0;
  background-color: nth($baseColor, 1);
}
.mui-backdrop {
  z-index: 10;
}
.mui-popover {
  z-index: 999;
}
.mui-popover.mui-popover-action .mui-table-view {
  color: nth($baseColor, 3);
}

.mui-switch.mui-active {
  background-color: nth($baseColor, 3);
  border-color: nth($baseColor, 3);
}
.mui-btn-blue {
  background-color: nth($baseColor, 3);
  border-color: nth($baseColor, 3);
}
.mui-checkbox input[type="checkbox"]:checked:before,
.mui-radio input[type="radio"]:checked:before {
  color: nth($baseColor, 3);
}
.mui-popup-button {
  color: nth($baseColor, 3);
}
.v-cloak {
  display: none;
}
:focus {
  outline: 0;
}
.mui-card-content img {
  width: 90%;
}
a:hover,
a:visited,
a:link,
a:active {
  background-color: unset;
}
.loading-layer {
  padding-bottom: 20px;
}
.amap-simple-marker .amap-simple-marker-label {
  color: #fff;
  font-size: 12px;
}
.amap-simple-marker-def-style .amap-simple-marker-label {
  line-height: 40px !important;
}
.noun span.mint-cell-text {
  margin-left: 35px !important;
}
.profile-information span.mint-cell-text {
  margin-left: 0 !important;
  font-size: 1rem;
}
.profile .mint-cell-title {
  min-width: 65px;
}
.profile .mint-cell-value {
  line-height: 1.5rem;
  font-size: 0.9rem;
  padding: 5px;
}
.profile .mint-popup.mint-popup-bottom {
  width: 100%;
}
.profile .mint-button.mint-button--primary {
  width: 45%;
  margin-top: 10px;
  margin-left: 10px;
}
.container {
  margin-top: 50px;
  height: auto;
  padding-bottom: 10px;
}
span.mint-cell-text {
  color: rgb(77, 77, 77);
  margin-left: 35px;
  font-size: 1.2rem;
}
.mint-cell-wrapper {
  background: none;
  border-bottom: 1px solid #f2f2f2;
}
._v-container {
  ._v-content {
    padding-bottom: 50px;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  html {
    font-size: 120%;
  }
  .header {
    .mint-header {
      height: 80px !important;
      line-height: 80px;
    }
  }
  .mint-tab-item-icon {
    width: 40px;
    height: 40px;
  }
  .mint-tab-item-label {
    font-size: 1.5rem;
  }
}
</style>