<template>
  <div class="drawer-content">
    <!--{{ drawerType }}-->
    <drawerImageSpace v-if="drawerType=='imageSpace'"/>
    <drawerTemplate v-if="drawerType=='home'"/>
  </div>
</template>

<script>
import drawerImageSpace from './drawerImageSpace';
import drawerTemplate from './drawerTemplate';
export default {
  name: 'drawer',
  components: {drawerImageSpace, drawerTemplate},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  computed: {
    drawerType() {
      return this.$store.state.drawerType;
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
  .drawer-content{
    height: 100%;
  }
</style>
