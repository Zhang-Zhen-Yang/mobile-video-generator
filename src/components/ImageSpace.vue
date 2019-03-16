<template>
  <block-slice dir="vertical" :staticIndex="0" :staticValue="'46px'">
    <!--头部-->
    <XHeader
      slot="s"
      :right-options="{showMore: true}"
      @on-click-more="showMenus"
    >
      <span>图片空间</span>
      <x-icon
        @click="showDrawer"
        slot="overwrite-left"
        type="navicon"
        size="35"
        
        style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
    </XHeader>

    <!--内容区-->
    <div class="vux-demo" slot="e" style="width: 100%;height: 100%;position:relative">
      <block-slice dir="vertical" :staticIndex="1" :staticValue="'46px'">
        <div slot="e" style="height: 100%;">
          <div class="image-page" style="height: 100%;">
            <!--列表-->
            <list-view
              :items="item3ColArray"
              :loadMore="loadMore"
              :scrollInside="true"
              :lastAction="lastAction"
              :hastNext="hastNext"
            >
              <!--<div slot="list-start">list-start</div>
              <div slot="list-end">list-end</div>-->
            </list-view>
          </div>
        </div>
        <div slot="s" style="padding: 3px 10px;" class="image-space-bottom-btn-wrap">
          <table cellspacing="0" cellpadding="0" style="width: 100%;">
            <tr>
              <td>
                <div class="image-space-bottom-btn back-btn pointer" @click="back">
                  返回
                </div>
              </td>
              <td>
                <div class="image-space-bottom-btn confirm-btn pointer" @click="confirm">
                  确定
                </div>
              </td>
            </tr>
          </table>
        </div>
      </block-slice>
      
    </div>
  </block-slice>

</template>

<script>
import { XHeader, Group, Cell, XButton, XDialog, ButtonTab, ButtonTabItem  } from 'vux';
export default {
  name: 'image-space',
  components: { XHeader, Group, Cell, XButton, XDialog, ButtonTab, ButtonTabItem },
  data () {
    return {
      msg: 'Welcome to Your 图片空间',
      
    };
  },
  computed: {
    items() {
      return this.$store.state.imageSpace.list;
    },
    item2ColArray() {
      const result = [];
      let tempList = [];
      this.items.forEach((item) => {
        tempList.push(item);
        if (tempList.length == 2) {
          result.push(tempList);
          tempList = [];
        }
      });
      if (tempList.length > 0) {
        result.push(tempList);
      }
      return result;
    },
    item3ColArray(){
      const result = [];
      let tempList = [];
      this.items.forEach((item) => {
        tempList.push(item);
        if (tempList.length == 3) {
          result.push(tempList);
          tempList = [];
        }
      });
      if (tempList.length > 0) {
        result.push(tempList);
      }
      return result;
    },
    md() {
      return this.$store.state.imageSpace;
    },
    selectedImage() {
      return this.md.selectedPic;
    },
    lastAction() {
      return this.md.lastAction;
    },
    pageNo() {
      return this.md.pageNo;
    },
    hastNext() {
      return this.md.hastNext;
    }
  },
  methods: {
    showMenus() {

    },
    showDrawer() {
      this.$store.state.drawerType = 'imageSpace';
      this.$store.state.showDrawer = true;
    },
    // 返回
    back() {
      history.back();
    },
    confirm() {
      if (this.selectedImage) {
        this.$store.dispatch('modifyLayer', {pic_url: this.selectedImage, text: ''});
        history.back();
      } else {

      }
    },
    loadMore() {
      console.log('loadMore');
      if(this.lastAction !== 'loading'){
        this.$store.dispatch('getPictureItems',{
          pageNo: this.pageNo + 1,
        })
      }
    }
  },
  created() {
    this.$store.dispatch('getPictureCategory');
    this.$store.dispatch('getPictureItems',{});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .image-space{

  }
  .image-space-bottom-btn{
    line-height: 40px;
    box-sizing: border-box;
    text-align: center;
  }
  .back-btn{
    border-radius: 20px 0  0 20px;
    border: 1px solid rgb(29, 98, 240);
    color: rgb(29, 98, 240);
    line-height: 38px;
  }
  .confirm-btn{
    border-radius:  0 20px 20px 0;
    /* border: 1px solid rgb(39, 108, 250);*/
    background: linear-gradient(90deg, rgb(29, 98, 240), rgb(25, 213, 253));
    color: white;
  }
  

</style>
