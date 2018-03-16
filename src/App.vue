<template>
  <div id="app">
    <!-- <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" keep-alive></transition> -->
     <router-view class="router" ref="router"/>
    <v-footer :menu="menu" v-if="getFooterState" id="tabbar"></v-footer>
  </div>
</template>

<script>
import vHead from "@/components/header.vue";
import vSlider from "@/components/slider.vue";
import vFooter from "@/components/footer.vue";
import { mapState,mapGetters} from "vuex"

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
    ...mapGetters(['getFooterState']),
    ...mapState({
      direction: state => state.mutations.navigater.direction,
    })
  },
  components: {
    vFooter
  },
  methods: {
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
      if(plus.networkinfo.getCurrentType()==3){
        console.log(this._getWifiName())
      }
    },
    _onNetChange() {
      //获取当前网络类型
      var nt = plus.networkinfo.getCurrentType();
      switch (nt) {
        case plus.networkinfo.CONNECTION_ETHERNET:
        case plus.networkinfo.CONNECTION_WIFI:
          mui.toast("当前网络为WiFi");
          break;
        case plus.networkinfo.CONNECTION_CELL2G:
        case plus.networkinfo.CONNECTION_CELL3G:
        case plus.networkinfo.CONNECTION_CELL4G:
          mui.toast("当前网络非WiFi");
          break;
        default:
          mui.toast("当前没有网络");
          break;
      }
    },
    _getWifiName() {
      if (mui.os.android) {
        var wifiManager, wifiInfo;
        var Context = plus.android.importClass("android.content.Context");
        var WifiManager = plus.android.importClass(
          "android.net.wifi.WifiManager"
        );
        var WifiInfo = plus.android.importClass("android.net.wifi.WifiInfo");
        wifiManager = plus.android
          .runtimeMainActivity()
          .getSystemService(Context.WIFI_SERVICE);
        wifiInfo = wifiManager.getConnectionInfo();
        var ssid = wifiInfo.getSSID() || "";
        if (ssid.length == 0) {
          return null;
        }
        //一些手机上获取SSID是有值的，但是实际IP为空，真实为未连接
        var i = parseInt(wifiInfo.getIpAddress());
        var ipStr =
          (i & 0xff) +
          "." +
          ((i >> 8) & 0xff) +
          "." +
          ((i >> 16) & 0xff) +
          "." +
          ((i >> 24) & 0xff);
        if (ipStr == "0.0.0.0") {
          return null;
        }
        if (ssid != "<unknown ssid>" && ssid.toUpperCase() != "0X") {
          return ssid.replace(/\"/g, "");
        }
        return null;
      }
      return null;
    }
  },
  mounted() {
    let _this = this
    mui.plusReady(function() {
      plus.navigator.setStatusBarBackground("#eb7d46");
      document.querySelector('#tabbar').style.top = (plus.display.resolutionHeight - 50) + "px";
      //_this._networkinfo();
      //document.addEventListener("netchange", _this._onNetChange, false);
    });
  },
  watch: {
   
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
body {
  margin: 0;
  padding: 0;
  background-color: #fff;
}
:focus {
  outline: 0;
}
.mui-card-content img {width:87%}
a:hover,
a:visited,
a:link,
a:active {
  background-color: unset;
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
// .my-scroller {
//   .pull-to-refresh-layer {
//     margin-top: -20px !important;
//     //background-image: url('../assets/meeting.png');
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: 140px 40px;
//     opacity: 0;
//     -webkit-transform: scale(1);
//     transform: scale(1);
//     transition: all 0.15s linear;
//     -webkit-transition: all 0.15s linear;
//     .spinner-holder {
//       display: none;
//     }
//     &.active {
//       -webkit-transform: scale(1.35);
//       transform: scale(1.35);
//       opacity: 1;
//     }
//   }
// }
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
