<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keep_alive"></router-view>
    </keep-alive>
      <!--<router-view></router-view>-->
    <router-view v-if="!$route.meta.keep_alive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted(){
      this.$nextTick(function () {
        hm.request({
          command:'hm_window://init',
          params:'{"refresh_enabled":false}'
        });
      })
    }
  }
</script>
<style lang="scss">
  @import "assets/sass/index";
</style>
