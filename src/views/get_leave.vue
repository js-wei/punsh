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
                        <p>申请于 {{article.date}}</p>
                        <p class="mui-media-body-status">申请状态 
                            <span v-if="article.status==0">被驳回</span>
                            <span v-else-if="article.status==2">申请中</span>
                            <span v-else>已通过</span>
                        </p>
                    </div>
                </div>
                <!--内容区-->
                <div class="mui-card-content">
                    <span v-html="article.content"></span>
                    <p class="mui-pull-right">通过人 {{article.author}}</p>
                    <span class="mui-clearfix"></span>
                    <p class="mui-pull-right">通过于 {{article.pass_date}}</p>
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
      title: "请假记录",
      id: this.$route.params.id,
      article: {
        title: "2018-03-15日请假单",
        date: "2018-03-14 08:30",
        pass_date: "2018-03-14 15:30",
        author: "总经理",
        content: `<p>韩国官员当地时间8日在华盛顿说，朝鲜最高领导人金正恩请韩方向美方转达与美国总统特朗普会面的意愿。</p>
                    <p>正在美国访问的韩国青瓦台国家安保室室长郑义溶8日说，朝鲜最高领导人金正恩委托韩方向美方转达他希望尽快与美国总统特朗普会面的意愿，特朗普已经同意在5月之前与金正恩会面。</p>
                    <p>郑义溶在白宫向特朗普通报韩国特使团日前访问朝鲜情况后对新闻媒体作出上述表态。他还表示，他告诉特朗普，金正恩在会见韩方特使团时表明朝方对半岛无核化以及避免进一步核试验和弹道导弹试射的承诺。</p>
                    <p>郑义溶说，特朗普感谢韩方通报，表示愿在5月之前同金正恩会面，以推动“实现永久无核化”的目标。</p>
                    <p>郑义溶表示，韩美双方对“继续诉诸外交进程来检验（朝核问题）和平解决方案的可行性表示乐观”。</p>
                    <p>本月5日和6日，韩国总统文在寅派遣郑义溶率韩方特使团访问朝鲜，作为平昌冬奥会之际金正恩派遣特使访韩的访。</p>`,
        status: 0 //0被驳回 1已通过 2进行中
      }
    };
  },
  components: {
    vHead
  },
  created() {
    console.log(this.id);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/base";
.mui-content {
  background-color: nth($baseColor, 1);
  .mui-card {
    margin-top: 20px;
    .mui-card-header {
      img {
        border: 1px solid lighten(nth($baseColor, 2), 70%);
        padding: 5px 2px;
        border-radius: 50%;
      }
    }
    .mui-card-content {
      padding: 5px 10px;
      text-indent: 2em;
    }
  }
}
</style>