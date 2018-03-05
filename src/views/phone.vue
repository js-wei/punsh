<template>
    <div class="phone">
        <v-head :title="title"></v-head>
        <div class="phone-content">
            <div class="steps" v-show="first">
                <input type="text" v-model="ophone" placeholder="请输入当前绑定手机号">
                <input type="text" v-model="nphone" placeholder="请输入新手机号">
                <button class="mui-btn mui-btn-block next" :class="disabled_first?'disabled':''"
                    @click="next_step">下一步</button>
            </div>
            <div class="steps" v-show="second">
                <input type="text" v-model="code" placeholder='验证码'>
                <button class="mui-btn send-code" @click="sendCode">获取验证码</button>
                <button class="mui-btn mui-btn-block" :class="disabled_second?'disabled':''"
                        @click="changePhone">确认修改</button>
                <p>已向手机192*****592发送验证码</p>
            </div>
        </div>
    </div>
</template>
<script>
    import vHead from '@/components/header.vue'

    export default {
        data(){
            return{
                title:'更换手机号',
                first:true,
                second:false,
                disabled_first:true,
                disabled_second:true,
                ophone:'',
                nphone:'',
                code:'',
                verify:{
                    countdown:60,
                    strat_flag:true
                }
            }
        },
        components:{
            vHead
        },
        watch:{
          'ophone':function(o,n){
              this.disabled_first= o?false:true;
          },
          'nphone':function(o,n){
              this.disabled_first= o?false:true;
          },
          'code':function (o,n) {
              this.disabled_second= o?false:true;
          }
        },
        methods:{
            next_step(){
                if(this.disabled_first){
                    mui.toast('请填写现绑定或新手机号');
                    return '';
                }
                if(this.ophone==''){
                    mui.toast('请填写现绑定手机号');
                    return '';
                }
                if(!/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.ophone)){
                    mui.toast('请填写正确新手机号');
                    return '';
                }
                if(this.nphone==''){
                    mui.toast('请填写现绑定手机号');
                    return '';
                }
                if(!/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.nphone)){
                    mui.toast('请填写正确新绑定手机号');
                    return '';
                }
                //TODO 发送验证码

                //验证验证码
                this.second=true;
                this.first=false;

            },
            sendCode(){
                let self = this,
                    sendCode = document.querySelector('.send-code');
                if(!sendCode){
                    return;
                }
                if(self.verify.strat_flag && self.ophone){
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
            },
            changePhone(){
                if(this.disabled_second){
                    mui.toast('请填写验证码');
                    return '';
                }
                //TODO 修改请求

                mui.toast('安全手机修改成功');
                //返回上一级
                setTimeout(()=>{
                   this.$router.go(-1);
                },2e3);

            }
        }
    }
</script>
<style lang="scss">
   @import "../assets/style/base";
    .phone-content{
        width:95vw;
        margin:10px auto;
        text-align:center;
        position:relative;
        .steps{
            input{
                height:45px;
                font-size:1.8rem;
                &::placeholder{
                    font-size:1.8rem;
                }
            }
            button{
                height:50px;
                line-height:20px;
                color:nth($baseColor,1);
                background-color:nth($baseColor,3);
                border-color:nth($baseColor,3);
                font-size:2.2rem;
                // &.disabled{
                //     color:nth($baseColor,3);
                //     background-color:lighten(nth($baseColor,3),25%);
                // }
                &.send-code{
                    font-size:1.5rem;
                    position:absolute;
                    top:0;
                    right:0;
                    height:45px;
                    width:120px;
                }
            }
        }
    }
</style>
