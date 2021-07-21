<template>
  <div class="layout">
    <div class="watermark" v-if="hasWatermark">
      <div class="repeat" v-for="(row,a) in watermark.row" :key="a">
        <div v-for="(col,b) in watermark.col" :key="b" class="row">
          <div class="msg">{{watermark.info.name}} {{watermark.info.id}} <br/> {{watermark.info.time}}</div>
        </div>
      </div>
    </div>
    <el-container class="container" :style="{'height':height+'px'}">
      <el-aside class="aside">
        <sidebar-view :style="{'height':height+'px'}"/>
      </el-aside>
      <el-aside class="menu" v-show="hasMenu">
        <menu-view/>
      </el-aside>
      <router-view :key="key"></router-view>
      <disk-process />
    </el-container>
  </div>
</template>

<script>
  import SidebarView from './sidebar';
  import MenuView from './menu';
  import diskProcess from '@/components/disk-process'

  export default {
    components: {
      SidebarView,
      MenuView,
      diskProcess
    },
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
      },
      hasMenu() {
        let path = this.$store.getters.path;
        return !(path.indexOf('/schedule') === 0 || path.indexOf('/knowledge') === 0 || path.indexOf('/indicator/index') === 0);
      },
      hasWatermark(){
        let path = this.$store.getters.path;
        let result = path.indexOf('/manage') === 0 || path.indexOf('/invest') === 0 || path.indexOf('/document') === 0 || path.indexOf('/approve') === 0;
        if(result){
          let curTime = new Date().getTime();
          let time = this.$options.filters.DateTimeSecondEn(curTime / 1000);
          this.watermark.info.time = time;
        }
        return result;
      }
    },
    data() {
      return {
        height: '',
        watermark:{
          row:[1,1,1,1,1,1,1,1,1,1,1,1],
          col:[1,1,1,1,1,1,1,1,1,1,1,1],
          info:{
            name:'',
            id:'',
            time:''
          }
        }
      };
    },
    mounted() {
      let _this = this;
      _this.height = document.documentElement.clientHeight;
      window.onresize = () => {
        _this.height = document.documentElement.clientHeight;
      };
      this.watermark.info.name = this.$store.state.user.user.jwtClaims.un;
      this.watermark.info.id = this.$store.state.user.user.jwtClaims.id.substring(this.$store.state.user.user.jwtClaims.id.length-11);
      let curTime = new Date().getTime();
      let time = this.$options.filters.DateTimeSecondEn(curTime / 1000);
      this.watermark.info.time = time;
    }
  };
</script>

<style lang="scss" scoped>
  .watermark{
    position: fixed;
    top: 0;
    left: -1200px;
    right: 0;
    bottom: 0;
    width: 3000px;
    height: 3000px;
    overflow: hidden;
    z-index: 10000;
    pointer-events: none;
    opacity: 0.07;
    font-size:12px;
  }
  .watermark .repeat{
    width: 3000px;
    display: flex;
    justify-content: flex-start;
    margin-left:-1000rpx ;
    margin-bottom:100px;
    transform:rotate(-30deg);
    -ms-transform:rotate(-30deg); 	/* IE 9 */
    -moz-transform:rotate(-30deg); 	/* Firefox */
    -webkit-transform:rotate(-30deg); /* Safari 和 Chrome */
    -o-transform:rotate(-30deg); 	/* Opera */
  }
  .watermark .msg{
    width:400px
  }

</style>
