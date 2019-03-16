// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
// import VueRouter from 'vue-router'
import App from './App';
import Vuex from 'vuex';
import router from './router/index';
import widget from './widget/index';
import rootStore from './store/index';
import { ToastPlugin, ConfirmPlugin, LoadingPlugin } from 'vux';
require('./style/global.css');
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);

Vue.use(Vuex);
Vue.use(widget);
// import Home from './components/HelloFromVux'

/* Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home
}]

const router = new VueRouter({
  routes
}) */
const store = new Vuex.Store(rootStore);
FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
window.p = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');
