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
                        <p>发布人 {{article.author|is_default("公司人事部")}}</p>
                        <p>发布日期 {{article.date_format}}</p>
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
        methods: {
            _initData() {
                this.$fly.get('/query',{
                    action:'details',
                    mod:'message',
                    id:this.id
                }).then(res=>{
                    if(res.data){
                        this.article = res.data.data;
                    }
                })
            }
        },
        created(){
            this._initData()
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/style/base';
    .mui-content{
        padding-bottom:80px;
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
                min-height:120px;
                img{
                    
                }
            }
        }
    }
</style>