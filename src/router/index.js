import Vue from 'vue'
import Router from 'vue-router'
import ActivityIndex from '../views/activityIndex.vue'
import ActivityDetail from '../views/activityDetail.vue'
import Activities from '../views/activities.vue'
import WillCheck from '../views/willCheck.vue'
import SingleCheck from '../views/singleCheck.vue'
import CheckRecords from '../views/checkRecords.vue'
import MyActivities from '../views/myActivities.vue'
import Reject from '../views/reject.vue'
import Qrcode from '../views/qrcode.vue'
import TestCommand from '../views/testCommand.vue'
import BindDevice from '../views/bindDevice.vue'
import SignInManagement from '../views/signInManagement.vue'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ActivityIndex',
      component: ActivityIndex,
      meta:{keep_alive:true},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("学生发展课程", "","", true);
        next();
      }
    },
    {
      path: '/qrcode/:id',
      name: 'Qrcode',
      component: Qrcode,
      meta:{keep_alive:false},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("签到二维码", "", false);
        next();
      }
    },
    {
      path: '/signInManagement/:did',
      name: 'SignInManagement',
      component: SignInManagement,
      meta:{keep_alive:false},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("签到管理", "", false);
        next();
      }
    },
    {
      path: '/bindDevice/:bid',
      name: 'BindDevice',
      component: BindDevice,
      meta:{keep_alive:false},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("绑定设备", "", false);
        next();
      }
    },
    {
      path: '/activities',
      name: 'Activities',
      meta:{keep_alive:true},
      component: Activities,
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("活动", "","", false);
        next();
      }
    },
    {
      path: '/willCheck',
      name: 'WillCheck',
      component: WillCheck,
      meta:{keep_alive:true},
      // meta:{keepAlive:false},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("待审核","记录","CheckRecords", false);
        hm.setRouter(this.a);
        next();
      }
    },
    {
      path: '/singleCheck/:id',
      name: 'SingleCheck',
      component: SingleCheck,
      meta:{keep_alive:false},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("活动","","", false);
        hm.setRouter(to);
        next();
      }
    },
    {
      path: '/reject/:ids',
      name: 'Reject',
      component: Reject,
      meta:{keep_alive:false},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("驳回", "","", false);
        next();
      }
    },
    {
      path: '/myActivities',
      name: 'MyActivities',
      meta:{keep_alive:true},
      component: MyActivities,
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("我的活动", "","", false);
        next();
      }
    },
    {
      path: '/activityDetail/:id',
      name: 'ActivityDetail',
      meta:{keep_alive:false},
      component: ActivityDetail,
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("活动详情", "","", false);
        next();
      }
    },
    {
      path: '/checkRecords',
      name: 'CheckRecords',
      component: CheckRecords,
      meta:{keep_alive:true},
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("审核记录", "","", false);
        next();
      }
    },
    {
      path: '/testCommand',
      name: 'TestCommand',
      component: TestCommand,
      beforeEnter: (to, from, next) =>
      {
        hm.setTitle("测试Command", "","", false);
        next();
      }
    }
  ]
})
