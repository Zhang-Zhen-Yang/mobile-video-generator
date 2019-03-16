/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:35:29 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-03-11 16:15:29
 */
// list view
<template>
  <div class="list-view">
    <slot name="list-start"></slot>
    <div v-for="item, index in items" track-by="index" class="list-view-item" :style="{height: placeholders[index] + 'px'}">
        <!--<component :is="visibility[index] ? 'list-view-item' : ''" :item="item" keep-alive></component>-->
        <list-view-item :item="item"></list-view-item>
    </div>
    <div style="text-align: center;padding: 20px 0;">
      <div v-if="!hastNext">
        没有更多的内容了！
      </div>
      <div v-else-if="lastAction=='loading'">
        加载中···
      </div>
      <div v-else-if="lastAction=='error'">
        加载出错,点击<span style="color: red" class="pointer" @click="loadMoreAction">加载</span>重新获取数据
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import fastdom from 'fastdom';
// import { constants } from 'fs';

const INNER_HEIGHT = window.innerHeight;
const DIRECTION_UP = 0;
const DIRECTION_DOWN = 1;
export default {
  props:{
    items: {
      type: Array,
      required: true
    },
    preloadScreens: {
      type: Number,
      default: 6
    },
    scrollInside: {
      type: Boolean,
      default: false
    },
    loadMore: {
      type: Function
    },
    lastAction: {
      type: String,
      default: 'initing',
    },
    hastNext: {
      type: Boolean,
      default: true
    }
  },
  name: 'list-view',
  data () {
    return {
      placeholders: [],
      visibility: [],
      scrollHeight: 0,
      scrollTop: 0,
      preloadHeight: 0
    }
  },
  computed:{
  },
  ready() {
    
  },
  beforeDestroy() {
    !this.scrollInside && window.removeEventListener('scroll', this.scrollHandler)
  },
  created() {
    // alert('sddd');
  },
  methods: {
    scrollHandler: throttle(function () {
        var el = this.$el;
          console.log('kkkkkkkkkkkkkkkkk');
        el && fastdom.measure(() => {
            if (!el) return;
            /* Check scrolling up or down */
            var oldScrollTop = this.scrollTop;
            var newScrollTop = this.scrollInside ? el.scrollTop : window.scrollY;
            var direction = oldScrollTop > newScrollTop ? DIRECTION_UP : DIRECTION_DOWN;
            this.scrollTop = newScrollTop;

            /* Check if scrolled to end */
            if (INNER_HEIGHT + newScrollTop >= this.scrollHeight) {
                if (this.loadMore) {
                    this.loadMoreAction();
                }
                /* Note: $dispatch is deprecated in vue 2.0 */
                else if (this.$dispatch) {
                    this.$dispatch('list-view:scrolled-to-end');
                }
            }

            this.checkVisibility(direction);
        })
    }, 1000),
    /* GC invisible items and Restore visible items if necessary */
    checkVisibility(direction) {
      if (!this.$el) return;
      var preloadHeight = this.preloadHeight;
      var els = this.$el.querySelectorAll('.list-view-item');
      var visibility = this.visibility, placeholders = this.placeholders;
      var scrollTop = this.scrollTop;

      /* If we don't know the scrolling direction, we must check all the items */
      var checkStart = 0, checkEnd = visibility.length - 1;

      /* Whether to skip checking */
      var skip = false;

      /* If scrolling up, we only need to check visible items plus those before them */
      if (direction == DIRECTION_UP) {
          checkEnd = visibility.lastIndexOf(true);
          /* using a reversed loop for efficiency */
          for (let i = checkEnd; i >= checkStart; i--) {
              fastdom.measure(() => {
                  if (skip) {
                      this.$set(visibility, i, false);
                  } else if (els[i]) {
                      checkElem(i);
                      if (i < checkEnd && !visibility[i] && visibility[i + 1]) skip = true;
                  }
              });
          }
      } else {
          /* If scrolling down, we only need to check visible items plus those after them */
          if (direction == DIRECTION_DOWN) checkStart = visibility.indexOf(true);
          for (let i = checkStart; i <= checkEnd; i++) {
              fastdom.measure(() => {
                  if (skip) {
                      this.$set(visibility, i, false);
                  } else if (els[i]) {
                      checkElem(i);
                      if (i > checkStart && !visibility[i] && visibility[i - 1]) skip = true;
                  }
              });
          }
      }

      function checkElem(i) {
          var top = els[i].offsetTop - scrollTop;
          var bottom = top + placeholders[i];
          visibility[i] = bottom > -preloadHeight && top < preloadHeight;
      }
    },
    loadMoreAction() {
      if(!this.hastNext) return;
      if (this.loadMore) {
        this.loadMore();
      }
    }
  },
  watch: {
    items: {
      immediate: true,
      handler(items, oldItems) {
        // 如果新的列表条数小于旧的
        if(oldItems && (oldItems.length > items.length)) {
          // this.$el.scrollTop = 0;
        }
        var placeholders = this.placeholders,
          visibility = this.visibility,
          shrinked = oldItems && (oldItems.length > items.length);

        /* Re-initialize visibility table and bypass vue's watcher */
        for (let i = 0, len = items.length; i < len; i++) {
          this.$set(visibility, i, true);
        }

        /* Wait for vue to update dom */
        this.$nextTick(() => {
          /* Now vue has re-rendered the list and dom's ready */
          /* Cache scrollHeight */
          fastdom.measure(() => this.$el && (this.scrollHeight = this.$el.scrollHeight));

          /* Update elements' heights(placeholders) */
          var els = this.$el.querySelectorAll('.list-view-item');
          for (let i = 0, len = els.length; i < len; i++) {
            fastdom.measure(() => {
              /* Skip if already measured */
              if (els[i].style.cssText) return;
              /* Measure element height */
              this.$set(placeholders, i, els[i].offsetHeight || null);
              if (i == len - 1) {
                  /**
                   * Since items typically updated after scrolling to end,
                   * and new contents are appended at the end, we only need to check downwards
                   */
                  this.checkVisibility(!shrinked && DIRECTION_DOWN);
              }
            })
          }
        });
      }
    }
  },
  mounted() {
    this.preloadHeight = this.preloadScreens * INNER_HEIGHT;
    if (!this.scrollInside) {
      window.addEventListener('scroll', this.scrollHandler)
    } else {
      this.$el.style.overflow = 'auto';
      this.$el.style.height = '100%';
      this.$el.addEventListener('scroll', this.scrollHandler)
      console.log('this.$el', this.$el);
    }
  }
}
</script>
<style>
/*.list-view{
  height: 100%;
  overflow: auto;
}*/
 .v-center{
   display:table;
 }
 .v-center-content{
   display:table-cell;
   width:100%;
   height:100%;
   
 }
 .v-middle{
   vertical-align:middle;
 }
 .v-center{
   text-align:center;
 }
 .v-centerInParent{
   vertical-align:middle;
   text-align:center;
 }
</style>
