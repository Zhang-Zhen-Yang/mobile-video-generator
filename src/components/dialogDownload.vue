// 视频生成完毕
<template>
  <XDialog v-model="showDialog" class="camera-dialog">
    <span>视频生成完毕，您可以执行如下操作。</span>
    <p></p>
    <table style="width: 100%;" cellspacing="0" cellpadding="0" class="generated-table">
      <tr>
        <td style="width: 7em;">
          <x-button type="primary" mini @click.native="uploadFile(0)">
            发布到宝贝
          </x-button>
        </td>
        <td style="font-size: 14px;">
          上传到视频空间，和当前宝贝自动绑定，审核通过后自动关联宝贝。
        </td>
      </tr>
      <tr>
        <td style="width: 7em;">
          <x-button type="primary" mini @click.native="uploadFile(1)">
            上传到视频空间
          </x-button>
        </td>
        <td style="font-size: 14px;">
          上传到视频空间，审核通过后再到宝贝编辑页面手动选择关联到宝贝。
        </td>
      </tr>
      <tr>
        <td style="width: 8em;">
          <a :href="link" _target="_blank" :download="downloadName">
            <x-button type="primary" mini>
              下载视频
            </x-button>
          </a>
        </td>
        <td style="font-size: 14px;">
          下载到电脑本地，可用于其他平台推广
        </td>
      </tr>
    </table>
    
      
      <XButton v-if="false" :type="'primary'" ref="download-btn">
        下载
      </XButton>
    
    <div @click="hideDialog" class="vux-close">
      <x-icon type="ios-close" size="40"></x-icon>
    </div>
  </XDialog>
</template>

<script>
import {XButton, XDialog } from 'vux';
export default {
  name: 'HelloWorld',
  components: {XButton, XDialog},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      link: '',
      downloadName: 'download.mp4',
    };
  },
  computed: {
    md() {
      return this.$store.state.dialogDownload;
    },
    showDialog() {
      return this.md.showDialog;
    },
    blob() {
      return this.md.blob;
    }
  },
  methods: {
    hideDialog() {
      this.md.showDialog = false;
    },
    uploadFile(type) {
      this.$store.dispatch('uploadVideoFile', {type});
    },
  },
  created() {
    console.log('created');
  },
  mounted() {
    if(this.blob) {
      this.link = URL.createObjectURL(this.blob);
    }
    // let link = '<a href="' + URL.createObjectURL(blob) + '" target="_blank" download="' + downloadName + '"><span class="video-download-text">下载视频</span><div class="video-download-icon"></div></a>';
  },
  watch: {
    blob(nVal, oVal) {
      if(nVal) {
        this.link = URL.createObjectURL(this.blob);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .generated-table td{
    padding: 5px;
    text-align: left;
  }
</style>
