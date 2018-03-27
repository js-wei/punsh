<template lang="html">
    <div class="edit">
        <v-head :title="title"></v-head>
        <div class="toolbar">
            <div class="function">
                <router-link to="/avatar">
                    <div class="toolbar-left">
                        头像
                    </div>
                    <div class="toolbar-right">
                        <img :src="user.head|is_default('http://w.jswei.cn/static/images/logo.png')" alt="">
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </router-link>
            </div>
            <div class="function border-top">
               <router-link to="/information">
                    <div class="toolbar-left">
                        用户昵称
                    </div>
                    <div class="toolbar-right">
                        {{user.nickname|is_default(user.phone)}}
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </router-link>
            </div>
            <div class="function border-top">
                <router-link to="/information">
                    <div class="toolbar-left" style="width:15%">
                      介绍
                    </div>
                    <div class="toolbar-right" style="width:78%">
                      {{user.information|is_default('您似乎很懒,没有留下任何脚印')}}
                      <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </router-link>
            </div>
            <div class="function border-top">
                <a href="javascript:;" class="dtpicker" data-options='{"type":"date","beginYear":1970,"endYear":2250}'>
                    <div class="toolbar-left">
                        生日
                    </div>
                    <div class="toolbar-right">
                        <span id="date">1988-4-14</span>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </a>
            </div>
            <div class="function border-top">
                <a href="javascript:;" id="showCityPicker" @click.stop="change_address">
                    <div class="toolbar-left">
                        地区
                    </div>
                    <div class="toolbar-right">
                       <span id="area">{{user.address|is_default("江苏省 苏州市")}}</span>
                       <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import "../../static/javascript/mui.picker.min.js";
import "../../static/javascript/mui.poppicker.js";
import vHead from "../components/header";
import cityData from "../../static/javascript/city.data";
export default {
  data() {
    return {
      title: "编辑资料"
    };
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("logined"));
    }
  },
  components: {
    vHead
  },
  methods: {
    change_address() {
      let _this = this;
      let cityPicker = new mui.PopPicker({
        layer: 2
      });
      cityPicker.setData(cityData);
      let index = 0;
      cityPicker.show(function(items) {
        if (items.length > 0 && index > 0) {
          let area = items[0].text + " " + items[1].text;
          _this.$fly.post('/upgrade_address',{
            uid:_this.user.user_id,
            addrass:area
          }).then(res=>{
            console.log(res)
          });
          document.querySelector("#area").innerText = area;
          mui.toast("地区修改成功");
        }
        index++;
      });
    }
  },
  mounted() {
    let btn = document.querySelector(".dtpicker");
    btn.addEventListener(
      "tap",
      e => {
        let optionsJson = btn.getAttribute("data-options") || "{}",
          options = JSON.parse(optionsJson);
        let picker = new mui.DtPicker(options);
        picker.show(function(rs) {
          let date = rs.value;
          mui.toast("生日修改成功");
          document.querySelector("#date").innerText = date;
          picker.dispose();
        });
      },
      false
    );
  }
};
</script>
<style lang="css">
@import url("../../static/style/mui.picker.min");
@import url("../../static/style/mui.poppicker");
</style>
<style lang="scss" scoped>
@import "../assets/style/base";
.edit {
  .toolbar {
    width: 100vw;
    height: 60px;
    line-height: 60px;
    margin-top: 0.8rem;
    text-align: center;
    .function {
      width: 100vw;
      height: 100%;
      background-color: nth($baseColor, 1);
      a {
        font-size: 1.5rem;
        color: lighten(nth($baseColor, 2), 50%);
        .toolbar-left {
          width: 50%;
          float: left;
          text-align: left;
          margin-left: 1rem;
        }
        .toolbar-right {
          width: 40%;
          float: right;
          text-align: right;
          margin-right: 1rem;
          color: lighten(nth($baseColor, 2), 50%);
          img {
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
      }
      &.margin-top {
        margin-top: 0.8rem;
      }
      &.margin-top10 {
        margin-top: 2rem;
      }
      &.border-top {
        border-top: 0.1rem solid lighten(nth($baseColor, 2), 89%);
      }
    }
  }
}
</style>