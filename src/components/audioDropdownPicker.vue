<template>
  <div class="audio-dropdown-picker">
    <!--音乐来源-->
    <actionsheet
      v-model="md.showActionsheet"
      :menus="menus"
      show-cancel
      @on-click-menu="actionsheetMenuClicked"
      @on-after-show="aftershow"
    >
    </actionsheet>
    <popup-picker
      :show.sync="showPopupPicker"
      :title="''"
      :data="onlineAudios" 
      @on-show="onShow"
      @on-hide="onHide"
      @on-change="onChange"
      :placeholder="'dddddddd'"
    ></popup-picker>
    <input style="display:none;" type="file" @change="audioFileChange" id="audio-file-input" accept=".mp3,.wav">
  </div>
</template>

<script>
import audios from '../script/audios/audio.js';
import { Actionsheet, PopupPicker  } from 'vux';
export default {
  name: 'audioDropdownPicker',
  components: { Actionsheet, PopupPicker  },
  data () {
    return {
      msg: 'audioDropdownPicker',
      showPopupPicker: false,
      menus: [
        {
          label: '本地音乐',
          type: 'primary',
          value: 'local',
          otherProp: 'hey'
        },
        {
          label: '线上音乐',
          type: 'deafult',
          value: 'online'
        },
        {
          label: '静音',
          type: 'warn',
          value: 'mute'
        },
      ]
    };
  },
  computed: {
    md() {
      return this.$store.state.dialogAudio;
    },
    onlineAudios() {
      return [audios.map((item)=>{
        return item.name;
      })];
    }
  },
  methods: {
    aftershow() {
      let domNode = document.querySelector('.audio-dropdown-picker .weui-actionsheet__cell');
      let label = document.querySelector('.audio-dropdown-picker .weui-actionsheet__cell .image-file-for');
      if (!label) {
        console.log(domNode);
        let labelFor = document.createElement('label');
        labelFor.for = 'audio-file-input';
        labelFor.setAttribute(
          'for', 'audio-file-input'
        )
        labelFor.style = "display: block;position: absolute;left:0;top: 0;width:100%;height: 100%;";
        labelFor.className = 'audio-file-for';
        domNode.appendChild(labelFor);
      }
    },
    actionsheetMenuClicked(e) {
       // 本地音乐
      if(e === 'local') {
       
      // 线上音乐
      } else if (e === 'online') {
        this.showPopupPicker = true;
      // 静音
      } else if(e === 'mute') {
        this.$store.state.dialogAudio.audioFrom = 'net';
        this.$store.state.dialogAudio.selectedAudioID = null;
      }
    },
    onShow() {

    },
    onHide () {

    },
    onChange(e) {
      let name = e[0];
      audios.forEach((item, index)=>{
        if(item.name == name) {
          // 获取线上音乐
          this.$store.dispatch('fetchAudioNew', {item});
        }
      })
    },
    audioFileChange(e) {
      let fileReader = new FileReader();
      fileReader.onload = ()=>{
        // alert('dddd');
        let data = fileReader.result.split(',');
        this.$store.state.dialogAudio.audioData = data[1];
        this.$store.state.dialogAudio.audioType = data[0];
        this.$store.state.dialogAudio.audioFrom = 'local';
        // console.warn(fileReader.result);
        e.target.value = '';
      }
      fileReader.onerror = function(e){
        console.warn(e);
      }
      fileReader.readAsDataURL(e.target.files[0]);
    }
    
  },
  created() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .audio-dropdown-picker{
    
  }
  .audio-dropdown-picker .vux-popup-picker-select{
    display: none;
  }

</style>
