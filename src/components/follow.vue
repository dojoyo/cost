<template>
  <div>
    <span class="fs-14 pointer" @click="setFollow"><i class="iconfont icon-guanzhu mr-10" :class="{'warning':followed}"></i>{{followed?'已关注':'关注'}}</span>
  </div>
</template>
<script>
  import api from '@/api/okr'
  export default {
    name: 'Follow',
    components: {},
    props: {
      id: String,
    },
    data() {
      return {
        list:'',
        followed:false
      }
    },
    watch: {
      id(val){
        if(val){
          this.getList();
          this.hasFollow();
        }
      }
    },
    mounted() {
      setTimeout(()=>{
        this.getList();
        this.hasFollow();
      },500)
    },
    methods: {
      getList(){
        this.list = '';
        api.followList(this.id).then(res => {
          if (res.code === 200) {}
        }).catch(err => {
          console.log(err);
        })
      },
      hasFollow(){
        api.hasFollow(this.id).then(res => {
          if (res.code === 200) {
            this.followed = res.data
          }
        }).catch(err => {
          console.log(err);
        })
      },
      setFollow(){
        if(this.followed){
          api.unFollow(this.id).then(res => {
            if (res.code === 200) {
              this.getList();
              this.followed=false;
              this.$message.success({message: '取消关注成功', duration: 1500})
            }
          }).catch(err => {
            console.log(err);
          })
        }else {
          api.follow(this.id).then(res => {
            if (res.code === 200) {
              this.getList();
              this.followed=true;
              this.$message.success({message: '关注成功', duration: 1500})
            }
          }).catch(err => {
            console.log(err);
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
