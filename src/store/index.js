/*
 * @Author: zhangzhenyang
 * @Date: 2019-01-19 10:19:45
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 10:21:48
 */

import http from '../script/http';
import api from '../script/api';
import util from '../script/util';

import {convertStreams, accessWorder, convertImageToVideo} from '../script/convert.js';

import Vue from 'vue';
import demo from '../script/templateDemo';

import layer from './layer';
import imageSpace from './imageSpace';
import dialogDownload from './dialogDownload';
import templates from './templates';
import dialogAudio from './dialogAudio';

// import {convertStreamsNew, accessWorderNew} from '../script/convertNew.js';

// import {covertNew} from '../script/termimal.js';
const store = {
  state: {
    stage: null,
    timeline: null,
    // 是否在播放视频
    playing: true,
    name: 'mobile',
    // 是否显示左侧抽屉
    showDrawer: false,
    drawerType: 'home',
    // 存放录制的canvas
    canvasDataList: [],
    // 视频流
    mediaStreamTrack: null,
    // asm是否加载完成
    asmInitedStatus: 'init',
    // 是否正在录制
    recording: false,
    // 模板
    project: demo,
    // 是否正在生成视频
    generating: false,
    selectedLayerIndex: 0,
  },
  // ---------------------------------------------------------------------------------------------------------
  getters: {
    // 是否管理员
    isAdmin (state) {
      // return false;
      if (window.user.id == '105227988' && util.getQueryString().admin != undefined) {
        return true;
      }
      return false;
    },
    queryObj () {
      return util.getQueryString();
    }

  },
  actions: {
    // 初始化 网络请求
    init ({state, commit, dispatch, getters}) {
      state.asmInitedStatus = 'initing';
      accessWorder().then(() => {
        // alert('ddddd');
        state.asmInitedStatus = 'success';
      }, () => {
        state.asmInitedStatus = 'error';
      });
    },
    getMediaNew () {

    },
    getMedia ({state, commit, dispatch}) {
      state.recording = true;
      // alert(navigator);
      let video = document.getElementById('video');
      if (navigator.getUserMedia) {
        navigator.getUserMedia({
          'video': true,
          'audio': true
        }, (stream) => {  
          // alert('Succeed to get media!');
          if (video.mozSrcObject !== undefined) {
            // Firefox中，video.mozSrcObject最初为null，而不是未定义的，我们可以靠这个来检测Firefox的支持  
            video.mozSrcObject = stream;
          } else {
            // video.src = window.URL && window.URL.createObjectURL(stream) || stream; 
            
            video.srcObject = stream;
            state.mediaStreamTrack = stream;
            video.onloadedmetadata = function (e) {
              video.play();
            };
          }
          // video.play();

          // 音频
          /* var audio = new Audio();
          audioType = getAudioType(audio);
          if (audioType) {  
            audio.src = 'polaroid.' + audioType;
            audio.play();
          } */
        }, (e) => {
          console.log(e);
          alert('Error！' + e);
          let video = document.getElementById('video');
          video.src = "http://192.168.1.105:8083/E07.mp4";
          video.onloadedmetadata = function (e) {
            video.play();
          };
        });    // success是获取成功的回调函数
      } else {
        alert('Native device media streaming (getUserMedia) not supported in this browser.');
      }
    },
    stopMedia ({state, commit, dispatch}) {
      state.recording = false;
      try {
        // console.log(state.mediaStreamTrack);
        state.mediaStreamTrack.getTracks()[0].stop(); // 关闭摄像头
        state.mediaStreamTrack.getVideoTracks()[0].stop(); // 关闭摄像头
        let video = document.getElementById('video');
        video.src = '';
      } catch (e) {

      }
    },
    // 停止录制
    stopRecording ({state, commit, dispatch}) {
      state.recording = false;
      // mediaStreamTrack && mediaStreamTrack.stop();
      try {
        // console.log(state.mediaStreamTrack);
        state.mediaStreamTrack.getTracks()[0].stop(); // 关闭摄像头
        state.mediaStreamTrack.getVideoTracks()[0].stop(); // 关闭摄像头
        let video = document.getElementById('video');
        video.src = '';
      } catch (e) {

      }
      var distData = [];
      state.canvasDataList.forEach((item, index) => {
        var base64str = item.toDataURL('image/jpeg', 0.9);
        var imgdata = base64str.slice(23);
        var bytes = atob(imgdata);
        // console.log('ddddddddddddddddddddddddddddddddddddddddddddddddd', bytes.slice(0, 100));
        // var bytes = base64;
        var bytesCode = new ArrayBuffer(bytes.length);
        // 转换为类型化数组
        var byteArray = new Uint8Array(bytesCode);
        // 将base64转换为ascii码
        for (var i = 0; i < bytes.length; i++) {
          byteArray[i] = bytes.charCodeAt(i);
        }
        distData.push(byteArray);
      });
      state.canvasDataList = [];
      alert(distData.length);
      setTimeout(() => {
        convertImageToVideo(
          distData,
          null,
          {
            f: 25,
            t: Math.ceil(distData.length / 25),
            b: 2000,
            goodsName: 'mobile'
          },
          (msg) => {
            if (msg.type == 'ready') {
            } else if (msg.type == 'stdout') {
            } else if (msg.type == "start") {
            } else if (msg.type == "done") {
            }
          }
        );
      }, 5000);
    },
    // 开始录制
    startRecording ({state, commit}) {
      state.recording = true;
      let video = document.getElementById('video');
      let context = document.getElementById('canvas').getContext('2d');
      window.interval = window.setInterval(function () {
        context.drawImage(video, 0, 0, 90, 120);
        var nCanvas = document.createElement('canvas');
        var vw = video.videoWidth || 100;
        var vh = video.videoHeight || 100;
        console.log([Date.now(), vw, vh]);
        nCanvas.width = vw;
        nCanvas.height = vh;
        var ctx = nCanvas.getContext('2d');
        ctx.drawImage(video, 0, 0, vw, vh);
        state.canvasDataList.push(nCanvas);
        if (window.interval && !state.recording) {
          console.log('clearInterval');
          clearInterval(window.interval);
        }
      }, 1000 / 25);
    },
    // 生成视频
    generate ({state, commit, dispatch}) {
      let timeline = window.timeline;
      let stage = window.stage;
      let canvas = stage.canvas;
      let f = 20;
      // 每帧占用的时间
      let tseperate = 1000 / f;

      if (!timeline) {
        return;
      }
      let datas = [];
      // 时长
      const duration = timeline.duration;
      let currentPosition = 0;
      timeline.gotoAndStop(0.05);
      console.log(window.timeline);
      let tickHandler = timeline.on('change', () => {
        const thisPosition = timeline.position;
        // 刷新 动画画面
        stage.update();
        // 获取图片数据(1)
        const base64str = canvas.toDataURL('image/jpeg', 0.9);
        var imgdata = base64str.slice(23);
        var bytes = atob(imgdata);
        var bytesCode = new ArrayBuffer(bytes.length);
        // 转换为类型化数组
        var byteArray = new Uint8Array(bytesCode);
        // 将base64转换为ascii码
        for (var i = 0; i < bytes.length; i++) {
          byteArray[i] = bytes.charCodeAt(i);
        }
        datas.push(byteArray);

        if (thisPosition + tseperate < duration) {
          setTimeout(() => {
            timeline.gotoAndStop(thisPosition + tseperate);
          }, 0);
        } else { // 播放结束
          state.generating = false;
          timeline.off('change', tickHandler);
          console.log('获取图片帧完毕');
          if (state.playing) {
            timeline.gotoAndPlay(0);
          } else {
            timeline.gotoAndStop(0);
          }
          Vue.$vux.loading.show({
            text: '合成视频中···'
          });
          dispatch('convertToVideo', {datas});
        }
      });
      timeline.gotoAndStop(0);
      Vue.$vux.loading.show({
        text: '获取图片帧···'
      });
    },
    // 将图片数据转成视频
    convertToVideo ({state, commit, dispatch}, {datas}) {
      console.log(datas.length);
      let timeline = window.timeline;
      let stage = window.stage;
      let canvas = stage.canvas;
      let {width, height} = canvas;
      let f = 20;
      let total = width * height;
      let goodsName = 'video';
      // 比特率
      // let bit = (total / 1000 * 5) | 0;
      let bit = (total / 1000 * 50 / 10 * f / 10) | 0;
      // 转换图片到视频
      convertImageToVideo(
        datas,
        null,
        {
          f: f,
          t: timeline.duration / 1000,
          b: bit,
          goodsName
        },
        (msg) => {
          if (msg.type === 'ready') {
            
          } else if (msg.type === 'stdout') {
            
          } else if (msg.type === 'start') {

          // 生成完毕
          } else if (msg.type === 'done') {
            Vue.$vux.loading.hide();
            Vue.$vux.toast.text('生成完毕', 'middle');
            // state.dialogGenerate.show = false;
            /* setTimeout(()=>{
              commit('showSnackbar', {
                text: '视频生成完毕,请点击链接下载！',
              });
            },0) */
            // state.dialogDownload.show = true;
          } else if (msg.type == 'blob') {
            let blob = msg.blob;
            // console.warn('blob');
            state.dialogDownload.blob = blob;
            state.dialogDownload.showDialog = true;
            // dispatch('uploadFile', {blob})
          }
        }
      );
    }
  },
  // -----------------------------------------------------------------------------------------------------------
  mutations: {
  },
  modules: {
    layer,
    imageSpace,
    dialogDownload,
    templates,
    dialogAudio
  }
};
export default store;
