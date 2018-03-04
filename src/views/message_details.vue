/**
 * File: g:\vue\office\src\views\message_details.vue
 * Created Date: 2018-03-04 4:14:32
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-04 4:28:55
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="message_details">
        <v-head :title="title"></v-head>
    </div>
</template>

<script>
    import vHead from '@/components/header'
    export default {
        data() {
            return {
                id:this.$route.params.id,
                title:'查看消息'
            }
        },
        components:{
            vHead
        },
        created(){
           console.log(this.id);
        }
    }
</script>

<style scoped>

</style>