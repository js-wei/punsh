<template lang="html">
    <div class="information">
        <v-head :isSlotRight="isSlotRight">
            <div slot="header-right">
                <button type="button" class="change">修改</button>
            </div>
        </v-head>
        <div class="information-content" v-show="nickname">
            <div class="title">请输入您的昵称</div>
            <input type="text" v-model="content" name="nickname" class="content input" id="nickname" placeholder="请输入您的昵称">
        </div>
        <div class="information-content" v-show="information">
            <div class="title">请输入您的个性签名</div>
            <textarea  class="content" v-model="content" placeholder="请输入您的个性签名"></textarea>
            <div class="tips">
                您还可以输入{{count}}个字符
            </div>
        </div>
    </div>
</template>
<script>
    import vHead from '@/components/header.vue'
    export default {
        data(){
            return{
                isSlotRight:true,
                sums:150,
                count:150,
                content:'',
                information:false,
                nickname:false,
                msg:'',
                postData:{}
            }
        },
        components:{
            vHead
        },
        mounted(){
            document.querySelector('.change').addEventListener('tap',(e)=>{
                e.preventDefault();
                console.log(this.content);
                mui.toast(this.msg);
                setTimeout(()=>{
                    this.$router.go(-1);
                },2e3);
            });
            if(this.$route.params.tp==1){
                this.information=true;
                this.msg='个性签名修改成功';
            }
            if(this.$route.params.tp==2){
                this.nickname=true;
                this.msg='昵称修改成功';
            }
        },
        methods:{
        },
        watch:{
            'content':function(o,n){
                let left = this.sums - parseInt(n.length);
                if(left>=0){
                    this.count = left;
                }else{
                    this.content=n.substring(0,this.sums+1);
                    return '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
   @import "../assets/style/base";
    .information{
        .information-content{
            width:90vw;
            margin:4.5rem auto;
            .title{
                color:lighten(nth($baseColor,2),50%);
            }
            .content{
                height:150px;
                border:1px solid lighten(nth($baseColor,2),80%);
                margin-top:.5rem;
                padding-left:.3rem;
                padding-top:.3rem;
                color:lighten(nth($baseColor,2),50%);
                &.input{
                    margin-top:.5rem;
                    height:3.2rem;
                    padding-top:.5rem;
                    font-size:1.2rem;
                    padding-bottom:.5rem;
                }
            }
            .tips{
                color:lighten(nth($baseColor,2),50%);
                font-size:.8rem;
                text-align: right;
            }
        }
    }
</style>