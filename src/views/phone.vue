<template>
    <div class="phone">
        <v-head :title="title"></v-head>
        <div class="phone-content">
            <div class="steps" v-show="first">
                <input type="text" v-model="ophone" placeholder="请输入当前绑定手机号">
                <input type="text" v-model="nphone" placeholder="请输入新手机号">
                <button class="mui-btn mui-btn-block next" 
                    @click="next_step">下一步</button>
            </div>
            <div class="steps" v-show="second">
                <input type="text" v-model="code" placeholder='验证码'>
                <button class="mui-btn send-code" @click="sendCode">{{showText}}</button>
                <button class="mui-btn mui-btn-block" 
                        @click="changePhone">确认修改</button>
                <p>已向手机192*****592发送验证码</p>
            </div>
        </div>
    </div>
</template>
<script>
import vHead from "@/components/header.vue";

export default {
  data() {
    return {
      title: "更换手机号",
      first: true,
      second: false,
      disabled_first: true,
      disabled_second: true,
      ophone: "",
      nphone: "",
      code: "",
      showText: "获取验证码",
      countdown: 60,
      start_flag: true
    };
  },
  components: {
    vHead
  },
  watch: {
    ophone: function(o, n) {
      this.disabled_first = o ? false : true;
    },
    nphone: function(o, n) {
      this.disabled_first = o ? false : true;
    },
    code: function(o, n) {
      this.disabled_second = o ? false : true;
    }
  },
  methods: {
    next_step() {
      if (this.disabled_first) {
        mui.toast("请填写绑定或新手机");
        return;
      }
      if (!this.ophone) {
        mui.toast("填写原绑定手机号");
        return;
      }
      if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.ophone)) {
        mui.toast("填写正确原手机号");
        return;
      }
      if (!this.nphone) {
        mui.toast("填写新绑定手机号");
        return;
      }
      if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.nphone)) {
        mui.toast("填写正确新手机号");
        return;
      }
    //   if(this.ophone==this.nphone){
    //     mui.toast("手机号相同");
    //     return;
    //   }
      //TODO 发送验证码
      this.sendCode()
      //验证验证码
      this.second = true;
      this.first = false;
    },
    sendCode() {
      let self = this;
      if (self.isDisabled && self.countdown) {
        return;
      } else {
        if (!/^1[3|4|5|7|8][0-9]{9}$/.test(self.nphone)) {
          mui.toast("请输入正确的手机号");
          return;
        }
        if (self.start_flag) {
          self.settime();
          self.$fly
            .get("/send_message", { params: { tel: self.nphone } })
            .then(res => {
              if (res.status != 200) {
                mui.toast("服务器繁忙");
                return;
              }
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
    changePhone() {
      if (this.disabled_second) {
        mui.toast("请填写验证码");
        return "";
      }
      //TODO 修改请求

      mui.toast("安全手机修改成功");
      //返回上一级
      setTimeout(() => {
        this.$router.go(-1);
      }, 2e3);
    }
  }
};
</script>
<style lang="scss">
@import "../assets/style/base";
.phone-content {
  width: 95vw;
  margin: 10px auto;
  text-align: center;
  position: relative;
  .steps {
    input {
      height: 45px;
      font-size: 1.5rem;
      &::placeholder {
        font-size: 1.5rem;
      }
    }
    button {
      height: 50px;
      line-height: 20px;
      color: nth($baseColor, 1);
      background-color: nth($baseColor, 3);
      border-color: nth($baseColor, 3);
      font-size: 1.8rem;
      &.send-code {
        font-size: 1.2rem;
        position: absolute;
        top: 0;
        right: 0;
        height: 45px;
        width: 120px;
      }
      &:active{
          background-color:nth($baseColor,3);
      }
    }
  }
}
</style>
