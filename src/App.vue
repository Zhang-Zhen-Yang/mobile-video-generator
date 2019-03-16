<template>
  <div id="app">
    <drawer
      width="200px;"
      :show.sync="drawerVisibility"
      show-mode="push"
      :drawer-style="sty">
      <div slot="drawer" style="height:100%;">
        <drawerContent></drawerContent>
        <!-- 菜单内容 -->
      </div>
      <!-- rourer-view 作为默认插槽内容 -->
      <div style="height: 100%;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </drawer>
  </div>
</template>

<script>
import { Drawer } from 'vux';
import drawerContent from './components/drawer';
export default {
  name: 'app',
  components: {Drawer, drawerContent},
  data () {
    return {
      
      sty: {
        width: '80%',
        height: '100%',
        backgroundColor: '#fefefe',
        overflow: 'auto',
      }
    }
  },
  computed: {
    drawerVisibility:{
      get() {
        return this.$store.state.showDrawer;
      },
      set(val) {
        this.$store.state.showDrawer = val;
      }
    }
  },
  mounted() {
    this.$store.dispatch('init');
  },
  created() {
    window.jsonpCallback = (data)=>{
      this.$store.dispatch('jsonpCallback', data);
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }
  #app{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
</style>
