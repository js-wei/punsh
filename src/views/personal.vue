<template>
    <div class="containers">
        <v-head :title="title" :isBack="isBack"></v-head>
        <div class="personal">
            <div class="personal-title">
                <img src="static/images/logo.png" alt="header">
                <div class="information" v-if="isLogin">
                    <div>魏巍</div>
                    <div>ID:1325565</div>
                    <div>今天之繁忙,之于明天之享福</div>
                </div>
                <div class="information" v-if="!isLogin">
                    <div>
                        <router-link to="/login">现在登陆</router-link>
                    </div>
                    <div>
                        <router-link to="/register">没有账号,现在注册</router-link>
                    </div>
                </div>
                <!-- <div class="function" v-if="isLogin">
                    <div class="item">
                        <div>100</div>
                        <div>圈子</div>
                    </div>
                    <div class="item">
                        <div>10</div>
                        <div>关注</div>
                    </div>
                    <div class="item">
                        <div>2</div>
                        <div>粉丝</div>
                    </div>
                </div> -->
            </div>
            <!-- <div class="collection">
                <div class="function" v-if="isLogin">
                    <div class="item">
                        <router-link to="/index">
                            <span class="mui-icon mui-icon-paperclip yellow"></span>
                            <span>预定</span>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link to="/index">
                            <span class="mui-icon mui-icon-plus pink"></span>
                            <span>发布</span>
                        </router-link>
                    </div>
                    <div class="item">
                       <router-link to="/index">
                           <span class="mui-icon mui-icon-personadd red"></span>
                           <span>参与</span>
                       </router-link>
                    </div>
                </div>
            </div> -->
            <div class="mui-content">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-for="(item,index) in menu" 
                        :key="index">
                        <router-link :to="item.href" class="mui-navigate-right">
                            <span class="fa" :class="item.icon"></span>
                            {{item.title}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import vHead from '@/components/header.vue'
    import vFooter from '@/components/footer.vue'
    export default {
        name: 'app',
        data(){
            return{
                title:'我的',
                isLogin:true,
                isBack:false,
                current:'personal',
                menu: [
                    {
                        title: '消息中心',
                        href: 'message',
                        icon: 'fa-xiaoxi'
                    },
                    {
                        title: '打卡记录',
                        href: 'push',
                        icon: 'fa-qiandao-kaoqindaqia'
                    },
                    {
                        title: '请假记录',
                        href: 'leave',
                        icon: 'fa-qingjia'
                    },
                    {
                        title: '安全设置',
                        href: 'safe',
                        icon: 'fa-anquanbaozhang'
                    },
                    {
                        title: '意见反馈',
                        href: 'feedback',
                        icon: 'fa-yijianfankui'
                    },
                    {
                        title: '系统设置',
                        href: 'setting',
                        icon: 'fa-xitongshezhi'
                    }
                ]
            }
        },
        components:{
            vHead,
            vFooter
        },
        mounted(){
            const gallery = document.querySelector('.personal'),
                header = document.querySelector('header');
            if(header && gallery){
                gallery.style.marginTop=header.clientHeight - 2 + "px";
            }
        }
    }
</script>
<style lang="scss">
    @import "../assets/style/base";
    .personal{
        width:100vw;
        height:100vh;
        .personal-title{
            height:auto;
            padding-bottom:10px;
            width:100%;
            background-color:lighten(nth($baseColor,3),12%);
            text-align:center;
            img{
                margin-top:1.3rem;
                border-radius:50%;
                width:4rem;
            }
            .information{
                color:nth($baseColor,1);
                font-size:1.5rem;
                a{
                    color:nth($baseColor,1);
                }
            }
            .function{
                width:100vw;
                div.item{
                    width:33%;
                    float: left;
                    margin-top:.8rem;
                    color:nth($baseColor,1);
                    border-right:1px solid nth($baseColor,1);
                    font-size:1.5rem;
                }
                div.item:nth-of-type(3){
                    border:none;
                }
            }
        }
        .mui-content{
            .mui-table-view{
                &::before{
                    background-color: nth($baseColor,1);
                }
                .mui-table-view-cell{
                    height:60px;
                    line-height:50px;
                    a{
                        font-size:2.2rem;
                        span{
                            font-size:2.5rem;
                        }
                    }
                }
            }
        }
        .collection{
            width:100vw;
            height:auto;
            margin-top:.8rem;
            text-align:center;
            background-color:nth($baseColor,1);
            .function{
                .item{
                    margin-top:1.2rem;
                    width:33%;
                    height:100%;
                    float: left;
                    a{
                        color:lighten( nth($baseColor,2),50%);
                        span{
                            display:block;
                            width:100%;
                            font-size:1.5rem;
                            &.mui-icon{
                                font-size:3.5rem;
                            }
                            &.yellow{
                                color:greenyellow;
                            }
                            &.pink{
                                color:deeppink;
                            }
                            &.red{
                                color:darkred;
                            }
                        }
                    }
                }
            }
        }
    }
</style>