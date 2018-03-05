<template lang="html">
    <div class="edit">
        <v-head :title="title"></v-head>
        <div class="toolbar" v-if="isLogin">
            <div class="function">
                <router-link to="/avatar">
                    <div class="toolbar-left">
                        头像
                    </div>
                    <div class="toolbar-right">
                        <img src="static/images/logo.png" alt="">
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </router-link>
            </div>
            <div class="function border-top">
               <router-link to="/information/12/2">
                    <div class="toolbar-left">
                        用户名
                    </div>
                    <div class="toolbar-right">
                        漫天飘雪浓浓情
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </router-link>
            </div>
            <div class="function border-top">
                <router-link to="/information/12/1">
                    <div class="toolbar-left">
                      介绍
                    </div>
                    <div class="toolbar-right">
                      <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </router-link>
            </div>
            <div class="function margin-top">
                <a href="javascript:;" class="chocie-sex">
                    <div class="toolbar-left">
                        性别
                    </div>
                    <div class="toolbar-right">
                        <span id="sex">男</span>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </a>
            </div>
            <div class="function border-top">
                <a href="javascript:;" class="dtpicker" data-options='{"type":"date","beginYear":1970,"endYear":2250}'>
                    <div class="toolbar-left">
                        生日
                    </div>
                    <div class="toolbar-right">
                        <span id="date">1988-4-14</span>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </a>
            </div>
            <div class="function border-top">
                <a href="javascript:;" id="showCityPicker">
                    <div class="toolbar-left">
                        地区
                    </div>
                    <div class="toolbar-right">
                       <span id="area">江苏省,苏州市</span>
                       <span class="mui-icon mui-icon-arrowright"></span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import vHead from '../common/header.vue'
    import '../../../static/javascript/mui.picker.min.js';
    import '../../../static/javascript/mui.poppicker.js';
    import cityData from '../../../static/javascript/city.data.js';

    export default {
        data(){
            return{
                title:'编辑资料',
                isLogin:true
            }
        },
        components:{
            vHead,
        },
        mounted(){
           
            let btn = document.querySelector('.dtpicker');
            btn.addEventListener('tap',(e)=>{
                let optionsJson = btn.getAttribute('data-options') || '{}',
                    options = JSON.parse(optionsJson);
                let picker = new mui.DtPicker(options);
                picker.show(function(rs) {
                    let date = rs.value;
                    mui.toast('生日修改成功');
                    document.querySelector('#date').innerText=date;
                    picker.dispose();
                });
            },false);

             let sex = new mui.PopPicker();
                sex.setData([
                {
                    value: '1',
                    text: '男'
                }, {
                    value: '2',
                    text: '女'
                }
                ]);
            document.querySelector('.chocie-sex').addEventListener('tap',(e)=>{
                sex.show(function(items) {
                  let sex = items[0].text;
                  document.querySelector('#sex').innerText=sex;
                  mui.toast('性别修改成功');
    						});
            });

            let cityPicker = new mui.PopPicker({
                    layer: 2
                });
            cityPicker.setData(cityData);
            let showCityPickerButton = document.getElementById('showCityPicker');
            showCityPickerButton.addEventListener('tap', function(event) {
                cityPicker.show(function(items) {
            let area = items[0].text+','+items[1].text;
            document.querySelector('#area').innerText=area;
            mui.toast('地区修改成功');
                    });
                }, false);
        }
    }
</script>
<style lang="scss" scoped>
    @import "../assets/style/base";
    .edit{
        .toolbar{
            width:100vw;
            height:60px;
            line-height:60px;
            margin-top:.8rem;
            text-align:center;
            .function{
                width:100vw;
                height:100%;
                background-color:nth($baseColor,1);
                a{
                    font-size:1.5rem;
                    color:lighten( nth($baseColor,2),50%);
                    .toolbar-left{
                        width:50%;
                        float: left;
                        text-align:left;
                        margin-left:1rem;
                    }
                    .toolbar-right{
                        width:40%;
                        float: right;
                        text-align:right;
                        margin-right:1rem;
                        color:lighten( nth($baseColor,2),50%);
                        img{
                            height:30px;
                            border-radius:50%;
                            vertical-align:middle;
                        }
                    }
                }
                &.margin-top{
                    margin-top:.8rem;
                }
                &.margin-top10{
                    margin-top:2rem;
                }
                &.border-top{
                    border-top:.1rem solid lighten(nth($baseColor,2),89%);
                }
            }
        }
    }
</style>