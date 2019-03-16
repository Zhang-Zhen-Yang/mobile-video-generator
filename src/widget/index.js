/*
 * @Author: zhangzhenyang
 * @Date: 2019-01-17 11:52:12
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 10:42:43
 */
import blockSlice from './blockSlice/blockSlice.vue';
import aspect from './aspect/aspect.vue';
import fileInput from './fileInput/fileInput.vue';
import center from './center/center.vue';
import listView from './listView/listView.vue';
import listViewItem from './imageSpaceListItem.vue';
import imageSpaceListItem from './imageSpaceListItem.vue';
import imgCategoryItem from './imgCategoryItem/imgCategoryItem.vue';

const options = {
  blockSlice: blockSlice,
  aspect: aspect,
  fileInput: fileInput,
  'vCenter': center,
  listView: listView,
  listViewItem,
  imgCategoryItem,
};
options.install = (Vue) => {
  for (let component in options) {
    const componentInstaller = options[component];
    if (componentInstaller && component !== 'install') {
    // alert('ddd');
      Vue.component(component, componentInstaller);
    }
  }
};
/* if(window.Vue){
  for (let component in options) {
    const componentInstaller = options[component];
    if (componentInstaller && component !== 'install') {
      window.Vue.use(componentInstaller);
    }
  }
} */
export default options;
