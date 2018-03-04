/**
 * File: g:\vue\office\src\views\push.vue
 * Created Date: 2018-03-04 4:49:25
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-04 4:57:16
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="push">
        <v-head :title="title"></v-head>
        <div>
            111
        </div>
    </div>
</template>

<script>
    import vHead from '@/components/header'
    export default {
        data() {
            return {
                title:'签到记录'
            }
        },
        components:{
            vHead
        }
    }
</script>

<style lang="scss" scoped>
    .push{
        margin-top:50px;
    }
</style>