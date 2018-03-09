<template lang="html">
    <div class="loading" v-if="loading.show">
        <div class="loading-container">
            <span class="mui-icon mui-icon-spinner mui-spin" v-if="loading.type==2"></span>
            <span class="mui-icon mui-icon-spinner-cycle mui-spin" v-if="loading.type==1"></span>
            <span class="mui-icon mui-icon-loop" v-if="loading.type==3"></span>
            <p class="loading-title" :class="loading.isAnimation?'animation':''">{{loading.msg}}</p>
        </div>
        <div class="loading-mask" v-if="loading.mask?loading.mask:true"></div>
    </div>
</template>
<script>
export default{
  data() {
    return {
      masker:null
    }
  },
  props: {
    loading:{
        type:Object,
        default:{
            show:false,
            type:1,
            msg:'努力加载中...',
            mask:true,
            isAnimation:true,
        }
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
    @import "../assets/style/base";
    .loading{
        position:absolute;
        top:40vh;
        left:38vw;
        text-align:center;
        z-index:1000;
        overflow:hidden;
        .loading-container{
            z-index:1020;
            overflow:hidden;
            width:100px;
            height:100px;
            line-height:90px;
            border:1px solid nth($baseColor,1);
            background-color:nth($baseColor,1);
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            position:relative;
            text-align:center;
            .mui-icon{
                margin-top:1.5rem;
                color:nth($baseColor,4);
                -webkit-transform: translateZ(0);
                -ms-transform: translateZ(0);
                transform: translateZ(0);
                -webkit-animation: load8 1.1s infinite linear;
                animation: load8 1.1s infinite linear;
            }
            .loading-title{
                position:relative;
                height:15px;
                line-height:15px;
                bottom:20px;
                margin-top:.5rem;
                font-size:.8rem;
                color:nth($baseColor,4);
            }
            .loading-title.animation{
                position:relative;
                animation:myfirst 5s infinite linear;
                -moz-animation:myfirst 5s infinite linear;
                -webkit-animation:myfirst 5s infinite linear;
                -o-animation:myfirst 5s infinite linear;
            }
        }
    }
    .loading-mask{
        position: fixed;
        z-index: 998;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,.3);
    }
    @-webkit-keyframes load8{
        0%{
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100%{
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes load8{
        0%{
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100%{
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes myfirst {
        0%   {color:nth($baseColor,4);left:8px; bottom:30px;}
        50%  {color:blue;left:-8px;bottom:30px;}
        100% {color:nth($baseColor,4);left:8px;bottom:30px;}
    }
</style>
