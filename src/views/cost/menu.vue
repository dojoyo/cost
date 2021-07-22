<template>
  <div class="menu-wrap" v-show="
      path==='/cost/labor' ||
      path==='/cost/travel' ||
      path==='/cost/serve' ||
      path==='/cost/agent' ||
      path==='/cost/headhunting' ||
      path==='/cost/office' ||
      path==='/cost/commerce' ||
      path==='/cost/other' ||
      path==='/cost/income' ||
      path==='/cost/distribution' ||
      path==='/cost/database/entering' ||
      path==='/cost/database/allocation' ||
      path==='/cost/database/expert' ||
      path==='/cost/overage' ||
      path==='/cost/setting'
      ">
    <div class="title">费用管理</div>
    <el-menu
      :default-active='path'
      class="el-menu-vertical-demo"
    >
      <template v-for="(item,index) in sideMenu">
        <el-menu-item v-if="!item.children" :index="item.path" :key="index" @click="$router.push({path:item.path})"
                      v-show="item.isRight" style="margin-top:3px;">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
          <div class="item-divider" v-if="item.divider"></div>
        </el-menu-item>
        <el-submenu v-if="item.children && item.children.length>0" v-show="item.isRight" :key="index" :index="item.path" style="margin-top:3px;">
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <template v-for="(sub,sIndex) in item.children">
              <el-menu-item :key="sIndex" :index="sub.path" v-show="sub.isRight"  @click="$router.push({path:sub.path})"><i class="iconfont" :class="sub.icon" v-show="false"></i>{{sub.name}}</el-menu-item>
            </template>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<style>
  .el-menu-item-group__title{
    padding: 0 0 0 20px!important;
  }
</style>
<style lang="scss" scoped>
  .item-divider {
    width: 100%;
    height: 1px;
    background: #eee;
    position: absolute;
    bottom: -2px;
    left: 0
  }
</style>
<script>
  import index from '@/utils/index';
  export default {
    components: {},
    data() {
      return {
        sideMenu: []
      };
    },
    computed: {
      path() {
        return this.$store.getters.path;
      },
      menu() {
        return this.$store.getters.menu;
      },
      user() {
        return this.$store.getters.user;
      }
    },
    mounted() {
      let ar = this.user?this.user.user.jwtClaims.ar:[];
      for (let i in this.menu) {
        if (this.menu[i].path === '/cost/labor') {
          this.sideMenu = this.menu[i].sideMenu;
          for (let x in this.sideMenu) {
            this.sideMenu[x].isRight = this.sideMenu[x].code ? index.hasRight(ar, this.sideMenu[x].code) : true;
            for (let y in this.sideMenu[x].children) {
              this.sideMenu[x].children[y].isRight = this.sideMenu[x].children[y].code ? index.hasRight(ar, this.sideMenu[x].children[y].code) : true;
            }
          }
          return;
        }
      }
    },
    methods: {}
  };
</script>
