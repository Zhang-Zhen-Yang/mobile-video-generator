<template>
  <div class="list-view-item2">
    <table cellspacing="0" cellpadding="0" style="width: 100%;">
      <tr>
        <td style="width: 33.3%">
          <div style="box-sizing: border-box;padding: 5px">
            <aspect v-if="item[0]">
              <div
                style="width: 100%;height: 100%;"
                :class="['image-space-picture-wrap', 'pointer', selectedImage == item[0].pic_url ? 'selected-image': '', 'relative']" 
                @click="setSelectedImage(item[0].pic_url)">
                <v-center :css="{width: '100%', height: '100%', boxSizing: 'border-box',}">
                  <img :src="item[0].pic_url" alt="" class="image-space-picture">
                </v-center>
                <div class="icon-checked" v-if="selectedImage == item[0].pic_url"></div>
              </div>
            </aspect>
          </div>
          
        </td>
        <td style="width: 33.3%">
          <div style="box-sizing: border-box;padding: 5px">
            <aspect v-if="item[1]">
              <div
                style="width: 100%;height: 100%;"
                :class="['image-space-picture-wrap', 'pointer', selectedImage == item[1].pic_url ? 'selected-image': '', 'ralative']" 
                @click="setSelectedImage(item[1].pic_url)">
                <v-center :css="{width: '100%', height: '100%', boxSizing: 'border-box',}">
                  <img :src="item[1].pic_url" alt="" class="image-space-picture">
                </v-center>
                <div class="icon-checked" v-if="selectedImage == item[1].pic_url"></div>
              </div>
            </aspect>
          </div>
        </td>
        <td>
          <div style="box-sizing: border-box;padding: 5px">
            <aspect v-if="item[2]">
              <div
                style="width: 100%;height: 100%;"
                :class="['image-space-picture-wrap', 'pointer', selectedImage == item[2].pic_url ? 'selected-image': '', 'ralative']" 
                @click="setSelectedImage(item[2].pic_url)">
                <v-center :css="{width: '100%', height: '100%', boxSizing: 'border-box',}">
                  <img :src="item[2].pic_url" alt="" class="image-space-picture">
                </v-center>
                <div class="icon-checked" v-if="selectedImage == item[2].pic_url"></div>
              </div>
            </aspect>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'list-view-item',
  props: {
    item: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data () {
    return {
      msg: 'list-view-item'
    };
  },
  computed: {
    md() {
      return this.$store.state.imageSpace;
    },
    selectedImage() {
      return this.md.selectedPic;
    }
  },
  methods: {
    setSelectedImage(pic_url) {
      this.md.selectedPic = pic_url;
    }
  },
  created() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list-view-item2{
    
  }
  .image-space-picture{
    max-width: 100%;
    max-height: 100%;
  }
  .image-space-picture-wrap{
    box-sizing: border-box;
    border: 2px solid #dddddd;
    overflow: hidden;
  }
  .image-space-picture-wrap.selected-image{
    border: 2px solid rgb(29, 98, 240);
  }
</style>
