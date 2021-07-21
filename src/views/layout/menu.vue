<template>
  <div>
    <document-menu />
    <cost-menu />
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
  import documentMenu from '../document/menu';
  import costMenu from '../cost/menu';
  export default {
    components: {
      documentMenu,
      costMenu
    },
    methods: {}
  };
</script>
