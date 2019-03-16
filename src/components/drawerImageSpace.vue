<template>
  <div class="drawer-template">
    <div v-if="pictureCategory">
      <imgCategoryItem v-for="item,index in pictureCategory" :data="item" :key="index">
      </imgCategoryItem>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drawer-template',
  data () {
    return {
      msg: 'drawer-template',
      
    };
  },
  computed: {
    pictureCategory() {
      return this.$store.state.imageSpace.pictureCategory;
    }
  },
  methods: {
    
  },
  created() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
