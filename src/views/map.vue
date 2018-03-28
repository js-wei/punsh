/*
 * File: d:\works\punsh\src\views\map.vue
 * Created Date: 2018-03-28 2:38:07
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-28 4:20:42
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */


<template>
    <div>
        <div id="map" ref="map">{{load}}</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      load: "地图加载中...",
      map: null
    };
  },
  mounted() {
    mui.plusReady(() => {
      this.map = new plus.maps.Map("map");
      plus.maps.Map.geocode(
        "北京市海淀区大钟寺地铁站",
        { city: "" },
        event => {
          var address = event.address; // 转换后的地理位置
          var point = event.coord; // 转换后的坐标信息
          var coordType = event.coordType; // 转换后的坐标系类型
          let circleObj = new plus.maps.Circle(new plus.maps.Point(point), 100);
          circleObj.setStorkeColor("#ff0000");
          circleObj.setFillColor("#ff0000");
          map.addOverlay(circleObj);
        },
        e => console.log("Failed:" + JSON.stringify(e))
      );
      map.getUserLocation((state, point) => {
        if (0 == state) {
          alert(JSON.stringify(point));
        } else {
          alert("Failed!");
        }
      });
      // 获取当前地图显示的地理区域
      let bounds = map.getBounds();
      alert( JSON.stringify(bounds) );
    });
  }
};
</script>

<style lang="sass" scoped>
 #map
    width: 100%;
    position: fixed;
    top: 0px;
    bottom: 0px;
    line-height: 200px;
    text-align: center;
    background: #FFFFFF;
</style>