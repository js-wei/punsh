<template>
    <div class="passwords">
        <v-head :title="title"></v-head>
        <div class="passwords-content mui-text-center">
            <input type="text" v-model="code" placeholder='验证码'>
            <input type="password" v-model="passwords" placeholder="请输入新密码(6-20位英文或数字)">
            <button class="mui-btn send-code" @click="send_code">{{showText}}</button>
            <button class="mui-btn mui-btn-block" @click="chagePasswords">确认修改</button>
            <p>已向手机192*****592发送验证码</p>
        </div>
    </div>
</template>
<script>
import vHead from "@/components/header.vue";

export default {
  data() {
    return {
      title: "修改密码",
      code: "",
      showText: "获取验证码",
      passwords: "",
      countdown: 60,
      start_flag: true
    };
  },
  components: {
    vHead
  },
  methods: {
    chagePasswords() {
      if (this.disable) {
        return "";
      }
      if (this.code == "") {
        mui.toast("请输入验证码");
        return;
      }
      if (this.password == "") {
        mui.toast("请输入密码");
        return;
      }
      if (
        !/[a-z,A-Z,0-9]$/.test(this.password) &&
        this.password.length > 6 &&
        this.password.length < 20
      ) {
        mui.toast("新密码必须是:6-20位英文或数字");
        return;
      }
      let user = JSON.parse(localStorage.getItem("logined"));
      //TODO 修改密码
      let data = {
        uid: user.user_id,
        password: this._md5(this.password),
        verify: this.code
      };
      this.$fly.post("/register", data).then(res => {
        let data = res.data;
        if (!data.status) {
          mui.toast(data.msg);
          return;
        }
        mui.toast(data.msg);
        setTimeout(() => {
          localStorage.clear('logined')
          this.$router.push("/login")
        }, 1000);
      });
      this.$router.go(-1);
    },
    send_code() {
      let self = this,
          user = JSON.parse(localStorage.getItem('logined'));
      if (!self.countdown) {
        return;
      } else {
        if (!/^1[3|4|5|7|8][0-9]{9}$/.test(user.phone)) {
          mui.toast("请输入正确的手机号");
          return;
        }
        if (self.start_flag) {
          self.settime();
          self.$fly.post("/send_message", { tel: user.phone }).then(res => {
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
    }
  },
  watch: {
    passwords: function(o, n) {
      this.disabled = o ? false : true;
    }
  },
  mounted() {
    document.querySelector(".send-code").click();
  }
};
</script>
<style lang="scss">
@import "../assets/style/base";
.passwords-content {
  width: 95vw;
  margin: 10px auto;
  position: relative;
  input {
    height: 45px;
    font-size: 1.2rem;
    &::placeholder {
      font-size: 1.2rem;
    }
  }
  button {
    height: 50px;
    line-height: 20px;
    color: nth($baseColor, 1);
    background-color: nth($baseColor, 3);
    border-color: nth($baseColor, 3);
    &.send-code {
      position: absolute;
      top: 0;
      right: 0;
      height: 45px;
      width: 120px;
    }
    &:enabled:active {
      background-color: nth($baseColor, 3);
    }
  }
}
</style>