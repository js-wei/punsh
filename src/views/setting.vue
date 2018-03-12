<template>
    <div class="setting">
        <v-head :title="title"></v-head>
        <div class="mui-content">
            <ul class="mui-table-view">
                <!-- <li class="mui-table-view-cell1">
                    非WIFI网络提醒
                    <div class="mui-switch mui-switch-mini mui-active" id="wifiSwitch">
                        <div class="mui-switch-handle"></div>
                    </div>
                </li> -->
                <li class="mui-table-view-cell1">
                    迟到通知
                    <div class="mui-switch mui-switch-mini mui-active" id="laterSwitch">
                        <div class="mui-switch-handle"></div>
                    </div>
                </li>
                <li class="mui-table-view-cell1">
                    自动打卡
                    <span class="text-tips">链接公司网络自动完成打卡</span>
                    <div class="mui-switch mui-switch-mini mui-active" id="punchSwitch">
                        <div class="mui-switch-handle"></div>
                    </div>
                </li>
                <li class="mui-table-view-cell1">
                    公司新闻通知
                    <div class="mui-switch mui-switch-mini" id="newsSwitch">
                        <div class="mui-switch-handle"></div>
                    </div>
                </li>
                <li class="mui-table-view-cell1">
                    版本
                    <div class="mui-pull-right">
                        1.0.1
                    </div>
                </li>
            </ul>
            <button type="button" class="mui-btn mui-btn-block logout" @click="logout">退出登录</button>
        </div>
        <v-modal :modal="modal" v-on:ok="yes" v-on:cancel="no">
            <div slot="modal-content" v-html="modal.content"></div>
        </v-modal>
    </div>
</template>
<script>
import vHead from "@/components/header.vue";
import vModal from "@/components/dialog.vue";

export default {
  data() {
    return {
      title: "设置",
      show: false,
      notify: {
        wifi: false,
        news: false,
        later: false,
        punch: false
      },
      modal: {
        show: false,
        isHeader: true,
        isFooter: true,
        title: "友情提示",
        yes: "确定",
        cancel: "取消",
        content: ""
      }
    };
  },
  components: {
    vHead,
    vModal
  },
  methods: {
    yes(e) {
      //   mui.plusReady(() => {
      //     plus.runtime.quit();
      //   });
    },
    no(e) {},
    logout() {
      this.modal.show = true;
      this.modal.content = "您确定要退出登录?";
    }
  },
  mounted() {
    mui(".mui-switch")["switch"]();
    /*
            //WIFI提醒
            document.getElementById("wifiSwitch").addEventListener('toggle',(e)=>{
                e.preventDefault();
                let isActive = e.detail.isActive;
                this.notify.wifi=isActive;
                console.log('WIFI提醒',isActive);
            });*/
    //迟到通知
    document.getElementById("laterSwitch").addEventListener("toggle", e => {
      e.preventDefault();
      let isActive = e.detail.isActive;
      this.notify.later = isActive;
      console.log("迟到通知", isActive);
    });
    //新闻通知
    document.getElementById("newsSwitch").addEventListener("toggle", e => {
      e.preventDefault();
      let isActive = e.detail.isActive;
      this.notify.news = isActive;
      console.log("新闻通知", isActive);
    });
    //自动打卡
    document.getElementById("punchSwitch").addEventListener("toggle", e => {
      e.preventDefault();
      let isActive = e.detail.isActive;
      this.notify.punch = isActive;
      console.log("自动打卡", isActive);
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/base";
.setting {
  .mui-content {
    background-color: nth($baseColor, 1);
    .mui-table-view {
      .mui-table-view-cell1 {
        height: 60px;
        line-height: 60px;
        margin-left: 10px;
        margin-right: 10px;
        border-bottom: 1px solid #c8c7cc;
        position: relative;
        .text-tips {
          font-size: 0.9rem;
          position: absolute;
          left: 0;
          bottom: -18px;
          color: wheat;
        }
        .mui-switch {
          float: right;
          margin-top: 10px;
        }
      }
    }
    .logout {
      width: 98%;
      margin: 10px auto;
      background-color: nth($baseColor, 3);
      color: nth($baseColor, 1);
      border-color: nth($baseColor, 3);
    }
  }
}
</style>