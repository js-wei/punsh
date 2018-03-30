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
            <!-- <div class="function border-top">
               <router-link to="/information">
                    <div class="toolbar-left">
                        用户昵称
                    </div>
                    <div class="toolbar-right">
                        {{user.nickname|is_default(user.phone)}}
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </router-link>
            </div> -->
            <div class="function border-top">
                <router-link to="/information">
                    <div class="toolbar-left" style="width:15%">
                      介绍
                    </div>
                    <div class="toolbar-right" style="width:78%">
                      <span>{{user.information|is_default('您似乎很懒,没有留下任何脚印')}}</span>
                      <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </router-link>
            </div>
            <div class="function border-top">
                <a class="dtpicker" @click.stop="change_birthday">
                    <div class="toolbar-left">
                        生日
                    </div>
                    <div class="toolbar-right">
                        <span  v-if="birthday">{{birthday}}</span>
                        <span  v-if="!birthday">{{user.birthday_format|is_default('未填写')}}</span>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </a>
            </div>
            <div class="function border-top">
                <a href="javascript:;" id="showCityPicker" @click.stop="change_address">
                    <div class="toolbar-left" style="width:14%">
                        地区
                    </div>
                    <div class="toolbar-right" style="width:78%">
                       <p class="mui-ellipsis mui-pull-left" style="width:90%" v-if="!city">{{user.address|is_default('未填写')}}</p>
                       <p class="mui-ellipsis mui-pull-left" style="width:90%" v-if="city">{{city}}</p>
                       <span class="mui-icon mui-pull-right mui-icon-arrowright" style="margin-top:18px;"></span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import "../../static/javascript/mui.picker.min.js";
import "../../static/javascript/mui.poppicker.js";
import Cities from "../../static/javascript/city.data-3";
import vHead from "../components/header";
export default {
  data() {
    return {
      title: "编辑资料",
      city: "",
      birthday: ""
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
  created() {
    this.$store.commit("HIDE_FOOTER");
  },
  methods: {
    change_address() {
      let _this = this;
      var cityPicker3 = new mui.PopPicker({
        layer: 3
      });
      cityPicker3.setData(Cities.cityData3);
      let i = 0;
      cityPicker3.show(function(items) {
        let city = items[0].text + " " + items[1].text + " " + items[1].text;
        if (i) {
          _this.city = city;
          _this.$fly
            .post("/upgrade_address", {
              uid: _this.user.user_id,
              address: city
            })
            .then(res => {
              res = res.data;
              if (!res.status) {
                mui.toast(res.msg);
                return;
              }
              _this.city = city;
            });
        }
        i++;
      });
    },
    change_birthday() {
      let picker = new mui.DtPicker({
        type: "date",
        beginYear: 1970,
        endYear: 2100
      });
      let _this = this;
      let i = 0;
      picker.show(function(rs) {
        let date = rs.text;
        if (i) {
          _this.birthday = date;
          _this.$fly
            .post("/upgrade_birthday", {
              uid: _this.user.user_id,
              date: date
            })
            .then(res => {
              res = res.data;
              if (!res.status) {
                mui.toast(res.msg);
                return;
              }
            });
        }
        i++;
      });
    }
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