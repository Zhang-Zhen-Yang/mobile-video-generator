<template>
  <block-slice dir="vertical" :staticIndex="0" :staticValue="'46px'">
    <!--头部-->
    <XHeader
      slot="s"
      :right-options="{showMore: false}"
      @on-click-more="showMenus"
    >
      <span>图文视频ll {{ asmInitedStatus }}</span>
      <x-icon
        @click="showDrawer"
        slot="overwrite-left"
        type="navicon"
        size="35"
        style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <audioDropdown slot="right"></audioDropdown>
    </XHeader>

    <!--内容区-->
    <div class="vux-demo" slot="e" style="width: 100%;height: 100%;position:relative">

      <!--摄相头弹窗-->
      <XDialog v-model="showDialog" class="camera-dialog">
          <div style="padding: 10px;">
            <aspect style="" :ratio="1.333">
              <video src="" id="video" style="width: 100%;">

              </video>
            </aspect>
            <div>
              dfadfxdf df 
            </div>
            <XButton :type="recording ? 'warn' : 'primary'" @click.native="toggleCapture">
              {{ recording ? '停止录制' : '开始录制'}}
            </XButton>

          </div>
          <div @click="hideDialog" class="vux-close">
            <x-icon type="ios-close" size="40"></x-icon>
          </div>
      </XDialog>

      <!--下载弹窗-->
      <dialog-download>
      </dialog-download>

      <!--播放器-->
      <audioPlay></audioPlay>

      <!--音乐选择-->
      <audioDropdownPicker></audioDropdownPicker>

      <block-slice dir="vertical" :staticIndex="1" :staticValue="'150px'">
        <div style="box-sizing:border-box;height:100%;" slot="e">
          <canvas-diaplay>
          </canvas-diaplay>
        </div>
        <div slot="s" style="height:100%;overflow:hidden;">
          <!--开启摄相头-->
          <XButton v-if="false" type="primary" @click.native="useCamera">
            摄相
          </XButton>
          <!--场景-->
          <queue></queue>
          <actionBtns/>
          <!--
          <group title="cell demo">
            <cell title="VUX" value="cool" is-link>sdf asdf </cell>
          </group>
          -->
        </div>
      </block-slice>
    </div>
  </block-slice>
</template>

<script>
import { XHeader, Group, Cell, XButton, XDialog } from 'vux';
import canvasDiaplay from './canvasDisplay';
import dialogDownload from './dialogDownload';
import queue from './queue';
import actionBtns from './actionBtns';
import audioPlay from './audioPlay';
import audioDropdown from './audioDropdown';
import audioDropdownPicker from './audioDropdownPicker';
export default {
  components: {
    XHeader,
    Group,
    Cell,
    XButton,
    XDialog,
    canvasDiaplay,
    queue,
    actionBtns,
    dialogDownload,
    audioPlay,
    audioDropdown,
    audioDropdownPicker
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      showDialog: false,
    }
  },
  computed: {
    recording() {
      return this.$store.state.recording;
    },
    // 视频生成库加载状态
    asmInitedStatus() {
      return this.$store.state.asmInitedStatus;
    }
  },
  methods: {
    showDrawer() {
      this.$store.state.drawerType = 'home';
      this.$store.state.showDrawer = true;
    },
    // 显示更多
    showMenus() {
      this.$vux.toast.text('hello world', 'middle');
    },
    // 使用摄相头
    useCamera() {
      this.showDialog=true;
      setTimeout(()=>{
        this.$store.dispatch('getMedia', {})
      }, 1000)
      
    },
    toggleCapture() {
      if(this.recording) {
        this.$store.dispatch('stopRecording');
      } else {
        this.$store.dispatch('startRecording');
      }
    },
    hideDialog() {
      this.showDialog = false;
      this.$store.dispatch('stopMedia');
    },
    // 开始录制视频
    startCapture() {

    },
  },
  created() {
    this.$vux.toast.text('inited', 'middle');
  }
}
</script>

<style>
  .vux-demo {
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px
  }
  .vux-header{
    background:  linear-gradient(90deg, #4574f1 0, #00abf3);
  }
  .camera-dialog .weui-dialog{
    /*max-height: 90%;
    min-height: 50%;*/
    overflow: visible;
    border-radius: 5px;
    /*margin-top: 20px;*/
  }
  .vux-close {
    position:absolute;
    top: -15px;
    right: -15px;
    text-align:center;
    font-size: 20px;
  }
</style>
