<template lang="html">
    <div class="information">
        <v-head :isSlotRight="isSlotRight">
            <div slot="header-right">
                <button type="button" class="change" @click.stop="change_info">确认</button>
            </div>
        </v-head>
        <div class="information-content">
            <div class="title">请输入您的个性签名</div>
            <textarea  class="content" v-model="content" placeholder="请输入您的个性签名"></textarea>
            <div class="tips">
                您还可以输入{{count}}个字符
            </div>
        </div>
    </div>
</template>
<script>
import vHead from "@/components/header.vue";
export default {
  data() {
    return {
      isSlotRight: true,
      sums: 150,
      count: 150,
      content: ""
    };
  },
  components: {
    vHead
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("logined"));
    }
  },
  created(){
    this.$store.commit("HIDE_FOOTER");
  },
  methods: {
    change_info() {
      let _this = this;
      if (!_this.content) {
        mui.toast("请填写个性签名");
        return;
      }
      _this.$fly
        .post("/set_information", {
          uid: _this.user.user_id,
          info: _this.content
        })
        .then(res => {
          res = res.data;
          if (!res.status) {
            mui.toast(res.msg);
            return;
          }
          mui.toast(res.info);
          _this.user.infomation = _this.content;
          setTimeout(() => {
            _this.$router.push("/personal");
          }, 1e3);
        });
    }
  },
  watch: {
    content: function(o, n) {
      let left = this.sums - parseInt(n.length);
      if (left >= 0) {
        this.count = left;
      } else {
        this.content = n.substring(0, this.sums + 1);
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/base";
.information {
  .information-content {
    width: 90vw;
    margin: 1.5rem auto;
    .title {
      color: lighten(nth($baseColor, 2), 50%);
    }
    .content {
      height: 150px;
      border: 1px solid lighten(nth($baseColor, 2), 80%);
      margin-top: 0.5rem;
      padding-left: 0.5rem;
      color: lighten(nth($baseColor, 2), 50%);
      &::placeholder {
        font-size: 1.2rem;
      }
      &.input {
        margin-top: 0.5rem;
        height: 3.2rem;
        font-size: 1.2rem;
      }
    }
    .tips {
      margin-top:-15px;
      color: lighten(nth($baseColor, 2), 50%);
      font-size: 1rem;
      text-align: right;
    }
  }
}
</style>