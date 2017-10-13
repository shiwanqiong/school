import Vue from 'vue'
import Router from 'vue-router'
import DormSummary from '../views/dormSummary.vue'
import DormitoryManage from '../views/dormitoryManage.vue'
import LateDetail from '../views/lateDetail.vue'
import AccessRecords from '../views/accessRecords.vue'
import Qrcode from '../views/qrcode.vue'
import StayOut from '../views/stayOut.vue'
import Null from '../views/null.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Null',
      component: Null,
      meta:{keep_alive:false},
    },
    {
      path: '/dormitoryManage',
      name: 'DormitoryManage',
      component: DormitoryManage,
      meta:{keep_alive:true},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("宿舍管理", "","", true);
        next();
      }
    },
    {
      path: '/accessRecords/:id',
      name: 'AccessRecords',
      component: AccessRecords,
      meta:{keep_alive:true},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("宿舍出入详情", "","", false);
        next();
      }
    },
    {
      path: '/dormSummary',
      name: 'DormSummary',
      component: DormSummary,
      meta:{keep_alive:true},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("宿舍情况汇总", "日期","", false);
        next();
      }
    },
    {
      path: '/lateDetail/:id',
      name: 'LateDetail',
      component: LateDetail,
      meta:{keep_alive:false},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("晚归详情", "","", false);
        next();
      }
    },
    {
      path: '/qrcode',
      name: 'Qrcode',
      component: Qrcode,
      meta:{keep_alive:true},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("宿舍考勤二维码", "","", true);
        next();
      }
    },
    {
      path: '/stayOut',
      name: 'StayOut',
      component: StayOut,
      meta:{keep_alive:true},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("本月晚归情况", "日期","", true);
        next();
      }
    }
  ]
})
