/*
 * File: d:\works\punsh\src\views\base.vue
 * Created Date: 2018-03-27 10:37:28
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-27 3:56:06
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="base">
        <v-head title="资料和信息"></v-head>
    </div>
</template>

<script>
import vHead from "@/components/header.vue";
export default {
  data() {
    return {
      
    };
  },
  computed: {
    user() {
      return JSON.stringify(localStorage.getItem('logined'))
    }
  },
  components: {
    vHead
  }
};
</script>

<style lang="scss" scoped>

</style>