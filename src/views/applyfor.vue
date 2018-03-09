/*
 * File: d:\works\punsh\src\views\applyfor.vue
 * Created Date: 2018-03-09 4:41:39
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-09 4:57:09
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="applyfor">
        <v-head :title="title"></v-head>
        <div class="mui-conntent">
           
        </div>
    </div>
</template>

<script>
import vHead from "@/components/header";
export default {
  data() {
    return {
      title: "请假申请",
      people:{
          name:'魏巍'
      }
    };
  },
  components: {
    vHead
  }
};
</script>

<style lang="scss" scoped>
    .mui-conntent{
        margin:20px auto;
    }
</style>