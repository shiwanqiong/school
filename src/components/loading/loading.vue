<template>
  <div class="mf-loading-container">
    <img src="./img/loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'loading'

  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="scss" scoped>
  .mf-loading-container{
    img{
      width: 0.266667rem;
      height: 0.266667rem;
      display: block;
    }
  }
</style>
