<template>
    <div class="mui-slider" id="mySlider" v-if="slider.show">
        <div class="mui-slider-group" :class="slider.loop?'mui-slider-loop':''">
            <!--支持循环，需要重复图片节点-->
            <div class="mui-slider-item mui-slider-item-duplicate">
                <a :href="slider.images[slider.images.length-1].href?slider.images[slider.images.length-1].href:'javascript:;'">
                    <img :src="slider.images[slider.images.length-1].src" />
                    <p class="mui-slider-title" v-if="slider.title">{{slider.images[slider.images.length-1].title}}</p>
                </a>
            </div>
            <div class="mui-slider-item" v-for="(v,i) in slider.images" :key="i">
                <a :href="v.href!=''?v.href:'javascript:;'">
                    <img :src="v.src" />
                    <p class="mui-slider-title" v-if="slider.title">{{v.title}}</p>
                </a>
            </div>
            <!--支持循环，需要重复图片节点-->
            <div class="mui-slider-item mui-slider-item-duplicate">
                <a :href="slider.images[0].href?slider.images[0].href:'javascript:;'">
                    <img :src="slider.images[0].src" />
                    <p class="mui-slider-title" v-if="slider.title">{{slider.images[0].title}}</p>
                </a>
            </div>
        </div>
        <div class="mui-slider-indicator" v-if="slider.indicator">
            <div class="mui-indicator" :class="i==0?'mui-active':''" v-for="(v,i) in slider.images" :key="i"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
          slider:Object
        },
        mounted() {
            mui('#mySlider').slider({
                interval:this.slider.timer || 5e3
            });
        }
    }
</script>
<style lang="scss" scoped>
    @import "../assets/style/base";
    .mui-slider{
        .mui-slider-group{
            .mui-slider-item{
                a{
                    img{
                        height:230px;
                        width:100%;
                    }
                    p.mui-slider-title{
                        color:nth($baseColor,1);
                        font-size:1.5rem;
                    }
                }
            }
        }
        .mui-slider-indicator{
            width:auto;
            right:10px;
            bottom:.3rem;
        }
    }
</style>