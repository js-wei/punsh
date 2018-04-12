/*
 * File: d:\works\punsh\src\views\app_details.vue
 * Created Date: 2018-04-04 10:56:30
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-04-12 10:11:53
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div>
        <v-head :title="title"></v-head>
        <div class="mui-content">
            <div class="mui-card">
                <!--页眉，放置标题-->
                <div class="mui-card-header mui-card-media">
                    <img :src="user.head" />
                    <div class="mui-media-body">
                        {{article.title}}
                        <p>申请时间:{{article.date|time_ago}}</p>
                        <p>开始时间:{{article.from|formart_date('yyyy-MM-dd hh:mm')}}</p>
                        <p>结束时间:{{article.to|formart_date('yyyy-MM-dd hh:mm')}}</p>
                        <p>
                          <!-- 类型: -->
                          <label v-if="article.type==1" class="mui-btn-primary">事假</label>
                          <label v-if="article.type==2" class="mui-btn-success">病假</label>
                          <label v-if="article.type==3" class="mui-btn-warning">婚假</label>
                          <label v-if="article.type==4" class="mui-btn-danger">产假</label>
                          <label v-if="article.type==5" class="mui-btn-royal">丧假</label>
                          <label v-if="article.type==6" class="mui-btn-primary">其他</label>
                          <!-- 审批: -->
                          <label v-if="article.status==0" class="mui-btn-warning">未审批</label>
                          <label v-if="article.status==1" class="mui-btn-success">已通过</label>
                          <label v-if="article.status==2" class="mui-btn-danger">未通过</label>
                        </p>
                    </div>
                </div>
                <!--内容区-->
                <div class="mui-card-content">
                    <span v-html="article.reason"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from "@/components/header";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "查看请假条",
      id: this.$route.params.id,
      article: {},
      user: null
    };
  },
  components: {
    vHead
  },
  computed: {
    ...mapState({
      _article: state => state.mutations.article
    })
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("logined"));
    this.$store.commit("HIDE_FOOTER");
    if (this._article && this._article.id == this.id) {
      this.article = this._article;
    } else {
      this.$fly
        .get("/query", {
          action: "details",
          mod: "article",
          id: this.id
        })
        .then(res => {
          if (res.data.status) {
            this.article = res.data.data;
          }
        });
    }
    this.$store.commit('SET_TYPE',this.article.type)
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/base";
.mui-content {
  background-color: nth($baseColor, 1);
  padding-bottom: 80px;
  .mui-card {
    margin-top: 20px;
    .mui-card-header {
      p {
        font-size: 1rem;
        line-height: 1.5rem;
      }
      img {
        width:30px;
        height:30px;
        border-radius: 50%;
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