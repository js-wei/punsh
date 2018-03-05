/**
 * File: g:\vue\office\src\views\punch.vue
 * Created Date: 2018-03-02 6:26:31
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-05 2:47:12
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="punch">
        <v-head :title="title" :isBack="show"></v-head>
        <div class="amap">
            <el-amap class="amap-demo" vid="amap" :zoom="zoom" ref="map" :events="events">
            </el-amap>
            <div class="toolbar">
                <ul class="toolbar-address">
                    <li>公司:{{company}}</li>
                    <li>地点:{{formattedAddress}}</li>
                    <li><i>提示:圆圈内为打卡区域</i></li>
                </ul>
            </div>
        </div>
        <div class="punch-button">
            <button class="btn btn-punch" :class="{'disabled':!isPunchDisabled}">打卡</button>
        </div>
    </div>
</template>

<script>
    import vHead from '@/components/header.vue'
    export default {
        data() {
            let self = this;
            return {
                title:'打卡签到',
                show:true,
                company:'苏州三铁企业集团',                 //打卡公司
                company_address:'苏州市玉山路99号钻石广场',  //公司地址
                zoom: 18,
                formattedAddress:'',                       //打卡地址
                isPunchDisabled:true,                      //不在范围禁止使用打卡按钮
                position:[120.55951,31.286219],           //打卡坐标
                //苏州火车站 120.611057,31.329632 
                //名馨花园东工具站牌 120.55929,31.285518 
                //钻石广场中心点 120.559832,31.286366 
                //钻石广场 120.55951,31.286219
                //虹锦湾 120.412504,31.339436
                events: {
                    init(map) {
                        let geocoder = new AMap.Geocoder({
                            city: "全国", 
                            radius: 50
                        });
                        geocoder.getLocation(self.company_address, function(status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                self.geocoderCallBack(result,map,self);
                                self.geoLocation(map,self);
                               
                            }
                        });
                    }
                }
            }
        },
        components:{
            vHead
        },
        created(){
            //this.$store.commit('HIDE_FOOTER');
        },
        methods: {
            punch(result) {
                if(!result.flag){
                    mui.toast('你是在火星打卡的吧');
                    return;
                }
                
                //@todo something
                //mui.toast('恭喜你打卡成功');
                mui.toast('恭喜你打卡成功', {
                    duration: 'short',
                    type: 'div',
                    icon:'mui-icon mui-icon-checkmarkempty'
                });
            },
            geocoderCallBack(data,map,self) {
                //地理编码结果数组
                var geocode = data.geocodes;
                for (var i = 0; i < geocode.length; i++) {
                    let lnglat = [geocode[i].location.lng,geocode[i].location.lat];
                    let result = self.addCircle(lnglat,map,self);
                    self.formattedAddress= geocode[i].formattedAddress;
                    let postion={
                        lng:geocode[i].location.lng,
                        lat:geocode[i].location.lat,
                        address: geocode[i].formattedAddress
                    };
                    let text = {
                        title:self.company,
                        sub:'三铁'
                    };
                    self.addSimpleMarker(postion,text,map);
                }
                map.setFitView();
            },
            addSimpleMarker(d={lng:0,lat:0,address:''},text={title:'公司全称',sub:'简称'},map){
                AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
                    //添加marker
                    const marker = new SimpleMarker({
                        map: map,
                        iconLabel: text.sub,
                        iconStyle:'orange',
                        showPositionPoint:true,
                        position: [d.lng,d.lat]
                    });
                    //信息框
                    if(d.address){
                        let infoWindow = new AMap.InfoWindow({
                            content: d.address +' ' + text.title,
                            offset: {x: 0, y: -30}
                        });
                        marker.on("click", function(e) {
                            infoWindow.open(map,marker.getPosition());
                        });
                    }
                    map.setFitView();   
                });
            },
            addMarker(position,map){
                var marker = new AMap.Marker({ //添加自定义点标记
                    map: map,
                    zIndex:120,
                    fillColor:'#eb7d46',
                    position: position, //基点位置
                });
            },
            addCircle(lnglat,map,self){
                let circle = new AMap.Circle({
                    center: lnglat,// 圆心位置
                    radius: 60, //半径
                    strokeColor: "#eb7d46", //线颜色
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 3, //线粗细度
                    fillColor: "#eb7d46", //填充颜色
                    fillOpacity: 0.35//填充透明度
                });
                circle.setMap(map);
                let flag = circle.contains(self.position);
                this.reGeocoder(self.position,(address)=>{
                    document.querySelector('.btn-punch').addEventListener('click',function(e){
                        e.preventDefault();
                        if(this.classList.contains("disabled") && !self.isPunchDisabled){
                            Toast({
                                message:'不在打开范围之内',
                                iconClass:'icon iconfont icon-dingdanzhuangtaishibai',
                                duration: 4e3
                            });
                            return;
                        }
                        let result = {flag:flag,center:lnglat,position:self.position,punch_address:address};
                        self.punch(result);
                    });
                });
            },
            reGeocoder(position,cb={}) {  //逆地理编码
                var geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });        
                geocoder.getAddress(position, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        result = result.regeocode.formattedAddress;  //返回地址描述
                        cb(result);
                    }
                });   
            },
            geoLocation(map,self,gps=[]){       //定位
                if(!gps){
                    AMap.convertFrom(gps,'gps',data=>{
                        let postion={
                            lng:data.locations.lng,
                            lat:data.locations.lat
                        };
                        let text = {
                            title:'我',
                            sub:'我'
                        };
                        self.addSimpleMarker(postion,text,map);
                    });
                }else{
                    map.plugin('AMap.Geolocation', function() {
                    let geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        buttonPosition:'RB'
                    });
                    map.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', onComplete=>{
                            let postion={
                                lng:onComplete.position.lng,
                                lat:onComplete.position.lat
                            };
                            let text = {
                                title:'我',
                                sub:'我'
                            };
                            self.addSimpleMarker(postion,text,map);
                        });//返回定位信息
                        AMap.event.addListener(geolocation, 'error', onError=>{

                        });//返回定位出错信息
                    });
                }
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/base";
    .punch{
        height:auto;
        overflow:hidden;
        .amap{
           height:95vh;
            .amap-demo{
               height:70%;
            }
            .toolbar{
                height:30%;
                .toolbar-address{
                    list-style-type:none;
                    margin:10px 0 0 0;
                    padding:0px 4px;
                    height:50px;
                    li{
                        margin-left:10px;
                        line-height:1.5rem;
                        font-size:1.2rem;
                        i{
                            font-size:.8rem;
                            color:nth($baseColor,3)
                        }
                    }
                }
            }
        }
        .punch-button{
            height:100px;
            width:100vw;
            line-height:100px;
            background-color:nth($baseColor,5);
            position: fixed;
            bottom:0;
            text-align: center;
            .btn{
                border:none;
                height:80px;
                width:80px;
                margin-top:10px;
                background-color:nth($baseColor,3);
                color:nth($baseColor,1);
                border-radius:50%;
                &.disabled{
                    opacity:.8;
                }
            }
        }
    }
</style>