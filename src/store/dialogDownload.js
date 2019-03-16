/*
 * @Author: zhangzhenyang
 * @Date: 2019-03-14 10:01:39
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-03-15 10:44:52
 */
import http from '../script/http';
import api from '../script/api';
import util from '../script/util';

import canvasRender from '../script/canvasRender';


import Vue from 'vue';
import demo from '../script/templateDemo';

// import {convertStreamsNew, accessWorderNew} from '../script/convertNew.js';

// import {covertNew} from '../script/termimal.js';
const store = {
  state: {
    showDialog: false,
    title: 'title',
    label: 'label',
    coverUrl: 'https://img.alicdn.com/imgextra/i2/105227988/O1CN01RODt6p28sYHB9HBe6-105227988.jpg',
    blob: null,
    uploading: false
  },
  // ---------------------------------------------------------------------------------------------------------
  getters: {
  },
  actions: {
    // 上传video文件
    uploadVideoFile ({state, commit, getters}, {type}){
      let title = state.title.trim();
      let label = state.label.trim();
      let coverUrl = state.coverUrl.trim();
      let numIid = getters.queryObj.numIid;
      let linkToUrl = 'https://2015.wonbao.net/marketing/mpicvideonew/list';
      console.log([title, label, coverUrl]);
      if (!title) {
        // commit('showSnackbar', {text: '请输入标题'});
        Vue.$vux.toast.text('请输入标题', 'middle');
        return;
      }
      if (!coverUrl) {
        // commit('showSnackbar', {text: '请输选择封面图'});
        Vue.$vux.toast.text('请输选择封面图', 'middle');
        return;
      }
      let formData = new FormData();
      formData.append('videoUpload', state.blob);
      formData.append('title', title);
      formData.append('label', label);
      formData.append('coverUrl', coverUrl);
      if (type == 0) {
        formData.append('numIid', numIid);
      }
      var XHR = new XMLHttpRequest();
      XHR.open('post', `${window.remote}marketing/mpicvideonew/uploadideospace`);
      XHR.send(formData);
      state.uploading = true;
      Vue.$vux.loading.show({
        text: '上传中···'
      });
      XHR.onreadystatechange = function (e) {
        if (XHR.readyState == 4) {
          Vue.$vux.loading.hide();
          state.uploading = false;
          if ((XHR.status >= 200 && XHR.status < 300) || XHR.status == 304) {
          // 判读是否有错误
          if (XHR.responseText.indexOf('true') > -1) {
            // commit('showSnackbar', {text: '上传成功'});
            Vue.$vux.toast.text('上传成功', 'middle');
            // commit('linkTo', {link: linkToUrl, timeout: 1000});
          } else if (XHR.responseText.indexOf('"msg"') > -1) {
            // commit('showSnackbar', {text: '上传失败：' + XHR.responseText});
            Vue.$vux.toast.text('上传失败：' + XHR.responseText, 'middle');
          } else {
            // commit('showSnackbar', {text: '上传成功'});
            // commit('linkTo', {link: linkToUrl, timeout: 1000});
            Vue.$vux.toast.text('上传成功', 'middle');
            /* var resultImgName = JSON.parse(XHR.response)[0].content;
            callback(resultImgName); */
          }
        } else {
          Vue.$vux.loading.hide();
          Vue.$vux.toast.text('上传失败', 'middle');
          // commit('showSnackbar', {text: '上传失败'});
          // commit('linkTo', {link: linkToUrl, timeout: 1000});
          }
        }
      };
    }
  },
  // -----------------------------------------------------------------------------------------------------------
  mutations: {
  },
  modules: {
  }
};
export default store;
