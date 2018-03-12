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
                <!-- <div class="information" v-if="!isLogin">
                    <div>
                        <router-link to="/login">现在登陆</router-link>
                    </div>
                    <div>
                        <router-link to="/register">没有账号,现在注册</router-link>
                    </div>
                </div> -->
            </div>
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
    import {mapState} from 'vuex'

    export default {
        name: 'app',
        data(){
            return{
                title:'我的',
                isBack:false,
                current:'personal',
                menu: [
                    {
                        title: '消息中心',
                        href: '/message',
                        icon: 'fa-xiaoxi'
                    },
                    {
                        title: '签到记录',
                        href: '/push',
                        icon: 'fa-qiandao-kaoqindaqia'
                    },
                    {
                        title: '请假记录',
                        href: '/leave',
                        icon: 'fa-qingjia'
                    },
                    {
                        title: '安全设置',
                        href: '/safe',
                        icon: 'fa-anquanbaozhang'
                    },
                    {
                        title: '意见反馈',
                        href: '/feedback',
                        icon: 'fa-yijianfankui'
                    },
                    {
                        title: '系统设置',
                        href: '/setting',
                        icon: 'fa-xitongshezhi'
                    }
                ]
            }
        },
        computed:{
            ...mapState({
                isLogin:state=>state.logined || true
            })
        },
        components:{
            vHead,
            vFooter
        }
    }
</script>
<style lang="scss">
    @import "../assets/style/base";
    .personal{
        width:100vw;
        height:auto;
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
                font-size:1.3rem;
                a{
                    color:nth($baseColor,1);
                }
            }
        }
        .mui-content{
           .mui-table-view{
               .mui-table-view-cell{
                   a{
                       font-size:1.8rem;
                       span{
                           &.fa{
                               font-size:1.8rem;
                           }
                       }
                   }
               }
           } 
        }
    }
</style>