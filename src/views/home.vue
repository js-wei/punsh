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
        <v-slider :slider="slider"></v-slider>        
        <div class="refresh-tip" v-if="isLoaded && count">为您奉上{{count}}条消息</div>
        <div class="refresh-tip" v-if="isLoaded && !count">未找到更新的消息</div>
        <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" 
          class="my-scroller" style="padding-top:265px;">
            <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g>
            </svg>
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
      count: 0,
      isLoaded: false,
      slider: {
        show: true,
        loop: true,
        title: true,
        indicator: true,
        images: [{}]
      },
      mediaList: [],
      current_page: 1,
      last_id: 0
    };
  },
  components: {
    vHead,
    vSlider,
    vMedia
  },
  created() {
    this._initCarousel();
    this._initNews();
  },
  mounted() {
    document.querySelector("._v-content").style.paddingBottom = 260 + "px";
  },
  methods: {
    refresh(done) {
      let _this = this;
      _this.ajax(
        "/query",
        {
          action: "page",
          mod: "article",
          field: "id,title,author,description,image,date",
          limit: 3,
          column_id: 1,
          order: "date desc",
          where: [
            {
              field: "id",
              op: "gt",
              val: this.last_id
            }
          ],
          p: 1
        },
        res => {
          done();
          if (!res.status) {
            return;
          }
          _this.isLoaded = true;
          let result = res.data;
          _this.count = result.data.length || 0;
          if (_this.count) {
            result.data.forEach(item => {
              this.mediaList.unshift(item);
              this.last_id = item.id;
            });
            this.current_page = 1;
          }
          setTimeout(() => {
            _this.isLoaded = false;
          },1.5e3);
        },
        "POST"
      );
      // _this.axios
      //   .post("/query", {
      //     action: "page",
      //     mod: "article",
      //     field: "id,title,author,description,image,date",
      //     limit: 3,
      //     column_id: 1,
      //     order: "date desc",
      //     where: [
      //       {
      //         field: "id",
      //         op: "gt",
      //         val: this.last_id
      //       }
      //     ],
      //     p: 1
      //   })
      //   .then(res => {
      //     let _data = res.data;
      //     if (_data.status) {
      //       _this.isLoaded = true;
      //       let result = _data.data;
      //       _this.count = result.data.length || 0;
      //       if (_this.count) {
      //         result.data.forEach(item => {
      //           this.mediaList.unshift(item);
      //           this.last_id = item.id;
      //         });
      //         this.current_page = 1;
      //       }
      //     }
      //     setTimeout(() => {
      //       _this.isLoaded = false;
      //       done();
      //     }, 1.8e3);
      //   });
    },
    infinite(done) {
      let self = this;
      if (this.current_page == this.last_page) {
        done(true);
        return;
      }
      let p = ++this.current_page;
      setTimeout(() => {
        self.$fly
          .get("/query", {
            action: "page",
            mod: "article",
            field: "id,title,author,description,image,date",
            limit: 3,
            column_id: 1,
            order: "date desc",
            p: p
          })
          .then(res => {
            if (!res.data.status) {
              console.log(res.data.msg);
              return;
            }
            res = res.data.data;
            let _data = res.data;
            _data.forEach(item => {
              self.mediaList.push(item);
            });
            done();
          }, 1.8e3);
      });
    },
    _initCarousel() {
      this.ajax("/carousel", res => {
        if (!res.status) {
          return;
        }
        this.slider.images = res.data;
      });
    },
    _initNews() {
      this.$fly
        .get("/query", {
          action: "page",
          mod: "article",
          field: "id,title,author,description,image,date",
          limit: 3,
          column_id: 1,
          order: "date desc"
        })
        .then(res => {
          res = res.data;
          if (!res.status) {
            console.log(res.msg);
            return;
          }
          let _data = res.data;
          this.last_id = _data.data[0].id;
          this.mediaList = _data.data;
          this.last_page = _data.last_page;
          this.current_page = 1;
        })
        .catch(res => console.log(res));
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/base";
.refresh-tip {
  padding: 0;
  position: fixed;
  top: 44px;
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
  opacity: 0.8;
}
</style>