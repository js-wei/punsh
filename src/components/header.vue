<template>
    <header class="mui-bar mui-bar-nav" v-if="show">
        <div class="mui-row header-row">
            <div class="mui-col-sm-2 mui-col-xs-2 mui-text-left">
                <slot name="header-left" class="header-left" v-if="isSlotLeft">占位</slot>
                <span class="mui-icon mui-icon-extra mui-icon-extra-sweep barcode" v-if="isBarcode"></span>
                <span class="mui-icon mui-icon-back" v-if="isBack" @click="backHandler"></span>
            </div>
            <div class="mui-col-sm-8 mui-col-xs-8 header-title mui-text-center">
                <div class="mui-input-row mui-search hide" v-if="isSearch">
                    <input type="search" class="mui-input-clear"  v-model="search" placeholder="请输入关键词/@用户名">
                </div>
                <div class="mui-title" v-if="title!=''">{{title}}</div>
            </div>
            <div class="mui-col-sm-2 mui-col-xs-2 header-chat mui-text-right">
                <slot name="header-right" class="header-right" v-if="isSlotRight">占位</slot>
                <span class="mui-icon mui-icon-home" v-if="isHome"></span>
                <span class="mui-icon mui-icon-extra mui-icon-extra-share" v-if="isShare"></span>
            </div>
        </div>
    </header>
</template>
<style lang="scss" scoped>
@import "../assets/style/base";
header {
  width: 100%;
  background-color: nth($baseColor, 3);
  line-height: 3rem;
  text-align: center;
  color: nth($baseColor, 1);
  .mui-title {
    color: nth($baseColor, 1);
    font-size: 2rem;
  }
  .mui-icon {
    font-size: 3rem;
    position: relative;
    top: -4px;
  }
  .mui-icon.mui-icon-extra {
    font-size: 1.5rem;
    margin-top: 0.3rem;
  }
  button {
    margin-top: 0.2rem;
    background-color: nth($baseColor, 3);
    border-color: nth($baseColor, 3);
    color: nth($baseColor, 1);
    font-size: 1.5rem;
  }
}
.mui-bar {
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
<script>
export default {
  data() {
    return {};
  },
  props: {
    title: String, // 标题
    show: {
      type: Boolean,
      default: true
    },
    isHome: {
      type: Boolean,
      default: false
    },
    isBack: {
      // 是否有返回按钮
      type: Boolean,
      default: true
    },
    isSearch: {
      // 是否带有所有框
      type: Boolean,
      default: false
    },
    isBarcode: {
      // 是否带有所有框
      type: Boolean,
      default: false
    },
    isShare: {
      // 是否带有所有框
      type: Boolean,
      default: false
    },
    isSlotRight: {
      type: Boolean,
      default: false
    },
    isSlotLeft: {
      type: Boolean,
      default: false
    },
    backHandler:{
        type:Function,
        default:function(){
            history.go(-1)
        }
    }
  }
};
</script>