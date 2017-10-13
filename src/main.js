// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/unit'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
 // window.localStorage.setItem('userType','');
hm.request({
  command: 'data://user/getuserinfo',
  success: function(data) {
    let role = data.current_role;
    window.localStorage.setItem('userType',role);
    // if(role==='Student'){
    //   router.push({name:'StayOut'});
    // }
    // else{
    //   router.push({name:'DormitoryManage'});
    // }
  },
  failure: function (error){
  }
});

