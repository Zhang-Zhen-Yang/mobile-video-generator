<template>
  <div class="action-btns" id="action-btns">
    <Flexbox :gutter="10">
      <FlexboxItem :span="0.25">
        <XButton :gradients="['#A644FF', '#FC5BC4']" @click.native="modify">修改</XButton>
      </FlexboxItem>
      <FlexboxItem :span="0.25">
        <!--<XButton :gradients="['#A644FF', '#FC5BC4']">修改</XButton>-->
      </FlexboxItem>
      <FlexboxItem :span="0.05">
      </FlexboxItem>
      <FlexboxItem >
        <XButton :gradients="['#1D62F0', '#19D5FD']" @click.native="generate">合成视频</XButton>
      </FlexboxItem>
    </Flexbox>
    <!--选择图片-->
    <!--'.jpg,.jpeg,.png,.gif'-->
    <fileInput accept="" ref="fileInput" @change="inputChange" style="display:none;">
    </fileInput>
    <!--图片选择来源-->
    <actionsheet
      v-model="showActionsheet"
      :menus="menus"
      show-cancel
      @on-click-menu="actionsheetMenuClicked"
      @on-after-show="aftershow"
    >
    </actionsheet>
  </div>
</template>

<script>
import {XButton,  Flexbox, FlexboxItem, Actionsheet } from 'vux';
export default {
  name: 'action-btns',
  components: {
    XButton,
    Flexbox,
    FlexboxItem,
    Actionsheet,
  },
  data () {
    return {
      msg: 'action-btns',
      showActionsheet: false,
      menus: [
        {
          label: '本地图片',
          type: 'primary',
          value: 'local',
          otherProp: 'hey'
        },
        {
          label: '图片空间',
          type: 'deafult',
          value: 'space'
        },
        {
          label: '宝贝图片',
          type: 'deafult',
          value: 'goods'
        },
        /*{
          label: '拍照',
          type: 'deafult',
          value: 'camera'
        },*/
      ],
    };
  },
  computed: {
    layers() {
      return this.$store.state.project.layers;
    },
    selectedLayerIndex: {
      get() {
        return this.$store.state.selectedLayerIndex;
      },
      set(index) {
        this.$store.state.selectedLayerIndex = index;
      }
    },
    layer() {
      return this.layers[this.selectedLayerIndex];
    }
  },
  methods: {
    // 生成视频
    generate() {
      // alert('ddd');
      this.$store.dispatch('generate');
    },
    // 修改
    modify() {
      let layer = this.layer;
      if(layer) {
        let type = layer.type;
        // 图片
        if(type === 'image') {
          this.showActionsheet = true;
        // 文本
        } else if(type == 'text') {
          let _this = this;
          this.$vux.confirm.setInputValue(layer.text);
          this.$vux.confirm.show({
            showInput: true,
            title: '请输入文本',
            // 组件除show外的属性
            onCancel () {
              console.log(this) // 非当前 vm
              console.log(_this) // 当前 vm
            },
            onConfirm (value) {
              _this.$store.dispatch(
                'modifyLayer',
                {
                  pic_url: '',
                  text: value
                }
              );
            }
          })
        }
        
      } else {

      }
    },
    actionsheetMenuClicked(e) {

      // 本地图片
      if(e === 'local') {
       
      // 图片空间 
      } else if (e === 'space') {
        location.href="#/ImageSpace";
        return;
        let _this = this;
        // this.$vux.confirm.setInputValue(this.layer.pic_url);
        this.$vux.confirm.show({
          showInput: true,
          title: '请输入图片链接',
          // 组件除show外的属性
          onCancel () {
            // console.log(this) // 非当前 vm
            // console.log(_this) // 当前 vm
          },
          onConfirm (value) {
            _this.$store.dispatch(
              'modifyLayer',
              {
                pic_url: value,
                text: ''
              }
            );
          }
        })

        // this.$store.dispatch('modifyLayer', {pic_url: 'http://imgs.aixifan.com/o_1d5brtdavmk8pu6oeo1ar91ola1n.png', text: ''});
      // 宝贝图片
      } else if(e === 'goods') {

      // 摄相
      } else if(e === 'camera') {

      }
      console.log(e);
    },

    aftershow() {
      let domNode = document.querySelector('.action-btns .weui-actionsheet__cell');
      let label = document.querySelector('.action-btns .weui-actionsheet__cell .image-file-for');
      if (!label) {
        console.log(domNode);
        let labelFor = document.createElement('label');
        labelFor.for = 'file-input';
        labelFor.setAttribute(
          'for', 'file-input'
        )
        labelFor.style = "display: block;position: absolute;left:0;top: 0;width:100%;height: 100%;";
        labelFor.className = 'image-file-for';
        domNode.appendChild(labelFor);
      }
    },
    inputChange({file}) {
      console.log(file);
      if(file.type.indexOf('image') < 0) {
        // 显示
        this.$vux.toast.text('您选择的不是图片文件！', 'middle');
        return;
      }
      let fileReder = new FileReader();
      fileReder.onload = ()=>{
        this.$store.dispatch('modifyLayer', {pic_url: fileReder.result, text: ''});
      };
      fileReder.readAsDataURL(file);
      // console.log(file);
    }
  },
  created() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .action-btns{
    position:absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    padding: 5px;

  }
  .action-btns button{
    border-radius: 20px;
    /*font-size: 14px;*/
  }
  .image-file-for{
    
  }
</style>
