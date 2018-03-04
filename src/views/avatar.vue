<template>
<div class="head">
  <v-head :isSlotRight="isSlotRight">
    <div slot="header-right">
      <button type="button" class="upload">上传</button>
    </div>
  </v-head>
  <div class="croppa">
    <croppa v-model="myCroppa" placeholder="">
    </croppa>
  </div>
</div>
</template>
<style lang="scss" scoped>

</style>
<script>
import vHead from '@/components/header.vue'
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.use(Croppa);

export default {
  data() {
    return {
      isSlotRight: true,
      title: '头像上传',
      myCroppa: {}
    }
  },
  components: {
    vHead
  },
  methods: {
    uploadCroppedImage() {
      this.myCroppa.generateBlob((blob) => {
        // write code to upload the cropped image file (a file is a blob)
      }, 'image/jpeg', 0.8) // 80% compressed jpeg file
    },
    appendByCamera(){ //拍照添加文件
        plus.camera.getCamera().captureImage(function(e){
            console.log(e);
            plus.io.resolveLocalFileSystemURL(e, function(entry) {
              var path = entry.toLocalURL();
              console.log(path);
            }, function(e) {
                mui.toast("读取拍照文件错误：" + e.message);
            });
        });
    },
    appendByGallery(){//从相册添加文件
        plus.gallery.pick(function(path){
          console.log(path);
        });
    }
  },
  mounted() {
    const gallery = document.querySelector('.information'),
      header = document.querySelector('header');
    if (header && gallery) {
      gallery.style.marginTop = header.clientHeight + "px";
    }
    document.querySelector('.upload').addEventListener('tap', (e) => {

    });
    mui.plusReady(function() {
      plus.nativeUI.actionSheet({cancel:"取消",buttons:[
          {title:"拍照"},
          {title:"从相册中选择"}
      ]}, function(e){//1 是拍照  2 从相册中选择
          switch(e.index){
              case 1:this.appendByCamera();break;
              case 2:this.appendByGallery();break;
          }
      });
    });
  }
}
</script>
