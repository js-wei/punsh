/**
 * File: d:\works\office\src\views\hone.vue
 * Created Date: 2018-03-01 9:06:59
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-05 3:17:34
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="index">
        <v-head :show="show" :isBack="isBack" :title="title"></v-head>
        <div class="refresh-tip" v-if="isLoaded && count">为您奉上{{count}}条消息</div>
        <div class="refresh-tip" v-if="isLoaded && !count">未找到更新的消息</div>
        <scroller :on-refresh="refresh" :on-infinite="infinite" 
            height="90%" ref="my_scroller" class="my-scroller" style="padding-top:42px;">
            <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g>
            </svg>
            <v-slider :slider="slider"></v-slider>
            <v-media :media-list="mediaList"></v-media>
            <!-- custom infinite spinner -->
            <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
              <g>
                <circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle>
              </g>
            </svg>
        </scroller>
    </div>
</template>
<script>
import vHead from "@/components/header.vue";
import vSlider from "@/components/slider.vue";
import vMedia from "@/components/media.vue";

export default {
  data() {
    return {
      show: true,
      isBack: false,
      title: "首页",
      count: 30,
      isLoaded: false,
      slider: {
        show: true,
        loop: true,
        title: true,
        indicator: true,
        images: [
          {
            title: "穿越灵白线--挑战自我极限",
            href: "http://baidu.com",
            src: "./static/images/01.gif"
          },
          {
            title: "大阳山森林水上世界--激情一夏",
            href: "http://baidu.com",
            src: "./static/images/02.jpg"
          },
          {
            title: "西藏日喀则远行--寻找心灵的归属",
            href: "http://baidu.com",
            src: "./static/images/03.jpg"
          }
        ]
      },
      mediaList: [
        {
          title: "环资委委员谈雾霾再度来袭:污染防治不能一蹴而就",
          image: "",
          description:
            "今天上午，十三届全国人大一次会议新闻中心在梅地亚多功能厅举行记者会，十二届全国人大内司委副主任委员王胜明、财经委副主任委员乌日图、教科文卫委副主任委员吴恒、环资委委员吕彩霞，全国人大常委会法工委副主任王超英、副主任许安标就“人大立法工作”相关问题回答中外记者提问。",
          date: "03-12 10:40"
        },
        {
          title: "数说中国林业：森林覆盖率达21.66% 今年拟造林超1亿亩",
          image:"./static/images/01.gif",
          description:
            "你是否有感觉身边的树木越来越多了？根据国家林业局的数据，党的十八大以来，全国完成造林5.08亿亩。而今年的政府工作报告，又提出了2018年造林1亿亩的目标。",
          date: "03-12 00:00"
        }
      ]
    };
  },
  components: {
    vHead,
    vSlider,
    vMedia
  },
  methods: {
    refresh(done) {
      let _this = this;
      setTimeout(() => {
        done();
        _this.isLoaded = true;
        setTimeout(() => {
          _this.isLoaded = false;
        }, 1.5e3);
      }, 2.5e3);
    },
    infinite(done) {
      setTimeout(() => {
        done(true);
      }, 1.5e3);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/base";
.refresh-tip {
  padding: 0;
  position: fixed;
  height: 30px;
  line-height: 30px;
  width: 100%;
  -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 1000;
  color: #666;
  text-align: center;
  background-color: lighten(nth($baseColor, 6), 30%);
  font-size: 1.2rem;
  color: nth($baseColor, 1);
  opacity:.8;
}
</style>