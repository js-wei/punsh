/*
 * File: d:\works\punsh\src\views\later.vue
 * Created Date: 2018-04-08 2:54:50
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-04-17 3:20:53
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div>
        <v-head :title="title"></v-head>
        <div class="mui-conntent">
            <div class="mui-input-row textarea">
              <div class="title">申诉事由</div>
              <textarea id="textarea" rows="5" v-model="applay.reason" placeholder="申诉事由"></textarea>
              <div class="textarea-tips">您还可以输入{{count}}个字符</div>
            </div>
            <div class="mui-input-row">
              <div class="title">申诉日期</div>
              <input type="text" placeholder="请选择申诉日期" readonly 
                v-model="applay.date" @click.stop="selectDate(1)">
            </div>
            <div class="mui-input-row">
              <div class="title">申诉图片</div>
              <div class="picture">
                  <img :src="item" v-for="(item,index) in applay.images" :key="index">
                  <span class="mui-icon mui-icon-plusempty" @click="selectPic"></span>
              </div>
            </div>
            <button type="boutton" @click="submit" class="mui-btn mui-btn-block btn-submit">提交申请</button>
        </div>
    </div>
</template>

<script>
import vHead from "@/components/header.vue";
import "../../static/javascript/mui.picker.min.js";
import "../../static/javascript/mui.poppicker.js";
export default {
  data() {
    return {
      title: "加班/调休申请",
      count: 150,
      tatols: 150,
      applay: {
        reason: "",
        date: "",
        images: [],
        uid: 0
      }
    };
  },
  methods: {
    selectPic() {
      if (!window.plus) {
        return;
      }
      plus.gallery.pick(
        s => {
          this.applay.images.push(s);
        },
        e => {
          console.log(JSON.stringify(e));
        },
        {
          filter: "image"
        }
      );
    },
    selectDate() {
      let picker = new mui.DtPicker({
        type: "datetime",
        beginYear: 1970,
        endYear: 2100
      });
      let _this = this;
      let i = 0;
      picker.show(function(rs) {
        let date = rs.text;
        _this.applay.date = date;
      });
    },
    submit() {
      let _this = this;
      let doc = document.querySelectorAll('input[name="type"]');
      doc.forEach(element => {
        if (element.checked) {
          _this.applay.type = parseInt(element.value);
        }
      });
      _this.applay.uid = _this.user.user_id;
      if (!_this.applay.reason) {
        mui.toast("请填写申诉事由");
        return;
      }
      if (!_this.applay.from) {
        mui.toast("申诉开始时间必填");
        return;
      }
      if (!_this.applay.to) {
        mui.toast("申诉结束时间必填");
        return;
      }
      if (!_this.applay.uid) {
        mui.toast("请退出重新登录");
        return;
      }
      _this.$fly.post("/applay", _this.applay).then(res => {
        res = res.data;
        if (!res.status) {
          mui.toast(res.msg);
          return;
        }
        mui.toast(res.msg);
        setTimeout(() => {
          this.$router.push("/leave");
        }, 2.5e3);
      });
    }
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("logined"));
    }
  },
  components: {
    vHead
  },
  created() {
    this.$store.commit("HIDE_FOOTER");
  }
};
</script>
<style lang="css">
@import url("../../static/style/mui.picker.min");
@import url("../../static/style/mui.poppicker");
</style>
<style lang="scss" scoped>
@import "../assets/style/base";
.mui-conntent {
  .mui-input-row {
    width: 95%;
    margin: 10px auto;
    .title {
      height: 25px;
      line-height: 25px;
      font-size: 1.5rem;
    }
    &.textarea {
      height: 150px;
    }
    .textarea-tips {
      clear: both;
      font-size: 1rem;
      width: 100%;
      text-align: right;
      color: nth($baseColor, 3);
      height: 30px;
      line-height: 30px;
    }
    label {
      text-align: right;
    }
    input,
    textarea {
      &::-webkit-input-placeholder {
        font-size: 1.5rem;
      }
    }
    textarea {
      padding: 10px;
      height: 100px;
      margin-bottom: 0px;
    }
    .picture {
      img {
        width: 50px;
        height: 50px;
        float: left;
        margin: 2px 2px 2px 0px;
      }
      .mui-icon {
        margin: 2px 2px 2px 0px;
        display: inline-block;
        width: 50px;
        height: 50px;
        background-color: lighten(nth($baseColor, 2), 90%);
        text-align: center;
        line-height: 50px;
        font-size: 3.5rem;
        color: nth($baseColor, 1);
      }
    }
  }
  .btn-submit {
    width: 95%;
    margin: 0 auto;
    background-color: nth($baseColor, 3);
    border-color: nth($baseColor, 3);
    color: nth($baseColor, 1);
  }
}
</style>