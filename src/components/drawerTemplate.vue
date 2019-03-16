/**
  左侧抽屉显示模板列表
 */
<template>
  <div class="drawer-template">
    <block-slice dir="vertical" :staticIndex="0" :staticValue="'46px'">
      <div slot="s" class="drawer-template-header">
        模板
      </div>
      <div slot="e" style="height: 100%;overflow: auto;" @scroll="contentScroll" ref="templateScrollContent">
        <div v-for="item, idnex in templates" class="template-item">
          <aspect :css="{padding: '5px',boxSizing: 'border-box'}">
            <div class="template-item-inner pointer" :style="{backgroundImage: `url(${item.cover})`}" @click="selectTemplate(item);">

            </div>
            <!--<img :src="item.cover" alt="" style="width: 100%;">-->
          </aspect>
        </div>
        <div class="template-list-bottom">
          <span v-if="lastAction == 'loading'">
            加载中···
          </span>
          <span v-else-if="lastAction == 'error'">
            加载失败，点击<span @click="loadMore" style="color: red;">加载</span>重新加载
          </span>
          <span v-else-if="lastAction == 'success'">
            加载完成
          </span>
          <span v-else-if="!hasMore">
            没有更多的内容了
          </span>
        </div>
      </div>
    </block-slice>
  </div>
</template>

<script>
export default {
  name: 'drawer-template',
  data () {
    return {
      msg: 'drawer-template'
    };
  },
  computed: {
    md() {
      return this.$store.state.templates;
    },
    templates() {
      return this.md.templates;
    },
    lastAction() {
      return this.md.lastAction;
    },
    // 是否有更多
    hasMore() {
      return Math.ceil(this.md.count / this.md.pageSize) < this.md.pageNo;
    }
  },
  methods: {
    // 选择模板
    selectTemplate(item) {
      this.$store.dispatch('selectTemplate', {item})
      // console.log(item);
    },
    // 内容区滚动
    contentScroll() {
      if(this.lastAction == 'loading') {
        return;
      }
      let scrollTop = this.templateScrollContent.scrollTop;
      let scrollHeight = this.templateScrollContent.scrollHeight;
      let clientHeight = this.templateScrollContent.clientHeight;
      if(scrollTop + clientHeight + 300 > scrollHeight) {
        this.loadMore();
      }

      // console.log([, this.templateScrollContent.scrollHeight, this.templateScrollContent.clientHeight]);
    },
    loadMore() {
      this.md.lastAction = 'loading';
      alert('loading');
    }
  },
  created() {
    
  },
  mounted() {
    this.templateScrollContent = this.$refs.templateScrollContent;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .drawer-template{
    height: 100%;
  }
  .template-item{
    width: 45%;
    display: inline-block;
    margin-left: 3%;
  }
  .template-item-inner{
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: contain;
    background-repeat:no-repeat; 
    border: 1px solid #aaaaaa;
    box-sizing: border-box;
  }
  .drawer-template-header{
    box-sizing: border-box;
    line-height: 46px;
    padding: 0 10px;
  }
  .template-list-bottom{
    text-align: center;
    color: rgb(29, 98, 240);
    font-size: 14px;
    padding: 10px 0;
  }
</style>
