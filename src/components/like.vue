<template>
  <div>
    <span class="fs-14 pointer" @click="setLike"><i class="iconfont icon-dianzan mr-10" :class="{'danger':liked}"></i>{{liked?'已赞':'点赞'}}&nbsp;&nbsp;&nbsp;&nbsp;{{list}}</span>
  </div>
</template>
<script>
  import api from '@/api/okr'
  export default {
    name: 'Like',
    components: {},
    props: {
      id: String,
      type:String
    },
    data() {
      return {
        baseAPI: process.env.BASE_API,
        pageNum:1,
        pageSize:10,
        list:'',
        liked:false
      }
    },
    watch: {
      id(val){
        if(val){
          this.getList();
          this.hasLiked();
        }
      }
    },
    mounted() {
      setTimeout(()=>{
        this.getList();
        this.hasLiked();
      },500)
    },
    methods: {
      getList(){
        this.list = '';
        let params = {
          bizType:this.type,//可用值:obj-目标,bri-简报
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }
        api.likeList(params, this.id).then(res => {
          if (res.code === 200) {
            for(let i in res.data.list){
              this.list+=res.data.list[i].likeUser.userName +','
              if(parseInt(i)>2){
                this.list = '[' + this.list.substring(0,this.list.length-1) +'等共'+res.data.total+'人点赞]'
                return
              }
            }

            if(this.list.length>0){
              this.list = '[' + this.list.substring(0,this.list.length-1) +'共'+res.data.total+'人点赞]'
            }
          }
        }).catch(err => {
          console.log(err);
        })
      },
      hasLiked(){
        let params = {
          bizType:this.type,//可用值:obj-目标,bri-简报
        }
        api.hasLiked(params, this.id).then(res => {
          if (res.code === 200) {
            this.liked = res.data
          }
        }).catch(err => {
          console.log(err);
        })
      },
      setLike(){
        let params = {
          bizType:this.type,//可用值:obj-目标,bri-简报
        }
        if(this.liked){
          api.removeLike(params, this.id).then(res => {
            if (res.code === 200) {
              this.getList();
              this.liked=false;
              this.$message.success({message: '取消点赞成功', duration: 1500})
            }
          }).catch(err => {
            console.log(err);
          })
        }else {
          api.addLike(params, this.id).then(res => {
            if (res.code === 200) {
              this.getList();
              this.liked=true;
              this.$message.success({message: '点赞成功', duration: 1500})
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
