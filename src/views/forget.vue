<template>
    <div class="forget" v-if="show">
        <img :src="config.logo" alt="">
        <!--获取验证码开始-->
        <div class="mui-page" v-if="step==1">
            <div class="mui-navbar-inner mui-bar mui-bar-nav" >
                <!-- <button type="button" class="mui-left mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left">
                    <span class="mui-icon mui-icon-left-nav"></span>
                </button> -->
                <h1 class="mui-title">找回密码</h1>
                <a class="mui-btn mui-btn-blue mui-btn-link mui-pull-right next" @click="next_step">下一步</a>
            </div>
            <div class="mui-page-content">
                <form class="mui-input-group" autocomplete="off">
                    <div class="mui-input-row">
                        <input id='account' type="tel" v-model="phone" class="mui-input-clear mui-input" placeholder="请输入手机号">
                    </div>
                    <div class="mui-input-row">
                        <input id='code' type="number" v-model="code" maxlength="6" class="mui-input-clear mui-input" placeholder="请输入验证码">
                    </div>
                </form>
                <div class="mui-content-padded">
                    <button id='sendVerify' class="mui-btn mui-btn-block mui-btn-primary" @click="get_code">{{showText}}</button>
                    <!-- <button class="mui-btn mui-btn-block mui-btn-primary padding-top-10" @click="goBack">返回登录</button>                   -->
                    <router-link to="login" class="mui-block padding-top-10">返回登录</router-link>
                </div>
            </div>
        </div>
        <!--获取验证码结束-->
        <!--修改密码开始-->
        <div class="mui-page" v-if="step==2">
            <div class="mui-navbar-inner mui-bar mui-bar-nav" >
                <button type="button" class="mui-left mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="back">
                    <span class="mui-icon mui-icon-left-nav"></span>
                </button>
                <h1 class="mui-title">找回密码</h1>
                <a class="mui-btn zak-header-item mui-btn-blue mui-btn-link mui-pull-right save" @click="save">重置</a>
            </div>
            <div class="mui-page-content">
                <form class="mui-input-group" autocomplete="off">
                    <div class="mui-input-row">
                        <input type="password" v-model="password" class="mui-input-clear mui-input" placeholder="请输入新密码">
                    </div>
                    <div class="mui-input-row">
                        <input type="password" v-model="confirm_password" class="mui-input-clear mui-input" placeholder="请再次输入新密码">
                    </div>
                </form>
            </div>
        </div>
        <!--修改密码结束-->
    </div>
</template>
<script>
import crypto from "crypto";
import { mapState } from "vuex";

export default {
  data() {
    return {
      step: 1,
      show: true,
      phone: "",
      code: "",
      password: "",
      confirm_password: "",
      showText: "获取验证码",
      countdown: 60,
      start_flag: true
    };
  },
  computed: {
    ...mapState({
      config: state => state.mutations.site
    })
  },
  created() {
    this.$store.commit("HIDE_FOOTER");
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    back() {
      this.step = 1;
    },
    get_code() {
      let self = this;
      if (!this.phone) {
        mui.toast("请输入手机号", {
          duration: "long",
          type: "div"
        });
        return;
      }
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)) {
        mui.toast("请输入正确的手机号");
        return;
      }
      if (self.start_flag) {
        self.settime();
        self.$fly
          .get("/send_message", { params: { tel: self.phone } })
          .then(res => {
            let data = res.data;
            if (!data.status) {
              mui.toast(data.msg);
              return;
            }
            mui.toast(data.msg);
          });
      }
    },
    settime() {
      let self = this;
      if (this.countdown == 0) {
        this.start_flag = true;
        this.showText = "获取验证码";
        this.countdown = 60;
      } else {
        this.start_flag = false;
        this.showText = this.countdown + "秒后重新发送";
        this.countdown--;
        setTimeout(function() {
          self.settime();
        }, 1000);
      }
    },
    next_step() {
      if (!this.phone) {
        mui.toast("请输入手机号", {
          duration: "long",
          type: "div"
        });
        return;
      }
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)) {
        mui.toast("请输入正确的手机号", {
          duration: "long"
        });
        return;
      }
      if (!this.code) {
        mui.toast("请输入验证码");
        return;
      }
      this.$fly
        .get("/check_code", { params: { verify: this.code } })
        .then(res => {
          let data = res.data;
          if (!data.status) {
            mui.toast(data.msg);
            return;
          }
          this.step = 2;
        });
    },
    save() {
      if (this.password != this.confirm_password) {
        mui.toast("输入的密码不一致");
        return;
      }
      let data = {
        phone: this.phone,
        password: this._md5(this.password),
        confirm_password: this._md5(this.confirm_password)
      };
      this.axios.post("/set_password", data).then(res => {
        let data = res.data;
        if (!data.status) {
          mui.toast(data.msg);
          return;
        }
        mui.toast(data.msg);
        setTimeout(() => {
          localStorage.removeItem("logined");
          this.$route.push("/login");
        }, 600);
      });
    },
    _md5(str = "") {
      if (!str) {
        return;
      }
      var md5 = crypto.createHash("md5");
      md5.update(str);
      return md5.digest("hex");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/base";
.forget {
  padding-top: 150px;
  text-align: center;
  img {
    width: 4rem;
    padding-bottom: 2rem;
  }
  .mui-page {
    .mui-bar-nav {
      background-color: nth($baseColor, 3);
      button,
      h1,
      a {
        color: nth($baseColor, 1);
      }
    }
    form:before,
    form:after {
      background-color: #fff;
    }
    .mui-input-group {
      width: 90%;
      margin: 0 auto;
      .mui-input-row {
        margin-top: 1.2rem;
      }
    }
    .mui-content-padded {
      margin-top: 3rem;
      a {
        color: nth($baseColor, 5);
      }
      &:after {
        background-color: #fff;
      }
    }
    input {
      &::-webkit-input-placeholder {
        font-size: 1.2rem;
      }
    }
    .mui-btn-primary {
      background-color: nth($baseColor, 3);
      border-color: nth($baseColor, 3);
      height: 45px;
      line-height: 20px;
      margin: 0;
      padding: 0;
    }
  }
}
</style>