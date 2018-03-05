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
        <v-head :title="title" :isSlotRight="true">
            <div slot="header-right">
                <button type="button" class="upload">提交</button>
            </div>
        </v-head>
    </div>
</template>

<script>
    import vHead from "@/components/header";
    export default {
        data() {
            return {
                title: '请假申请'
            }
        },
        components: {
            vHead,
        },
    }
</script>

<style scoped>

</style>