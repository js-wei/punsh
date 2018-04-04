<template>
    <div class="register">
        <img src="static/images/logo.png" alt="">
        <form class="mui-input-group" autocomplete="off">
            <div class="mui-input-row">
                <label>手机号</label>
                <input type="tel" class="mui-input-clear phone" v-model="phone" placeholder="请输入手机">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" class="mui-input-password password" v-model="password" placeholder="请输入密码">
            </div>
            <div class="mui-input-row del-line right">
                <router-link to="forget">忘记密码?</router-link>
            </div>
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="login()" >登陆账号</button>
            </div>
            <div class="mui-input-row del-line">
                <router-link to="register">注册新号</router-link>
            </div>
            <!-- <div class="mui-input-row del-line">
                <span class="line line-left"></span>
                <span class="title">其他账号登陆</span>
                <span class="line line-right"></span>
            </div>
            <div class="third">
                <img src="static/images/wechat.png" alt="">
            </div> -->
        </form>
    </div>
</template>
<script>
import crypto from "crypto";
export default {
  data() {
    return {
      phone: "",
      password: "",
      redirect: this.$route.query.redirect || "/"
    };
  },
  methods: {
    login() {
      let _this = this;
      if (!_this.phone) {
        mui.toast("请输入手机号");
        return;
      }
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(_this.phone)) {
        mui.toast("请输入正确的手机号");
        return;
      }
      if (!_this.password) {
        mui.toast("请输入密码");
        return;
      }
      mui.showLoading("正在登陆..", "div");
      let $data = {
        phone: _this.phone,
        password: _this._md5(_this.password),
        push_client_id: _this.getPushClientId()
      };
      _this.$fly.post("/login", $data).then(res => {
        mui.hideLoading();
        if (res.engine.status !== 200) {
          mui.toast("服务器繁忙或错误");
          return;
        }
        res = res.data;
        if (!res.status) {
          mui.toast(res.msg);
          return;
        }
        mui.toast(res.msg);
        setTimeout(() => {
          localStorage.removeItem("logined");
          localStorage.setItem("logined", JSON.stringify(res.data));
          _this.$router.push(_this.redirect);
        }, 2e3);
      });
    },
    _md5(str = "") {
      if (!str) {
        return;
      }
      var md5 = crypto.createHash("md5");
      md5.update(str);
      return md5.digest("hex");
    },
    getPushClientId() {
      if (!window.plus) {
        return "";
      }
      let push = plus.push.getClientInfo();
      return push.clientid || "";
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
    width: 90%;
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
      margin-bottom: 2rem;
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
    .third {
      img {
        height: 6rem;
      }
    }
  }
}
</style>