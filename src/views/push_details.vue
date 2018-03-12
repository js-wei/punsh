/*
 * File: d:\works\punsh\src\views\push_details.vue
 * Created Date: 2018-03-12 9:30:00
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-12 10:00:49
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

/**
 * File: d:\works\punsh\src\views\get_leave.vue
 * Created Date: 2018-03-05 5:33:53
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-05 5:40:50
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div>
        <v-head :title="title">
            <!-- <div slot="header-right">
                <button type="button" class="upload">提交</button>
            </div> -->
        </v-head>
        <div class="mui-content">
            <div class="mui-card">
                <!--页眉，放置标题-->
                <div class="mui-card-header mui-card-media">
                    <img src="../assets/logo.png" />
                    <div class="mui-media-body">
                        {{article.title}}
                        <p v-if="article.type!=5 && article.type!=4">签到正点 {{article.real_data}}</p>
                        <p v-if="article.type!=5  && article.type!=4">签到时间 {{article.push_date}}</p>
                        <p v-if="article.type==4">下班时间 {{article.real_leave_date}}</p>
                        <p v-if="article.type==4">离开时间 {{article.forward_leave_date}}</p>
                        <p>
                            签到状态
                            <span v-if="article.type==2" class="mui-btn-success">正点</span>
                            <span v-if="article.type==3" class="mui-btn-primary">迟到</span>
                            <span v-if="article.type==4" class="mui-btn-warning">早退</span>
                            <span v-if="article.type==5" class="mui-btn-danger">旷工</span>
                        </p>
                    </div>
                </div>
                <!--内容区-->
                <div class="mui-card-content">
                    <span v-html="text"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from "@/components/header";
    export default {
        data() {
            return {
                title: '查看消息',
                id:this.$route.params.id,
                article:{
                    title:'2018-03-25签到记录',
                    real_data:'2018-03-14 08:00',
                    push_date:'2018-03-14 08:30',
                    real_leave_date:'2018-03-14 17:30',
                    forward_leave_date:'2018-03-14 16:30',
                    type:4
                }
            }
        },
        components: {
            vHead,
        },
        computed:{
            text(){
                switch(this.article.type){
                    case 2:
                        return `<p>恭喜您今日正点签到,请保持哦,全勤奖在向你招手.<i class="fa fa-xiaoliansmiley40"></i></p>`;
                    break;
                    case 3:
                        return `<p>抱歉你今日迟到了,迟到时间是15分钟,将会对您的绩效全勤产生影响,请再接再厉,下次要早早的来哦.<i class="fa fa-xiaoliansmiley40"></i></p>`;
                    break;
                    case 4:
                        return `<p>今日有什么急事居然早退了,再急也可以请个假呀.<i class="fa fa-kulian-line"></i></p>`;
                    break;
                    case 5:
                        return `<p>啊呀怎么搞得,今日无故旷工啦.半年内最多旷工3次,超过3才要有惩戒的哦,你已经2次了哦.<i class="fa fa-xiaoliansmiley40"></i></p>`;
                    break;
                }
            }
        },
        created(){
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/style/base';
    .mui-content{
        background-color: nth($baseColor,1);
        .mui-card{
            margin-top:20px;
            .mui-card-header{
                img{
                    border:1px solid lighten(nth($baseColor,2),70%);
                    padding:5px 2px;
                    border-radius:50%;
                }
            }
            .mui-card-content{
                padding:5px 10px;
                text-indent:2em;
                min-height:120px;
            }
        }
    }
</style>