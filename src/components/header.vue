<template>
    <header class="mui-bar mui-bar-nav" v-if="show">
        <div class="mui-row header-row">
            <div class="mui-col-sm-2 mui-col-xs-2 mui-text-left">
                <slot name="header-left" class="header-left" v-if="isSlotLeft">占位</slot>
                <span class="mui-icon mui-icon-extra mui-icon-extra-sweep barcode" v-if="isBarcode"></span>
                <span class="mui-icon mui-icon-back mui-action-back"  v-if="isBack"></span>
            </div>
            <div class="mui-col-sm-8 mui-col-xs-8 header-title mui-text-center">
                <div class="mui-input-row mui-search hide" v-if="isSearch">
                    <input type="search" class="mui-input-clear"  v-model="search" @keyup.enter="onEnter(search)" placeholder="请输入关键词/@用户名">
                </div>
                <div class="mui-title" v-if="title!=''">{{title}}</div>
            </div>
            <div class="mui-col-sm-2 mui-col-xs-2 header-chat mui-text-right">
                <!--<span class="mui-icon mui-icon mui-icon-bars categray"></span>-->
                <slot name="header-right" class="header-right" v-if="isSlotRight">占位</slot>
                <span class="mui-icon mui-icon-home" v-if="isHome"></span>
                <span class="mui-icon mui-icon-extra mui-icon-extra-share" v-if="isShare"></span>
            </div>
        </div>
    </header>
</template>
<style lang="scss" scoped>
    @import "../assets/style/base";
    header{
        width:100%;
        background-color:nth($baseColor,3);
        line-height:3rem;
        text-align:center;
        color:nth($baseColor,1);
        .mui-title{
            color:nth($baseColor,1);
            font-size:2.2rem;
        }
        .mui-icon{
            font-size:4rem;
            position:relative;
            top: -8px;
        }
        .mui-icon.mui-icon-extra{
            font-size:1.8rem;
            margin-top:.3rem;
        }
        button{
            margin-top:.2rem;
            background-color:nth($baseColor,3);
            border-color: nth($baseColor,3);
            color:nth($baseColor,1);
            font-size:1.8rem;
        }
    }
    .mui-bar{
         -webkit-box-shadow:none;
         box-shadow:none;
    }
</style>
<script>
    export  default {
        data(){
            return {

            }
        },
        props: {
            title: String,            // 标题
            show:{
                type:Boolean,
                default:true
            },
            isHome:{
              type:Boolean,
              default:false
            },
            isBack: {                 // 是否有返回按钮
                type: Boolean,
                default: true
            },
            isRewriteBackEvent: {     // 是否重写返回事件
                type: Boolean,
                default: false
            },
            isSearch: {              // 是否带有所有框
                type: Boolean,
                default: false
            },
            isBarcode: {              // 是否带有所有框
                type: Boolean,
                default: false
            },
            isShare: {              // 是否带有所有框
                type: Boolean,
                default: false
            },
            isSlotRight:{
              type:Boolean,
              default:false
            },
            isSlotLeft:{
              type:Boolean,
              default:false
            },
            BackEvent: Function,       // 重写返回事件
            change: Function,          // 搜索框的值发生改变执行该方法
            onEnter: Function,         // 回车事件
        },
        watch: {
            search(val, oldVal) {
                this.change(val, oldVal);
            }
        },
        methods: {
        },
        created(){
            mui.init();
        },
        mounted() {
            if(this.isRewriteBackEvent) {
                document.querySelector(".mui-action-back").addEventListener("tap", () => {
                    this.BackEvent();
                });
            }
        }
    }
</script>