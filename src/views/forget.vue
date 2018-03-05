<template>
    <div class="forget" v-if="show">
        <img src="static/images/logo.png" alt="">
        <!--获取验证码开始-->
        <div class="mui-page" v-if="step==1">
            <div class="mui-navbar-inner mui-bar mui-bar-nav" >
                <button type="button" class="mui-left mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left">
                    <span class="mui-icon mui-icon-left-nav"></span>
                </button>
                <h1 class="mui-title">找回密码</h1>
                <a class="mui-btn mui-btn-blue mui-btn-link mui-pull-right next" @click="next_step">下一步</a>
            </div>
            <div class="mui-page-content">
                <form class="mui-input-group" autocomplete="off">
                    <div class="mui-input-row">
                        <input id='account' type="tel" v-model="phone" class="mui-input-clear mui-input" placeholder="请输入手机号">
                    </div>
                    <div class="mui-input-row">
                        <input id='code' type="number" v-model="code" maxlength="6" class="mui-input-clear mui-input" placeholder="请输入验证码">
                    </div>
                </form>
                <div class="mui-content-padded">
                    <button id='sendVerify' class="mui-btn mui-btn-block mui-btn-primary" @click="get_code">获取验证码</button>
                </div>
            </div>
        </div>
        <!--获取验证码结束-->
        <!--修改密码开始-->
        <div class="mui-page" v-if="step==2">
            <div class="mui-navbar-inner mui-bar mui-bar-nav" >
                <button type="button" class="mui-left mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="back">
                    <span class="mui-icon mui-icon-left-nav"></span>
                </button>
                <h1 class="mui-title">找回密码</h1>
                <a class="mui-btn zak-header-item mui-btn-blue mui-btn-link mui-pull-right save" @click="save">保存</a>
            </div>
            <div class="mui-page-content">
                <form class="mui-input-group" autocomplete="off">
                    <div class="mui-input-row">
                        <input type="password" v-model="password" class="mui-input-clear mui-input" placeholder="请输入新密码">
                    </div>
                    <div class="mui-input-row">
                        <input type="password" v-model="confirm_password" class="mui-input-clear mui-input" placeholder="请再次输入新密码">
                    </div>
                </form>
            </div>
        </div>
        <!--修改密码结束-->
    </div>
</template>
<script>
    export default {
        data(){
            return {
                step:1,
                show:true,
                phone:'',
                code:'',
                password:'',
                confirm_password:''
            };
        },
        methods: {
            back(){
                this.step=1;
            },
            get_code(){
                if(!this.phone){
                    mui.toast('请输入手机号');
                    return;
                }
                if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)){
                    mui.toast('请输入正确的手机号');
                    return;
                }
            },
            next_step(){
                if(!this.phone){
                    mui.toast('请输入手机号');
                    return;
                }
                if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)){
                    mui.toast('请输入正确的手机号');
                    return;
                }
                if(!this.code){
                    mui.toast('请输入验证码');
                    return;
                }
                this.step=2;
            },
            save(){
                if(this.password!=this.confirm_password){
                    mui.toast('输入的密码不一致');
                    return;
                }
                let data = {
                    phone:this.phone,
                    password:this.password,
                    confirm_password:this.confirm_password
                };
                console.log(data)
            }
        }
    }
</script>
<style lang="scss" scoped>
   @import "../assets/style/base";
    .forget{
        padding-top:150px;
        text-align:center;
        img{
            width:4rem;
            padding-bottom:2rem;
        }
        .mui-page{
            .mui-bar-nav{
                background-color:nth($baseColor,3);
                button,h1,a{
                    color:nth($baseColor,1)
                }
            }
            form:before,form:after{
                background-color: #fff;
            }
            .mui-input-group{
                width:90%;
                margin:0 auto;
                .mui-input-row{
                    margin-top:1.2rem;
                }
            }
            .mui-content-padded{
                margin-top:3rem;
            }
            .mui-btn-primary{
                background-color:nth($baseColor,3);
                border-color: nth($baseColor,3);
            }
        }
        
    }
</style>