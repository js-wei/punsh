<template>
    <div class="message">
        <v-head :title="title"></v-head>
        <div class="mui-content mui-scroll-wrapper" id="pullrefresh" >
            <div class="mui-scroll">
                <ul class="mui-table-view mui-table-view-chevron message-list-view">
                    <li class="mui-table-view-cell mui-media" v-for="(item,index) in messages" 
                        :key="index">
                        <a class='mui-navigate-right'>
                            <img class="mui-media-object mui-pull-left" :src="item.head">
                            <div class="mui-media-body">
                                <p class="mui-media-title">{{item.title}}</p>
                                <p class="mui-ellipsis">{{item.content}}</p>
                                <p>{{item.date}}</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import vHead from '@/components/header.vue'
    export default {
        data(){
            return{
                title:'消息',
                page :1,
                count:0,
                messages:[{
                    id:1,
                    head:'static/images/logo.png',
                    title:'公司清明放假通知',
                    content:'公司清明放假通知定于3月10日到3月13日,请各位公司同仁相互转告',
                    date:'03-05'
                },
                {
                    id:2,
                    head:'static/images/logo.png',
                    title:'公司团建活动',
                    content:'公司团建活动:为了增进广大员工间的友谊,公司决定于本周六(3月17日)在高新区西部生态城举行团建活动',
                    date:'03-14'
                }]
            }
        },
        components:{
            vHead,
        },
        methods : {
            getDataList () {
                let self = this;  
                mui.ajax({
                    type:"get",
                    url:`http://api.jswei.cn/api/message&p=${self.page}`, 
                    success (data) {
                        let json = JSON.parse(data).result.data;
                        self.messages = self.messages.concat(json); // 合并并且返回一个新数组
                        self.page += 1;    
                        self.count += 5;
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(self.count >= 1000);
                    }
                });                             
            },
            getLastData(){
                let self = this;  
                mui.ajax({
                    type:"get",
                    url:`http://api.jswei.cn/api/message&p=1`, 
                    success (data) {
                        let json = JSON.parse(data).result.data;
                        self.messages = self.messages.concat(json); // 合并并且返回一个新数组
                        self.page = 1;    
                        self.count = 5;
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(self.count >= 1000);
                    }
                }); 
            },
            pulldownRefresh () {
                this.getLastData();
                setTimeout(() => {
                    mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                },1500)
            },
            pullupRefresh () {
                this.getDataList();
                setTimeout(() => {
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                },1500)
            }
        },
        created () {
            let self = this;
            mui.ready(function(){
                mui.init({
                    pullRefresh:{
                        container: '#pullrefresh',
                        down: {
                            auto:false,
                            callback: self.pulldownRefresh
                        },
                        up: {
                            contentrefresh: '正在加载...',
                            callback: self.pullupRefresh
                        }

                    } 
                });
                //self.getDataList();
            });
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.1, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值 0.0006 
                indicators: false  //隐藏一条滚动条 增大减速系数。。。
            });
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/style/base';
    .message{
        .message-list{
            .message-list-view{
               li{
                   width:100vw;
                   a{
                       width:100%;
                        .mui-media-body{
                            p{
                                width:100px;
                                height:auto;
                                padding-bottom:2px;
                            }
                       }
                   }
               }
            }
        }
        .mui-card:nth-last-child(1){margin-bottom:70px;}
        .mui-card-header>img:first-child{width:100%;height: 100%;}
        .mui-pull-bottom-pocket{position:inherit}
    }
</style>