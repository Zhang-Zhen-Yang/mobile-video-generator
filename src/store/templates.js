/*
 * @Author: zhangzhenyang
 * @Date: 2019-03-15 11:41:44
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-03-16 15:25:16
 */
// 模板
import http from '../script/http';
import api from '../script/api';
import util from '../script/util';

import canvasRender from '../script/canvasRender';


import Vue from 'vue';
import demo from '../script/templateDemo';

// import {convertStreamsNew, accessWorderNew} from '../script/convertNew.js';

// import {covertNew} from '../script/termimal.js';
import demo1 from '../templates/demo1';
const store = {
  state: {
    pageSize: 20,
    pageNo: 1,
    lastAction: 'initing',
    count: 100,
    templates: [
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305078698.JPG',
        project: demo1

      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305079567.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305080839.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305081679.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305078698.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305079567.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305080839.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305081679.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305078698.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305079567.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305080839.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305081679.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305078698.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305079567.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305080839.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305081679.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305078698.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305079567.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305080839.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305081679.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305078698.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305079567.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305080839.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305081679.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305078698.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305079567.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305080839.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305081679.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305078698.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305079567.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305080839.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305081679.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305078698.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305079567.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305080839.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305081679.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305078698.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305079567.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305080839.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305081679.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305078698.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305079567.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305080839.JPG',
      },
      {
        cover: 'http://imgs.aixifan.com/content/2019_03_11/1552305081679.JPG',
      },
    ],
  },
  // ---------------------------------------------------------------------------------------------------------
  getters: {
  },
  actions: {
    // 选择模板
    selectTemplate ({rootState, state, commit, dispatch}, {item}) {
      if (!item.project) {
        return;
      }
      rootState.project = item.project;
      canvasRender.render({
        canvas: window.stage.canvas,
        project: item.project,
        state: rootState
      });
      rootState.showDrawer = false;
    }
  },
  mutations: {
  }
};
export default store;
