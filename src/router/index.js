import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import HelloWorld from '@/components/HelloWorld';
import ImageSpace from '@/components/ImageSpace';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ImageSpace',
      name: 'ImageSpace',
      component: ImageSpace
    },
  ]
});
