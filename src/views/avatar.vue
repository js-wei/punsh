<template>
<div class="head">
  <v-head :isSlotRight="isSlotRight">
    <div slot="header-right">
      <button type="button" class="upload" @click="upload">上传</button>
    </div>
  </v-head>
  <div class="cropper">
    <vue-cropper
    ref="cropper"
    :img="cropper.img"
    :outputSize="cropper.size"
    :outputType="cropper.outputType"
    :info="cropper.info"
    :canScale="cropper.canScale"
    :autoCrop="cropper.autoCrop"
    :autoCropWidth="cropper.autoCropWidth"
    :autoCropHeight="cropper.autoCropHeight"
    :fixed="cropper.fixed"
    :fixedBox="cropper.fixedBox"
    :original="cropper.original"
    >
  </vue-cropper>
  </div>
</div>
</template>
<script>
import vHead from "@/components/header.vue";
import vueCropper from "vue-cropper";

export default {
  data() {
    return {
      isSlotRight: true,
      title: "头像上传",
      cropper: {
        img: "http://ofyaji162.bkt.clouddn.com/bg1.jpg",
        info: true,
        size: 1,
        outputType: "png",
        canScale: false,
        autoCrop: true,
        autoCropWidth: 100,
        autoCropHeight: 100,
        fixed: true,
        fixedBox: true,
        original: false
      }
    };
  },
  components: {
    vHead,
    vueCropper
  },
  methods: {
    upload() {
      let user = JSON.parse(localStorage.getItem("logined"));
      let self = this;
      this.$refs.cropper.getCropBlob(data => {
        var fd = new FormData();
        fd.append("image", data);
        fd.append("uid", user.user_id);
        self.$fly.post("upgrade_head", fd).then(res => {
          if (res.engine.status != 200) {
            mui.toast("服务器内部出错");
            return;
          }
          res = res.data;
          if (!res.status) {
            mui.toast(res.msg);
            return;
          }
          user.head = res.fullpath;
          localStorage.setItem("logined", JSON.stringify(user));
          mui.toast(res.msg);
          setTimeout(() => {
            self.$router.push("/personal");
          }, 1e3);
        });
      });
    },
    appendByCamera() {
      //拍照添加文件
      plus.camera.getCamera().captureImage(function(e) {
        plus.io.resolveLocalFileSystemURL(
          e,
          function(entry) {
            var path = entry.toLocalURL();
          },
          function(e) {
            mui.toast("读取拍照文件错误：" + e.message);
          }
        );
      });
    },
    appendByGallery() {
      plus.gallery.pick(function(path) {
        console.log(path);
      });
    }
  },
  mounted() {
    mui.plusReady(function() {
      plus.nativeUI.actionSheet(
        {
          cancel: "取消",
          buttons: [{ title: "拍照" }, { title: "从相册中选择" }]
        },
        function(e) {
          //1 是拍照  2 从相册中选择
          switch (e.index) {
            case 1:
              this.appendByCamera();
              break;
            case 2:
              this.appendByGallery();
              break;
          }
        }
      );
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/base";
.head {
  button {
    &:enabled:active {
      background-color: nth($baseColor, 3);
    }
  }
  .cropper {
    text-align: center;
    width: 100vw;
    height: 100vh;
  }
}
</style>
