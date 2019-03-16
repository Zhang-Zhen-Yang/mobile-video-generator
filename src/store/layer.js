/*
 * @Author: zhangzhenyang
 * @Date: 2019-01-19 10:19:45
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 10:21:48
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
    
  },
  // ---------------------------------------------------------------------------------------------------------
  getters: {
  },
  actions: {
    // 修改图层
    modifyLayer ({rootState, state, commit, dispatch}, {pic_url, text}) {
      let layerIndex = rootState.selectedLayerIndex;
      let currentLayer = rootState.project.layers[layerIndex];
      let currentContainer = window.stage.children[layerIndex + 1];
      let currentUUID = currentLayer.UUID;
      let currentTweenObj = currentLayer.tweenObj;
      let type = currentLayer.type;

      // 图片
      if (type === 'image') {
        currentLayer.pic_url = pic_url;
        canvasRender.getBitmap({
          item: currentLayer,
          project: rootState.project,
          callback: ({obj, scale}) => {
            console.log(obj);
            console.log(scale);
            let UUID = new util.getUUID().id;

            let prevChild = currentContainer.getChildByName(currentUUID);
            var mask = prevChild.mask;
            if (mask) {
              obj.mask = mask;
            }
            console.log(prevChild.mask);
            currentContainer.addChild(obj);
            currentContainer.swapChildren(prevChild, obj);
            currentContainer.removeChild(prevChild);
            obj.name = UUID;
            rootState.project.layers[layerIndex].UUID = UUID;
            
            let tween = canvasRender.getTween({obj, item: currentLayer, timeline: window.timeline, scale});
            window.timeline.removeTween(currentTweenObj);
            window.timeline.addTween(tween);
          }
        });
      // 文本
      } else if (type === 'text') {
        currentLayer.text = text;
        canvasRender.getText({
          item: currentLayer,
          project: rootState.project,
          callback: ({obj, scale}) => {
            console.log(obj);
            console.log(scale);
            let UUID = new util.getUUID().id;

            let prevChild = currentContainer.getChildByName(currentUUID);
            var mask = prevChild.mask;
            if (mask) {
              obj.mask = mask;
            }
            currentContainer.addChild(obj);
            currentContainer.swapChildren(prevChild, obj);
            currentContainer.removeChild(prevChild);
            obj.name = UUID;
            rootState.project.layers[layerIndex].UUID = UUID;
            
            let tween = canvasRender.getTween({obj, item: currentLayer, timeline: window.timeline, scale});
            window.timeline.removeTween(currentTweenObj);
            window.timeline.addTween(tween);
          }
        });
      }
      console.log('ddd');
    },
    // 检查遮罩
    modifyCheckMask ({rootState, state, commit, dispatch}, {obj, layerIndex}) {


    }

  },
  // -----------------------------------------------------------------------------------------------------------
  mutations: {
  },
  modules: {
  }
};
export default store;
