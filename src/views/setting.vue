<template>
    <div class="setting">
        <v-head :title="title"></v-head>
        <div class="mui-content">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell1">
                    提醒打卡
                    <span class="text-tips">在打卡正点前15分钟提示</span>
                    <div class="mui-switch mui-switch-mini" :class="{'mui-active':notify.punch}" id="tellSwitch">
                        <div class="mui-switch-handle"></div>
                    </div>
                </li>
                <li class="mui-table-view-cell1">
                    迟到通知
                    <div class="mui-switch mui-switch-mini" :class="{'mui-active':notify.later}"  id="laterSwitch">
                        <div class="mui-switch-handle"></div>
                    </div>
                </li>
                <li class="mui-table-view-cell1">
                    自动打卡
                    <span class="text-tips">链接公司网络自动完成打卡</span>
                    <div class="mui-switch mui-switch-mini" :class="{'mui-active':notify.tell_punsh}"  id="punchSwitch">
                        <div class="mui-switch-handle"></div>
                    </div>
                </li>
                <li class="mui-table-view-cell1">
                    公司新闻通知
                    <div class="mui-switch mui-switch-mini" :class="{'mui-active':notify.news}"  id="newsSwitch">
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
      _user: null,
      user_id: 0,
      notify: {
        punch: false,
        later: false,
        tell_punsh: false,
        news: false
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
      localStorage.clear();
      this.$router.push("/home");
      mui.plusReady(() => {
        plus.runtime.quit();
      });
    },
    no(e) {},
    logout() {
      this.modal.show = true;
      this.modal.content = "您确定要退出登录?";
    },
    setNotify(uid, t, p) {
      let self = this;
      self.$fly
        .get("/set_sysconf", { uid: uid, power: p, notify: t })
        .then(res => {
          mui.toast(res.data.msg);
          self._resetUser();
        });
    },
    _makeSetting(settings) {
      settings.forEach(item => {
        if (item.notify == 1 && item.power) {
          this.notify.punch = true;
        }
        if (item.notify == 2 && item.power) {
          this.notify.later = true;
        }
        if (item.notify == 3 && item.power) {
          this.notify.tell_punsh = true;
        }
        if (item.notify == 4 && item.power) {
          this.notify.news = true;
        }
      });
    },
    _resetUser() {
      this.$fly.get("/personal", { id: this.user_id }).then(res => {
        if (res.engine.status != 200) {
          mui.toast("服务器或请求错误");
          return;
        }
        res = res.data.data;
        if(res){
          localStorage.setItem("logined",JSON.stringify(res));
        }
      });
    }
  },
  mounted() {
    let _user = JSON.parse(localStorage.getItem("logined"));
    this.user_id = _user.user_id;
    this._makeSetting(_user.settings);
    
    //提醒打卡
    document.querySelector("#tellSwitch").addEventListener("toggle", e => {
      e.preventDefault();
      let isActive = e.detail.isActive;
      let power = isActive ? 1 : 0;
      this.setNotify(_user.user_id, 1, power);
    });
    //迟到通知
    document.getElementById("laterSwitch").addEventListener("toggle", e => {
      e.preventDefault();
      let isActive = e.detail.isActive;
      let power = isActive ? 1 : 0;
      this.setNotify(_user.user_id, 2, power);
    });
    //自动打卡
    document.getElementById("punchSwitch").addEventListener("toggle", e => {
      e.preventDefault();
      let isActive = e.detail.isActive;
      let power = isActive ? 1 : 0;
      this.setNotify(_user.user_id, 3, power);
    });
    //新闻通知
    document.getElementById("newsSwitch").addEventListener("toggle", e => {
      e.preventDefault();
      let isActive = e.detail.isActive;
      let power = isActive ? 1 : 0;
      this.setNotify(_user.user_id, 4, power);
    });
    mui(".mui-switch")["switch"]();
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
          bottom: -20px;
          color: nth($baseColor, 3);
        }
        .mui-switch {
          float: right;
          margin-top: 15px;
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