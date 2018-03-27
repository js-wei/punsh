<template>
    <div class="register">
        <img src="/static/images/logo.png" alt="">
        <form class="mui-input-group" autocomplete="off">
            <div class="mui-input-row">
                <label>手机号</label>
                <input type="text" v-model="phone" placeholder="请输入手机">
            </div>
            <div class="mui-input-row verify">
                <label>验证码</label>
                <input type="text" v-model="verify" placeholder="请输入验证码">
                <button class="mui-btn mui-btn-danger" :class="{'mui-disabled':isDisabled}" 
                    type="button" @click="send_code">{{showText}}</button>
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" class="mui-input-password " v-model="password" placeholder="请输入密码">
            </div>
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="register" >注册新账号</button>
            </div>
            <div class="mui-input-row del-line">
                <router-link to="login">登陆</router-link>
            </div>
            <!-- <div class="mui-input-row del-line">
                <span class="line line-left"></span>
                <span class="title">其他账号登陆</span>
                <span class="line line-right"></span>
            </div>
            <div class="third">
                <img src="/static/images/wechat.png" alt="">
            </div> -->
        </form>
    </div>
</template>
<script>
import { mapState } from "vuex";
import crypto from "crypto";

export default {
  data() {
    return {
      isDisabled: true,
      showText: "获取验证码",
      phone: "",
      verify: "",
      password: "",
      countdown: 60,
      start_flag: true
    };
  },
  computed: {
    ...mapState({
      config: state => state.mutations.config
    })
  },
  methods: {
    register() {
      if (!this.phone) {
        mui.toast("请输入手机号");
        return;
      }
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)) {
        mui.toast("请输入正确的手机号");
        return;
      }
      if (!this.password) {
        mui.toast("请输入密码");
        return;
      }
      let data = {
        phone: this.phone,
        password: this._md5(this.password),
        verify: this.verify,
        push_cleint_id: this.getPushClenitId()
      };
      this.$fly.post("/register", data).then(res => {
        let data = res.data;
        if (!data.status) {
          mui.toast(data.msg);
          return;
        }
        mui.toast(data.msg);
        setTimeout(() => {
          this.$router.push("/login");
        }, 800);
      });
    },
    send_code() {
      let self = this;
      if (self.isDisabled && self.countdown) {
        return;
      } else {
        if (!/^1[3|4|5|7|8][0-9]{9}$/.test(self.phone)) {
          mui.toast("请输入正确的手机号");
          return;
        }
        if (self.start_flag) {
          self.settime();
          self.$fly.post("/send_message", { tel: self.phone }).then(res => {
            let data = res.data;
            if (!data.status) {
              mui.toast(data.msg);
              return;
            }
            mui.toast(data.msg);
          });
        }
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
    _md5(str = "") {
      if (!str) {
        return;
      }
      var md5 = crypto.createHash("md5");
      md5.update(str);
      return md5.digest("hex");
    },
    getPushClenitId() {
      let push = plus.push.getClientInfo();
      return push.clientid || "";
    }
  },
  mounted() {},
  watch: {
    phone(newValue, oldValue) {
      if (newValue.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/base";
form:after {
  background-color: #fff;
}
.register {
  padding-top: 5rem;
  text-align: center;
  img {
    width: 4rem;
    padding-bottom: 2rem;
  }
  .mui-input-group {
    width: 95%;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
    padding-bottom: 2rem;
    &:before {
      background-color: #fff;
    }
    .mui-input-row {
      margin-top: 0.8rem;
      position: relative;
      label {
        width: 25%;
        text-align: right;
      }
      input {
        width: 74%;
        &::-webkit-input-placeholder {
          font-size: 1.2rem;
        }
      }
      .line {
        position: absolute;
        border-bottom: 0.1rem solid #e4e4e8;
        display: inline-block;
        width: 34%;
        top: 0.6rem;
      }
      .line.line-left {
        left: 0;
      }
      .line.line-right {
        right: 0;
      }
      .title {
        vertical-align: middle;
        font-size: 1rem;
        color: #b3b3b3;
      }
    }
    .mui-button-row {
      margin-bottom: 2.1rem;
      margin-top: 2rem;
      .mui-btn-primary {
        background-color: nth($baseColor, 3);
        border-color: nth($baseColor, 3);
        height: 45px;
        line-height: 20px;
        margin: 0;
        padding: 0;
      }
    }
    .mui-input-row.del-line {
      a {
        color: nth($baseColor, 5);
      }
      &:after {
        background-color: #fff;
      }
    }
    .mui-input-row.del-line.right {
      text-align: right;
    }
    .mui-input-row.verify {
      position: relative;
      button {
        position: absolute;
        width: 110px;
        top: 0;
        right: 0;
        background-color: nth($baseColor, 3);
        border-color: nth($baseColor, 3);
        font-size: 0.8rem;
      }
    }
    .third {
      img {
        height: 6rem;
      }
    }
  }
}
</style>