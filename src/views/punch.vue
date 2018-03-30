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
        <v-head :title="title" :isBack="show" :backHandler="back"></v-head>
        <div class="amap">
            <el-amap class="amap-demo" vid="amap" :zoom="zoom" ref="map" :events="events">
            </el-amap>
            <div class="toolbar">
                <ul class="toolbar-address">
                    <li>公司:{{company}}</li>
                    <li>地址:{{company_address}}</li>
                    <li><i>提示:圆圈内为打卡区域</i></li>
                </ul>
            </div>
        </div>
        <div class="punch-button">
            <button class="btn btn-punch" :class="{'disabled':!isPunchDisabled}" @click="punch">打卡</button>
        </div>
    </div>
</template>

<script>
import vHead from "@/components/header.vue";

export default {
  data() {
    let self = this;
    return {
      title: "打卡签到",
      show: true,
      company: "", //打卡公司
      company_address: "", //公司地址
      sub_title: "",
      zoom: 18,
      formattedAddress: "", //打卡地址
      isPunchDisabled: false, //不在范围禁止使用打卡按钮
      position: [0, 0], //打卡坐标
      circle: null,
      radius: 50, //打卡圆心半斤(单位:米)
      coordsType: "gps",
      is_on_punch: false,
      is_go_punch: false,
      events: {
        init(map) {
          setTimeout(() => {
            let geocoder = new AMap.Geocoder({
              city: "全国",
              radius: 50
            });
            geocoder.getLocation(self.company_address, function(
              status,
              result
            ) {
              if (status === "complete" && result.info === "OK") {
                self.circle = self.geocoderCallBack(result, map, self);
                if (window.plus) {
                  //plus ok use gps or network,gps level is high
                  setTimeout(() => {
                    plus.geolocation.getCurrentPosition(
                      function(p) {
                        let location = {
                          lat: p.coords.latitude,
                          lng: p.coords.longitude
                        };
                        self.coordsType = p.coordsType;
                        self.formattedAddress = p.addresses;
                        self.geoLocation(map, self, location);
                      },
                      function(e) {
                        if (self.network == 3) {
                          self.geoLocation(map, self);
                        } else {
                          plus.nativeUI.closeWaiting();
                          mui.toast("使用的是非WIFI网络,请打开定位服务定位");
                          setTimeout(() => {
                            self.$router.push("/home");
                          }, 1.5e3);
                        }
                      },
                      { geocode: true }
                    );
                  }, 600);
                } else {
                  //plus not ok use  network
                  mui.showLoading("位置信息定位中..", "div");
                  self.geoLocation(map, self);
                }
              }
            });
          }, 600);
        }
      }
    };
  },
  components: {
    vHead
  },
  computed: {
    network() {
      return localStorage.getItem("network_type");
    },
    user() {
      return JSON.parse(localStorage.getItem("logined"));
    }
  },
  created() {
    this._initConfig();
    this.isPunch();
  },
  methods: {
    _initConfig() {
      let config = localStorage.getItem("cofing"),
        _this = this;
      if (!config) {
        _this.$fly.get("config").then(res => {
          let _data = res.data;
          if (res.engine.status == 200 && _data.status) {
            _data = _data.data;
            localStorage.setItem("cofing", JSON.stringify(_data));
            _this.company_address = _data.address;
            _this.company = _data.title;
            _this.sub_title = _data.short_title || "公司";
            _this.radius = _data.radius || 80;
          }
        });
      } else {
        config = JSON.parse(config);
        _this.company_address = config.address;
        _this.company = config.title;
        _this.sub_title = config.short_title || "公司";
        _this.radius = config.radius || 80;
      }
    },
    punch() {
      let _this = this;
      if (!_this.isPunchDisabled) {
        return;
      }
      if (!_this.circle.contains(_this.position)) {
        mui.toast("不在打卡范围内");
        return;
      }
      if (!_this.is_on_punch && !_this.is_go_punch) {
        mui.toast("你的签到次数已用完,如有疑问请去申诉");
        return;
      }
      if (_this.is_on_punch && _this.is_on_punch) {
        _this.$fly
          .post("/punch", {
            position: _this.position,
            address: _this.formattedAddress,
            uid: _this.user.user_id
          })
          .then(res => {
            res = res.data;
            mui.toast(res.msg);
            setTimeout(() => {
              _this.$router.push("/push");
            }, 2e3);
          });
      }
      if (!_this.is_on_punch && _this.is_go_punch) {
        _this.$fly
          .post("/punch", {
            position: _this.position,
            address: _this.formattedAddress,
            uid: _this.user.user_id,
            type: 1
          })
          .then(res => {
            res = res.data;
            mui.toast(res.msg);
            setTimeout(() => {
              _this.$router.push("/push");
            }, 2e3);
          });
      }
    },
    geoLocation(map, self, gps = "") {
      //定位
      if (gps) {
        let lnglat = new AMap.LngLat(gps.lng, gps.lat);
        AMap.convertFrom(lnglat, self.coordsType, (status, data) => {
          if (status === "complete") {
            let text = {
              title: "我",
              sub: "我"
            };
            let position = {
              lng: data.locations[0].lng,
              lat: data.locations[0].lat
            };
            self.position = [data.locations[0].lng, data.locations[0].lat];
            self.addSimpleMarker(position, text, map);
            self.isPunchDisabled = true;
            if (!window.plus) {
              //关闭loading
              mui.hideLoading();
            } else {
              plus.nativeUI.closeWaiting();
            }
          }
        });
      } else {
        map.plugin("AMap.Geolocation", function() {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: "RB"
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", onComplete => {
            let postion = {
              lng: onComplete.position.lng,
              lat: onComplete.position.lat
            };
            let text = {
              title: "我",
              sub: "我"
            };
            self.addSimpleMarker(postion, text, map);
            self.position = [onComplete.position.lng, onComplete.position.lat];
            self.isPunchDisabled = true;
            if (!window.plus) {
              //关闭loading
              mui.hideLoading();
            } else {
              plus.nativeUI.closeWaiting();
            }
          }); //返回定位信息
          AMap.event.addListener(geolocation, "error", onError => {}); //返回定位出错信息
        });
      }
    },
    geocoderCallBack(data, map, self) {
      //地理编码结果数组
      var geocode = data.geocodes,
        _result = null;
      for (var i = 0; i < geocode.length; i++) {
        let lnglat = [geocode[i].location.lng, geocode[i].location.lat];
        _result = self.addCircle(lnglat, map, self);
        //self.formattedAddress = geocode[i].formattedAddress;
        let postion = {
          lng: geocode[i].location.lng,
          lat: geocode[i].location.lat,
          address: geocode[i].formattedAddress
        };
        let text = {
          title: self.company,
          sub: self.sub_title
        };
        self.addSimpleMarker(postion, text, map);
        map.setFitView();
        return _result;
      }
    },
    addSimpleMarker( //自定义marker
      d = { lng: 0, lat: 0, address: "" },
      text = { title: "公司全称", sub: "简称" },
      map
    ) {
      AMapUI.loadUI(["overlay/SimpleMarker"], function(SimpleMarker) {
        //添加marker
        const marker = new SimpleMarker({
          map: map,
          iconLabel: text.sub,
          iconStyle: "orange",
          showPositionPoint: true,
          position: [d.lng, d.lat]
        });
        if (d.address) {
          let infoWindow = new AMap.InfoWindow({
            content: d.address + " " + text.title,
            offset: { x: 0, y: -30 }
          });
          marker.on("click", function(e) {
            infoWindow.open(map, marker.getPosition());
          });
        }
        map.setFitView();
      });
    },
    addMarker(position, map) {
      //默认marker
      var marker = new AMap.Marker({
        //添加自定义点标记
        map: map,
        zIndex: 120,
        fillColor: "#eb7d46",
        position: position //基点位置
      });
    },
    addCircle(lnglat, map, self) {
      //添加圆心
      let circle = new AMap.Circle({
        center: lnglat, // 圆心位置
        radius: self.radius, //半径
        strokeColor: "#eb7d46", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 3, //线粗细度
        fillColor: "#eb7d46", //填充颜色
        fillOpacity: 0.35 //填充透明度
      });
      circle.setMap(map);
      return circle;
    },
    back() {
      this.$router.push("/home");
    },
    isPunch() {
      //判定是否可以执行签到
      let _this = this;
      _this.$fly
        .post("/is_punch", {
          uid: _this.user.user_id,
          type: 0
        })
        .then(res => {
          if (res.engine.status != 200) {
            mui.toast("服务器出错了");
            return;
          }
          _this.is_on_punch = !res.data;
        });
      _this.$fly
        .post("/is_punch", {
          uid: _this.user.user_id,
          type: 1
        })
        .then(res => {
          if (res.engine.status != 200) {
            mui.toast("服务器出错了");
            return;
          }
          _this.is_go_punch = !res.data;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/base";
.punch {
  height: auto;
  overflow: hidden;
  .amap {
    height: 93.5vh;
    .amap-demo {
      height: 70%;
    }
    .toolbar {
      height: 30%;
      padding-top: 5px;
      .toolbar-address {
        list-style-type: none;
        margin: 10px 0 0 0;
        padding: 0px 4px;
        height: 50px;
        li {
          margin-left: 10px;
          line-height: 1.8rem;
          font-size: 1.5rem;
          i {
            font-size: 0.8rem;
            color: nth($baseColor, 3);
          }
        }
      }
    }
  }
  .punch-button {
    height: 100px;
    width: 100vw;
    line-height: 100px;
    background-color: nth($baseColor, 5);
    position: fixed;
    bottom: 0;
    text-align: center;
    .btn {
      border: none;
      height: 80px;
      width: 80px;
      margin-top: 10px;
      background-color: nth($baseColor, 3);
      color: nth($baseColor, 1);
      border-radius: 50%;
      &.disabled {
        opacity: 0.8;
      }
    }
  }
}
</style>