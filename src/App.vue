<template>
  <div class="app">
    <router-view class="content-view"/>
  </div>
</template>
<style scoped>
  .content-view {
    position: relative;
    height: 100%;
    overflow: auto;
  }

  .content-view.login {
    padding-left: 180px;
  }
</style>
<script>
  export default {
    components: {},
    created() {
      document.body.removeChild(document.getElementById('loading'));
      this.$store.dispatch('SetPath', this.$route.path);
      // 添加百度统计
      if(window.location.href.indexOf('https://work.cgvcap.com/')===0){
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?6a6b47b63b9156346ca0a78f00d7b6a3";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      }
    },
    watch: {
      '$route.path': function (newVal, oldVal) {
        this.$store.dispatch('SetPath', newVal);
        if(this.$route.path==='/login' || this.$route.path==='/'){
          this.$store.dispatch('FedLogOut');
        }
      }
    }
  };
</script>
