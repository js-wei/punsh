/*
 * File: d:\works\punsh\src\views\push_details.vue
 * Created Date: 2018-03-12 9:30:00
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-04-08 8:39:15
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

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
                    <img :src="user.head|is_default('../assets/logo.png')" />
                    <div class="mui-media-body">
                        {{article.title}}
                        <p v-if="article.ec==0">类型:上班签到</p>
                        <p v-if="article.ec==1">类型:下班签到</p>
                        <p>签到时间:{{article.date|formart_date('yyyy-MM-dd hh:mm:ss')}}</p>
                        <p>
                            签到状态
                            <span v-if="article.type==1" class="mui-btn-success">正点</span>
                            <span v-if="article.type==2" class="mui-btn-success">正点</span>
                            <span v-if="article.type==3" class="mui-btn-warning">早退</span>
                            <span v-if="article.type==4" class="mui-btn-primary">旷工</span>
                            <span v-if="article.type==5" class="mui-btn-danger">加班</span>
                        </p>
                    </div>
                </div>
                <!--内容区-->
                <div class="mui-card-content">
                    <span v-html="article.content?article.content:text"></span>
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
      title: "查看消息",
      id: this.$route.params.id,
      article: {},
      config: null
    };
  },
  components: {
    vHead
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("logined"));
    },
    ...mapState({
      _article: state => state.mutations.article
    }),
    text() {
      switch (parseInt(this.article.type)) {
        case 1:
          return `<p>恭喜您今日正点签到,请保持哦,全勤奖在向你招手.<i class="fa fa-xiaoliansmiley40"></i></p>`;
          break;
        case 2:
          return `<p>今日因为什么事情耽搁了,上班迟到了哦.迟到了:{this.article.later}分钟<i class="fa fa-kulian-line"></i></p>`;
          break;
        case 3:
          return `<p>今日有什么急事居然早退了,再急也可以请个假呀.<i class="fa fa-kulian-line"></i></p>`;
          break;
        case 4:
          return `<p>啊呀怎么搞得,今日无故旷工啦.努力上班高兴赚小钱钱,养好他(她)才是正道<i class="fa fa-kulian-line"></i></p>`;
          break;
        case 5:
          return `<p>时间不早了还在加班呢?您今日加班:{this.article.later}分钟.<i class="fa fa-xiaoliansmiley40"></i></p>`;
          break;
      }
    }
  },
  created() {
    this.$fly
      .get("/query", {
        action: "details",
        mod: "config",
        id: 1,
        field:
          "id,end_push_time,end_time,start_push_time,start_time,end_time,end_push_time"
      })
      .then(res => {
        if (res.data.status) {
          this.config = res.data.data;
        }
      });

    if (this._article && this._article.id == this.id) {
      this.article = this._article;
    } else {
      this.$fly
        .get("/query", {
          action: "details",
          mod: "punch",
          id: this.id,
          where: [
            {
              field: "status",
              op: "eq",
              val: 1
            }
          ]
        })
        .then(res => {
          if (res.data.status) {
            this.article = res.data.data;
          }
        });
    }
    //console.log(this.article);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/base";
.mui-content {
  padding-bottom: 30px;
  background-color: nth($baseColor, 1);
  .mui-card {
    margin-top: 20px;
    .mui-card-header {
      img {
        width: 30px;
        height: 30px;
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