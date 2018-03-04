<template>
    <div class="passwords">
        <v-head :title="title"></v-head>
        <div class="passwords-content mui-text-center">
            <input type="text" v-model="code" placeholder='验证码'>
            <input type="password" v-model="passwords" placeholder="请输入新密码(6-20位英文或数字)">
            <button class="mui-btn send-code" @click="sendCode">获取验证码</button>
            <button class="mui-btn mui-btn-block" :class="disabled?'disabled':''" @click="chagePasswords">确认修改</button>
            <p>已向手机192*****592发送验证码</p>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../assets/style/base";
    .passwords-content{
        width:95vw;
        margin:0 auto;
        position: relative;
        input{
            height:45px;
            font-size:1.5rem;
            &::placeholder{
                font-size:1.5rem;
            }
        }
        button{
            height:50px;
            line-height:20px;
            color:nth($baseColor,1);
            background-color:nth($baseColor,3);
            border-color:nth($baseColor,3);
            // &.disabled{
            //     color:nth($baseColor,1);
            //     background-color:lighten(nth($baseColor,2),25%);
            // }
            &.send-code{
                position:absolute;
                top:0;
                right:0;
                height:45px;
                width:120px;
            }
        }
    }
</style>
<script>
    import vHead from '@/components/header.vue'

    export default {
        data(){
            return{
                title:'修改密码',
                disabled:true,
                code:'',
                passwords:'',
                verify:{
                    countdown:60,
                    strat_flag:true
                }
            }
        },
        components:{
            vHead
        },
        methods:{
            chagePasswords(){
                if(this.disable){
                   return '';
                }
                if(this.code==''){
                    mui.toast('请输入验证码');
                    return;
                }
                if(this.password==''){
                    mui.toast('请输入密码');
                    return;
                }
                if(!/[a-z,A-Z,0-9]$/.test(this.password) && this.password.length>6 && this.password.length<20){
                    mui.toast('新密码必须是:6-20位英文或数字');
                    return;
                }
                //TODO 修改密码

                this.$router.go(-1);
            },
            sendCode(){
                let self = this,
                sendCode = document.querySelector('.send-code');
                if(!sendCode){
                    return;
                }
                if(self.verify.strat_flag){
                    console.log('send code');
                }
                if (self.verify.countdown == 0) {
                    self.verify.strat_flag = true;
                    sendCode.innerText='获取验证码';
                    self.verify.countdown = 60;
                }else{
                    self.verify.strat_flag = false;
                    sendCode.innerText="重新发送(" + self.verify.countdown + "S)";
                    self.verify.countdown--;
                    setTimeout(function() {
                        self.sendCode();
                    },1e3);
                }
            }
        },
        watch:{
          'passwords':function(o,n){
              this.disabled=o?false:true;
          }
        },
        mounted(){
            const gallery = document.querySelector('.passwords'),
                header = document.querySelector('header');
            if(header && gallery){
                gallery.style.marginTop=header.clientHeight + 10 + "px";
            }
            document.querySelector('.send-code').click();
        }
    }
</script>