/*
 * File: d:\works\punsh\src\components\bnavbar.vue
 * Created Date: 2018-03-30 10:18:38
 * Author: 魏巍
 * -----
 * Last Modified: 魏巍
 * Modified By: 2018-03-30 11:55:05
 * -----
 * Copyright (c) 2018 魏巍
 * ------
 * All shall be well and all shall be well and all manner of things shall be well.
 * We're doomed!
 */

<template>
    <div class="tab" ref="tab">
        <ul class="tab_content" ref="tabWrapper">
            <slot v-if="!itemList" ref="tabitem"></slot>
            <li class="tab_item" v-for="(item,index) in itemList" :class="{'active':index==active}"
              :key="index" ref="tabitem" v-if="itemList && !isLink" @click.stop="click(item,index)">
                {{item.title}}
            </li>
            <li class="tab_item" v-for="(item,index) in itemList" 
              :key="index" ref="tabitem" v-if="itemList && isLink" :class="{'active':index==active}">
                <router-link :to="item.url">
                  {{item.title}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      active: 0
    };
  },
  props: {
    itemList: Array,
    isLink: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    InitTabScroll() {
      let width = 0;
      if (this.itemList) {
        for (let i = 0; i < this.itemList.length; i++) {
          width += this.$refs.tabitem[i].getBoundingClientRect().width;
        }
      } else {
        let uls = document.querySelector(".tab_content").children;
        for (let i = 0; i < uls.length; i++) {
          width += uls[i].offsetWidth;
        }
      }
      this.$refs.tabWrapper.style.width = width + "px";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.tab, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    click(item, index) {
      this.active = index;
      this.$emit("selectItem", item);
    }
  },
  created() {
    this._active = this.active;
    this.$nextTick(() => {
      this.InitTabScroll();
    });
  }
};
</script>
 <style lang="scss" scoped>
.tab {
  width: 95vw;
  overflow: hidden;
  margin: 0 auto;
  ul {
    line-height: 2rem;
    display: flex;
    padding-left: 0;
    li {
      flex: 0 0 60px;
      width: 60px;
      list-style-type: none;
      &.active {
        color: #eb7d46;
      }
      a {
        color: #000;
      }
    }
  }
}
</style>