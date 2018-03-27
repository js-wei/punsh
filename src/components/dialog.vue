<template>
    <div class="popup" v-show="modal.show">
        <transition name="fade"
                    enter-active-class="fadeDownBig"
                    leave-active-class="fadeUpBig">
            <div class="modal">
                <div class="modal-body">
                    <div class="modal-header" v-show="modal.isHeader">
                        <h4>{{ modal.title }}</h4>
                    </div>
                    <div class="modal-content">
                        <div>
                            <slot name="modal-content">内容区域</slot>
                        </div>
                    </div>
                    <div class="modal-footer" v-show="modal.isFooter">
                        <input class="btn blue" type="button" v-model="modal.yes" @click="ok" />
                        <input class="btn" type="button" v-model="modal.cancel" @click="cancel" />
                    </div>
                </div>
            </div>
       </transition>
       <div class="modal-backdrop"></div>
    </div>
</template>
<style lang="scss" scoped>
@import "../assets/style/base";
.modal {
  width: 80vw;
  position: fixed;
  left: 10%;
  z-index: 999;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  .modal-body {
    .modal-header {
      color: #fff;
      background: nth($baseColor, 3);
      border-radius: 6px 6px 0 0;
      padding: 10px;
      border-bottom: 1px solid nth($baseColor, 3);
      h4 {
        font-size: 1.5rem;
        font-weight: normal;
      }
    }
    .modal-content {
      padding: 1.3rem 0.8rem;
      height: auto;
      overflow: hidden;
      line-height:2em;
      font-size: 1.5rem;
    }
    .modal-footer {
      padding: 15px;
      text-align: right;
      border-top: 1px solid #e5e5e5;
      .btn {
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        background-color: #f7f7f7;
        background: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(#f7f7f7),
          to(#f2f2f2)
        );
        background: -moz-gradient(
          linear,
          0 0,
          0 100%,
          from(#f7f7f7),
          to(#f2f2f2)
        );
        background: -o-gradient(
          linear,
          0 0,
          0 100%,
          from(#f7f7f7),
          to(#f2f2f2)
        );
        background: -ms-gradient(
          linear,
          0 0,
          0 100%,
          from(#f7f7f7),
          to(#f2f2f2)
        );
        height: auto;
        padding: 0.2rem 1.2rem;
        cursor: pointer;
        line-height: 28px;
        display: inline-block;
        color: #666666;
        margin-right: 5px;
        outline: none;
      }
      .blue {
        border: 1px solid nth($baseColor, 3);
        background-color: nth($baseColor, 3);
        background: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(lighten(nth($baseColor, 3), 10%)),
          to(nth($baseColor, 3))
        );
        background: -moz-gradient(
          linear,
          0 0,
          0 100%,
          from(lighten(nth($baseColor, 3), 10%)),
          to(#5e9fa1)
        );
        background: -o-gradient(
          linear,
          0 0,
          0 100%,
          from(lighten(nth($baseColor, 3), 10%)),
          to(nth($baseColor, 3))
        );
        background: -ms-gradient(
          linear,
          0 0,
          0 100%,
          from(lighten(nth($baseColor, 3), 10%)),
          to(nth($baseColor, 3))
        );
        color: #ffffff;
      }
    }
  }
}
// .modal-backdrop {
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 998;
//   background-color: rgba(0, 0, 0, 0.3);
// }
</style>
<script>
export default {
  data() {
    return {
      modals: {}
    };
  },
  props: {
    modal: Object
  },
  computed: {},
  methods: {
    ok() {
      this.modal.show = false;
      this.$emit("ok", "ok");
    },
    cancel() {
      this.modal.show = false;
      this.$emit("cancel", "cancel");
    }
  },
  mounted() {
    let doc = document.querySelector(".modal"),
      middle = "30%",
      top = "0",
      bottom = "0";
    switch (this.modal.position) {
      case "top":
        doc.style.top = top;
        break;
      case "middle":
        doc.style.top = middle;
        break;
      case "bottom":
        doc.style.bottom = bottom;
        break;
      default:
        doc.style.top = middle;
    }

    if (this.modal.width) {
      doc.style.width = this.modal.width;
      if (this.modal.width.indexOf("100") > -1) {
        doc.style.left = "0";
      }
    }
    if (this.modal.height) {
      doc.style.height = this.modal.height;
    }
  },
  watch: {}
};
</script>
