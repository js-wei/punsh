/*
 * File: d:\works\punsh\src\views\news_details.vue
 * Created Date: 2018-03-16 11:07:40
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-04-18 11:01:00
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
                    <img v-lazy="config.logo" />
                    <div class="mui-media-body" v-lazy-container="{ selector: 'img' }">
                        <h4>{{article.title}}</h4>
                        <p>{{article.author}}</p>
                        <p>{{article.date|time_ago}}</p>
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
import "../../static/javascript/mui.zoom";
import "../../static/javascript/mui.previewimage";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "查看消息",
      id: this.$route.params.id,
      article: {}
    };
  },
  components: {
    vHead
  },
  computed: {
    ...mapState({
      _article: state => state.mutations.article,
      config: state => state.mutations.site
    })
  },
  created() {
    this.$store.commit("HIDE_FOOTER");
    if (this._article && this._article.id == this.id) {
      this.article = this._article;
    } else {
      this.$fly
        .get("/query", {
          action: "details",
          mod: "article",
          id: this.id,
          field: "id,author,content,image,date,description,keywords,title,hits"
        })
        .then(res => {
          if (res.data.status) {
            this.article = res.data.data;
          }
        });
    }
    this.$nextTick(() => {
      mui.previewImage();
    });
  }
};
</script>
<style src="../../static/style/mui.previewimage.css"></style>
<style lang="scss" scoped>
@import "../assets/style/base";
.mui-content {
  background-color: nth($baseColor, 1);
  .mui-card {
    margin-top: 20px;
    .mui-card-header {
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .mui-media-body{
        h4{
          font-size:1.4rem;
          line-height:1.2rem;
        }
      }
    }
    .mui-card-content {
      padding: 5px 10px;
      text-indent: 2em;
      min-height: 120px;
    }
  }
}
</style>