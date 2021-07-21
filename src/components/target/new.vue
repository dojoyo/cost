<template>
  <div class="new-target-dialog">
    <el-button type="primary" size="mini" class="mr-10" @click="showTargetPanel">+新建目标</el-button>
    <!--新建目标-->
    <target-edit :stage="stage" :detail="detail" :append="false" :type="'new'" v-on:TARGET_EDIT="targetEdit"/>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
  import targetEdit from '@/components/target/edit'
  export default {
    name: 'targetNew',
    props: {
      stage: Object
    },
    components:{targetEdit},
    data() {
      return {
        detail:{}
      }
    },
    watch:{
    },
    created() {},
    methods: {
      // 显示编辑框
      showTargetPanel(){
        this.detail = {};
      },
      targetEdit(){
        this.$emit('TARGET_NEW');
      }
    }
  }
</script>


