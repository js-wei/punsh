<template>
<div class="head">
  <v-head :isSlotRight="isSlotRight">
    <div slot="header-right">
      <button type="button" class="upload" @click="upload">上传</button>
    </div>
  </v-head>
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
      :canMove="cropper.canMove"
      :canMoveBox="cropper.canMoveBox"
      class="cropper">
    </vue-cropper>
    <div class="mui-btn-group">
      <button class="mui-btn mui-btn-warning" @click="appendByCamera">拍照上传</button>
      <button class="mui-btn mui-btn-royal" @click="appendByGallery">相册选择</button>
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
        autoCropWidth: 120,
        autoCropHeight: 120,
        canMoveBox: false,
        canMove: true,
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
          mui.toast(res.msg, {
            duration: "long"
          });
          setTimeout(() => {
            self.$router.push("/personal");
          }, 1e3);
        });
      });
    },
    appendByCamera() {
      let _this = this,
        c = plus.camera.getCamera();
      c.captureImage(
        function(e) {
          plus.io.resolveLocalFileSystemURL(
            e,
            entry => {
              _this.cropper.img =
                entry.toLocalURL() + "?version=" + new Date().getTime();
            },
            e => {
              mui.toast("用户取消");
            }
          );
        },
        s => console.log("error" + JSON.stringify(s)),
        {
          filename: "_doc/camera/"
        }
      );
    },
    appendByGallery() {
      let _this = this;
      plus.gallery.pick(
        e => {
          _this.cropper.img = e;
        },
        e => mui.toast("取消选择图片"),
        {
          filter: "image",
          multiple: false,
          maximum: 1,
          system: false
        }
      );
    }
  },
  created() {
    this.$store.commit("HIDE_FOOTER");
    //let self = this;
    // mui.plusReady(function() {
    //   plus.nativeUI.actionSheet(
    //     {
    //       cancel: "取消",
    //       buttons: [{ title: "拍照" }, { title: "从相册中选择" }]
    //     },
    //     function(e) {
    //       //1 是拍照  2 从相册中选择
    //       switch (e.index) {
    //         case 1:
    //           self.appendByCamera();
    //           break;
    //         case 2:
    //           self.appendByGallery();
    //           break;
    //         default:
    //           self.$router.go(-1);
    //       }
    //     }
    //   );
    // });
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/base";
.head {
  overflow: hidden;
  height:100vh;
  button {
    &:enabled:active {
      //background-color:unset;
      border: none;
    }
  }
  .cropper {
    text-align: center;
    width: 100vw;
    height: 76vh;
  }
  .mui-btn-group {
    height: 117px;
    text-align: center;
    background-color: nth($baseColor, 5);
    .mui-btn {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 12px;
    }
  }
}
</style>
