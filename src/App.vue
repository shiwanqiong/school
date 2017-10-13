<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keep_alive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keep_alive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
//  mounted(){
//   var _this=this;
//   hm.request({
//     command: 'data://user/getuserinfo',
//     success: function(data) {
//       let role = data.current_role;
//       window.localStorage.setItem('userType',role);
//       if(role==='Student'){
//         _this.$router.push({name:'StayOut'});
//       }
//       else{
//         _this.$router.push({name:'DormitoryManage'});
//       }
//     },
//     failure: function (error){
//     }
//   });
//  }
}
</script>

<style lang="scss">
  @import "assets/sass/index";
</style>
