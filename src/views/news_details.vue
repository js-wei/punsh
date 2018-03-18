/*
 * File: d:\works\punsh\src\views\news_details.vue
 * Created Date: 2018-03-16 11:07:40
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-18 3:37:09
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
                        <p>{{article.author}}</p>
                        <p>{{article.date|time_ago}}前</p>
                    </div>
                </div>
                <!--内容区-->
                <div class="mui-card-content">
                    <span v-html="article.content"></span>
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
                article:{}
            }
        },
        components: {
            vHead,
        },
        created(){
            this.$fly.get('/query',{
                action:'details',
                mod:'article',
                id:this.id
            }).then(res=>{
                if(res.data.status){
                    this.article = res.data.data;
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/style/base';
    .mui-content{
        background-color: nth($baseColor,1);
        padding-bottom:80px;
        .mui-card{
            margin-top:20px;
            .mui-card-header{
                img{
                    border:1px solid lighten(nth($baseColor,2),90%);
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