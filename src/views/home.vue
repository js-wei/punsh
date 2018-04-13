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
        <v-media :media-list="articleList" @refresh="refresh" @infinite="infinite"></v-media>
    </div>
</template>
<script>
import vHead from "@/components/header.vue";
import vSlider from "@/components/slider.vue";
import vMedia from "@/components/media.vue";
import { mapState } from "../../node_modules/_vuex@3.0.1@vuex";

export default {
  data() {
    return {
      show: true,
      isBack: false,
      title: "首页",
      count: 0,
      isLoaded: false,
      slider: {
        loop: true,
        title: true,
        indicator: true,
        limit: 4,
        images: [
          { image: "http://w.jswei.cn/uploads/image/temp_image.png" },
          { image: "http://w.jswei.cn/uploads/image/temp_image.png" },
          { image: "http://w.jswei.cn/uploads/image/temp_image.png" },
          { image: "http://w.jswei.cn/uploads/image/temp_image.png" }
        ]
      },
      mediaList: [],
      current_page: 1,
      last_id: 0,
      last_page: 1
    };
  },
  components: {
    vHead,
    vSlider,
    vMedia
  },
  computed: {
    ...mapState({
      articleList: state => state.mutations.articleList
    })
  },
  created() {
    this._initCarousel();
    this._initNews();
    this.$nextTick(() => {
      document.querySelector("._v-content").style.paddingBottom = 270 + "px";
    });
  },
  methods: {
    refresh(done) {
      let _this = this;
      _this.$fly
        .get("/query", {
          action: "refresh",
          mod: "article",
          field: "id,title,author,description,image,date",
          limit: 3,
          column_id: 1,
          order: "sort asc,date desc",
          where: [
            {
              field: "id",
              op: "gt",
              val: this.last_id
            }
          ]
        })
        .then(res => {
          res = res.data;
          done();
          if (!res.status) {
            return;
          }
          _this.isLoaded = true;
          let result = res.data;
          _this.count = result.length || 0;
          if (_this.count) {
            _this.mediaList.unshift(...result);
            _this.last_id = result[0].id;
            _this.current_page = 1;
            _this.$store.commit("CATCH_ARTICLE_LIST", _this.mediaList);
          }
          setTimeout(() => {
            _this.isLoaded = result.false;
          }, 0.8e3);
        });
    },
    infinite(done) {
      let self = this;
      if (this.current_page > this.last_page) {
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
              return;
            }
            res = res.data.data;
            let _data = res.data;
            self.mediaList.push(..._data);
            self.$store.commit("CATCH_ARTICLE_LIST", self.mediaList);
            done();
          }, 0.8e3);
      });
    },
    _initCarousel() {
      let self = this;
      let carousel = sessionStorage.getItem("_carousel");
      if (carousel) {
        self.slider.images = JSON.parse(carousel);
        return;
      }
      this.$fly
        .get("/query", {
          action: "list",
          mod: "carousel",
          limit: self.slider.limit,
          order: "sort asc,date desc",
          sql: 1
        })
        .then(res => {
          if (res.engine.status != 200) return;
          res = res.data;
          if (!res.status) {
            return;
          }
          let carousel = res.data;
          sessionStorage.setItem("_carousel", JSON.stringify(carousel));
          self.slider.images = res.data;
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
            order: "sort asc,date desc"
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
            this.$store.commit("CATCH_ARTICLE_LIST", this.mediaList);
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