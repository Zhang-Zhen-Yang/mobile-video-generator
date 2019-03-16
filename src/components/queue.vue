<template>
  <div class="queue" @mousewheel="mousewheel($event)" @DOMMouseScroll="mousewheel($event)" ref="wrap">
    <div
      v-for="item,index in layers"
      class="queue-item-wrap relative pointer"
      @click="setSelectedLayerIndex(index)"
      >
      <div
        v-if="index == selectedLayerIndex"
        class="icon-checked"
      >
      </div>
      <!-- 图片 -->
      <div v-if="item.type == 'image'" :class="['queue-item', index == selectedLayerIndex ? 'active-layer' : 'inactive-layer']" :style="{backgroundImage: `url(${item.pic_url})`}">
        <!--{{ item.type }}-->
      </div>
      <!--文本-->
      <div v-if="item.type == 'text'" :class="['queue-item', index == selectedLayerIndex ? 'active-layer' : 'inactive-layer']" :style="{}">
        <v-center :css="{width: '100%', height: '100%'}">
          <span>
            {{ item.text }}
          </span>
        </v-center>
      </div>
      <!--图形-->
      <div v-if="item.type == 'shape'" :class="['queue-item', index == selectedLayerIndex ? 'active-layer' : 'inactive-layer']" :style="{}">
        {{ item.type }}
      </div>
      <!--容器-->
      <div v-if="item.type == 'container'" :class="['queue-item', index == selectedLayerIndex ? 'active-layer' : 'inactive-layer']" :style="{}">
        {{ item.type }}
      </div>
      <!--遮罩-->
      <div v-if="item.type == 'mask'" :class="['queue-item', index == selectedLayerIndex ? 'active-layer' : 'inactive-layer']" :style="{}">
        <div class="queue-shape-tip"></div>
        {{ item.type }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'queue',
  data () {
    return {
      msg: 'queue'
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
    }
  },
  methods: {
    // 滚轮事件
    mousewheel(e,) {
      /* console.log(this.$refs.wrap.clientWidth);
      console.log(this.$refs.wrap.offsetWidth);
      console.log(this.$refs.wrap.scrollWidth);

      console.log(this.$refs.wrap.scrollLeft);*/

      // console.log(e);
      let scrollLeft = this.$refs.wrap.scrollLeft;
      let clientWidth = this.$refs.wrap.clientWidth;
      let scrollWidth = this.$refs.wrap.scrollWidth;
      let down = (e.deltaY > 0 || e.detail > 0) ? true : false;
      let o = 20;
      // 向下
      if(down) {
        if(scrollLeft + clientWidth + o >=  scrollWidth) {
          this.$refs.wrap.scrollLeft = scrollWidth - clientWidth;
        } else {
          this.$refs.wrap.scrollLeft += o;
        }
      } else {
        if(scrollLeft - o <= 0) {
          this.$refs.wrap.scrollLeft = 0
        } else {
          this.$refs.wrap.scrollLeft -= o;
        }
      }
    },
    // 选择图层
    setSelectedLayerIndex(index) {
      this.selectedLayerIndex = index;
      let layer = this.layers[index];
      // console.log(layer);
      let UUID = layer.UUID;
      /* let stage = this.$store.state.stage;
      console.log(stage);
      let currentObj = this.$store.state.stage.children[index+1].getChildByName(UUID);
      console.log(currentObj.image);*/
    }
  },
  created() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .queue{
    white-space: nowrap;
    overflow-x:scroll;
    overflow-y: hidden;
    height: 85px;
    text-align: left;
  }
  .queue-item-wrap{
    width: 80px;
    /*height: 80px;*/
    display: inline-block;
    margin:0 5px;
    box-sizing: border-box;
    vertical-align: top;
  }
  .queue-item{
    width: 100%;
    height: 80px;
    background-size:contain;
    background-position: center;
    background-repeat:no-repeat;
    display: inline-block;
  }
  .queue-item.active-layer{
    border: 2px solid #4574f1;
  }
  .queue-item.inactive-layer{
    border: 2px solid #cccccc;
  }
  
  .queue-shape-tip{
    position: absolute;
    left: 0;
    top: 0;
    width:30%;
    height: 8px;
    background: linear-gradient(90deg, rgb(166, 68, 255), rgb(252, 91, 196));
  }
</style>
