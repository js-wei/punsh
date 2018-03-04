/**
 * File: d:\works\office\src\views\hone.vue
 * Created Date: 2018-03-01 9:06:59
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-03 7:23:25
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="index">
        <v-head :show="show" :isBack="isBack" :title="title"></v-head>
        <v-slider :slider="slider"></v-slider>
    </div>
</template>

<script>
    import vHead from '@/components/header.vue'
    import vSlider from '@/components/slider.vue'
    export default {
        data(){
            return{
                show:true,
                isBack:false,
                title:'首页',
                current:'home',
                slider:{
                    show:true,
                    loop:true,
                    title:true,
                    indicator:true,
                    images: [
                        {
                            title: '穿越灵白线--挑战自我极限',
                            href: 'http://baidu.com',
                            src: './static/images/01.gif'
                        },
                        {
                            title: '大阳山森林水上世界--激情一夏',
                            href: 'http://baidu.com',
                            src: './static/images/02.jpg'
                        },
                        {
                            title: '西藏日喀则远行--寻找心灵的归属',
                            href: 'http://baidu.com',
                            src: './static/images/03.jpg'
                        }
                    ]
                }
            }
        },
        components:{
            vHead,
            vSlider
        },
        methods:{
           
        }
    }
</script>

<style lang="scss" scoped>

</style>