<template>
    <div class="mui-slider" id="mySlider" v-if="images.length">
        <div class="mui-slider-group" :class="slider.loop?'mui-slider-loop':''">
            <!--支持循环，需要重复图片节点-->
            <div class="mui-slider-item mui-slider-item-duplicate">
                <a :href="images[images.length-1].url?images[images.length-1].url:'javascript:void(0);'">
                    <img :src="images[images.length-1].image" />
                    <p class="mui-slider-title" v-if="slider.title">{{images[images.length-1].title}}</p>
                </a>
            </div>
            <div class="mui-slider-item" v-for="(v,i) in images" :key="i">
                <a :href="v.url!=''?v.url:'javascript:void(0);'">
                    <img :src="v.image" />
                    <p class="mui-slider-title" v-if="slider.title">{{v.title}}</p>
                </a>
            </div>
            <!--支持循环，需要重复图片节点-->
            <div class="mui-slider-item mui-slider-item-duplicate">
                <a :href="images[0].url?images[0].url:'javascript:void(0);'">
                    <img :src="images[0].image" />
                    <p class="mui-slider-title" v-if="slider.title">{{images[0].title}}</p>
                </a>
            </div>
        </div>
        <div class="mui-slider-indicator" v-if="slider.indicator">
            <div class="mui-indicator" :class="i==0?'mui-active':''" v-for="(v,i) in images" :key="i"></div>
        </div>
    </div>
</template>
<script>
export default {
  computed: {
    images() {
      return this.slider.images;
    }
  },
  props: {
    slider: Object
  },
  mounted() {
    mui("#mySlider").slider({
      interval: this.slider.timer || 4e3
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/base";
.mui-slider {
  background-color:white;
  .mui-slider-group {
    background-color:white;
    .mui-slider-item {
      touch-action: none;
      a {
        img {
          height: 220px;
          width: 100%;
        }
        p.mui-slider-title {
          color: nth($baseColor, 1);
          font-size: 1.4rem;
          position: absolute;
          left: 0;
        }
      }
    }
  }
  .mui-slider-indicator {
    width: auto;
    right: 5px;
    bottom: 4px;
    .mui-indicator {
      width: 15px;
      border-radius: 20%;
      margin: 1px 3px;
    }
  }
}
</style>