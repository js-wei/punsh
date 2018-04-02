/*
 * File: d:\works\punsh\src\views\applyfor.vue
 * Created Date: 2018-03-09 4:41:39
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-04-02 4:59:41
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="applyfor">
        <v-head :title="title"></v-head>
        <div class="mui-conntent">
          <span>请假事由</span>
          <div class="mui-input-row" style="margin: 10px 5px;">
            <textarea id="textarea" rows="5" placeholder="多行文本框"></textarea>
          </div>
          <span>请假类型</span>
          <div class="mui-input-row">
            <div class=" mui-radio mui-pull-left mui-left" v-for="(item,index) in type" 
              :key="index">
              <label>{{item.title}}</label>
              <input name="radio" type="radio" :checked="index==0?'checked':''"/>
            </div>
          </div>
          <span>请假周期</span>
          <div class="mui-input-row">
            <input type="text" readonly v-model="applay.from" @click.stop="selectDate(1)">
            <input type="text" readonly v-model="applay.to" @click.stop="selectDate(2)">
          </div>
        </div>
    </div>
</template>

<script>
import vHead from "@/components/header";
import "../../static/javascript/mui.picker.min.js";
import "../../static/javascript/mui.poppicker.js";
export default {
  data() {
    return {
      title: "请假申请",
      people: {
        name: "魏巍"
      },
      applay: {
        from: "请选择开始时间",
        to: "请选择结束时间"
      },
      type: [
        {
          id: 1,
          title: "事假"
        },
        {
          id: 2,
          title: "病假"
        },
        {
          id: 3,
          title: "婚假"
        },
        {
          id: 4,
          title: "产假"
        },
        {
          id: 5,
          title: "丧事"
        },
        {
          id: 6,
          title: "其他"
        }
      ]
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
    selectDate(type) {
      let picker = new mui.DtPicker({
        type: "datetime",
        beginYear: 1970,
        endYear: 2100
      });
      let _this = this;
      let i = 0;
      picker.show(function(rs) {
        let date = rs.text;
        if (type == 1) {
          _this.applay.from = date;
        } else {
          _this.applay.to = date;
        }
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
.mui-conntent {
  .mui-input-group {
    padding: 10px;
    .mui-input-row {
      padding: 0;
      &.textarea {
        height: 120px;
        .textarea-tips {
          clear: both;
          font-size: 1rem;
          width: 100%;
          text-align: right;
          color: nth($baseColor, 3);
        }
      }
      label {
        text-align: right;
      }
      input,
      textarea {
        &::-webkit-input-placeholder {
          font-size: 1.2rem;
        }
      }
      textarea {
        height: 100px;
      }
      .mui-radio {
        width: 80px;
      }
    }
  }
}
</style>