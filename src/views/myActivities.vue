<template>
  <div class="my-activities">
    <div v-if="hasAccess">
      <p class="tips">发布/编辑活动请登录PC端</p>
      <div class="tab-title">
        <a v-for="(item,index) in tabs" :class="{active:item.active}" @click="_clickTab(index)">
          <span>{{item.text}}</span>
          <b class="decorate" v-if="index==0"></b>
        </a>
      </div>
      <div v-show="clickType===0">
        <div class="check-records" v-if="takePart.length != 0">
          <scroll class="scroll-top" ref="takePartS" :data="takePart" :scrollbar="scrollbarObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingUp="_onPullingUp">
            <ul class="check-group">
              <!--<li class="check-list" v-for="list in takePart">-->
              <!--<p class="date">8-10</p>-->
              <!--<ul>-->
              <li v-for="item in takePart">
                <router-link :to="{name:'ActivityDetail',params:{id:item.id}}">
                  <activity-item :actItem="item">
                  </activity-item>
                </router-link>
              </li>
              <!--</ul>-->
              <!--</li>-->
            </ul>
          </scroll>
        </div>
        <div v-else>
          <p class="none-msg">暂无活动</p>
        </div>
      </div>
      <div v-show="clickType===1">
        <div class="check-records">
          <scroll class="scroll-top" ref="releaseS" :data="release" :scrollbar="scrollbarObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingUp="_onPullingUp">
            <ul class="check-group">
              <!--<li class="check-list" v-for="list in release">-->
              <!--<p class="date">8-10</p>-->
              <!--<ul>-->
              <li v-for="item in release">
                <!--<router-view>-->
                <router-link :to="{name:'ActivityDetail',params:{id:item.id}}">
                  <activity-item :actItem="item">
                    <span class="status-span" name="checkStatus">{{item.state|status}}</span>
                  </activity-item>
                </router-link>
                <div class="operate" v-if="item.state=='Director_Approved'">
                  <router-link :to="{name:'BindDevice',params:{bid:item.id}}">
                    <b>绑定设备</b>
                  </router-link>
                  <router-link :to="{name:'Qrcode',params:{id:item.id}}">
                    <b>签到二维码</b>
                  </router-link>
                  <b @click="_checkStatus(item.state)">查看审核</b>
                  <router-link :to="{name:'SignInManagement',params:{did:item.id}}">
                    <b>签到管理</b>
                  </router-link>
                </div>
                <div @click="_checkStatus(item.state)" class="check" v-if="item.state=='Pending' || item.state=='Teacher_Refuse' || item.state=='Director_Refuse'">查看审核</div>
              </li>
              <!--</ul>-->
              <!--</li>-->
            </ul>
          </scroll>
        </div>
        <div v-show="release.length===0">
          <p class="none-msg">暂无活动</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-show="clickType===0">
        <div class="check-records" v-if="takePart.length != 0">
          <scroll ref="takePartS" :data="takePart" :scrollbar="scrollbarObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingUp="_onPullingUp">
            <ul class="check-group">
              <!--<li class="check-list" v-for="list in takePart">-->
              <!--<p class="date">8-10</p>-->
              <!--<ul>-->
              <li v-for="item in takePart" @click="_onClickItem(item.id)">
                <router-link :to="{name:'ActivityDetail',params:{id:item.id}}">
                  <activity-item :actItem="item">
                  </activity-item>
                </router-link>
              </li>
              <!--</ul>-->
              <!--</li>-->
            </ul>
          </scroll>
        </div>
        <div v-else>
          <p class="none-msg">暂无活动</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import activityItem from '../components/activityItem/activityItem.vue'
import scroll from '../components/scroll/scroll.vue'

export default {
  data() {
    return {
      takePart: [],//参与的列表
      release: [],//发布的列表
      leftLength: -1,
      rightLength: -1,
      tabs: [],
      scrollbar: true,
      scrollbarFade: true,
      /* pullDownRefresh: true,
       pullDownRefreshThreshold: 90,
       pullDownRefreshStop: 40,*/
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      startY: 0,
      scrollToX: 0,
      scrollToY: -200,
      scrollToTime: 700,
      scrollToEasing: 'bounce',
      scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
      takePartPage: 0,
      releasePage: 0,
      size: 100,
      left: false,
      right: false,
      hasAccess: false,
      type: 1,
      clickType: 0,
      verifyState: '',
      verify_full: '',
      checkStatus: ''
    }
  },
  components: {
    activityItem: activityItem,
    scroll: scroll
  },
  mounted() {
    this.$nextTick(function() {
      this._initTabs();
      this._access();
      this.tabs[0].active = true;
      this.left = true;
      this._loadData();
    })
  },
  computed: {
    scrollbarObj: function() {
      return this.scrollbar ? { fade: this.scrollbarFade } : false
    },
    /*pullDownRefreshObj: function () {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop)
      } : false
    },*/
    pullUpLoadObj: function() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: { more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt }
      } : false
    }
  },
  methods: {
    // _onClickItem(id){
    //   this.$router.push({name: 'ActivityDetail', params: {id: id}});
    // },
    /*_onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          this.items.unshift({
            title:'便只顾风雨兼程，既然选',
            classCount:5,
            address:'教学楼103',
            date:'08-20',
            status:'2',//0（全部），1（未开始），2（进行中），3（已结束）
            type:'1',//0(全部),1(思想与道德),2(学术科技),3(文体竞赛),4(社会实践)
            class:'1'//0(全部),1（班级）,2（院级）
          })
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },*/
    _initTabs() {
      this.tabs = [
        { text: '参与的', active: false, value: "" },
        { text: '发布的', active: false, value: "" }
      ]
    },
    _access() {//判断有无发布权限
      var _this = this;
      hm.request({
        command: 'request://hm',
        params: '{"api":"activity.auth_user"}',
        success: function(data) {
          if (data.content.type == 1) {
            _this.hasAccess = true;
          }
        }
      })
    },
    //查看审核
    _checkStatus(stu) {
      if (stu == "Pending") {
        this.checkStatus = "待审核";
      } else if (stu == "Teacher_Approved") {
        this.checkStatus = "老师审核通过";
      } else if (stu == "Teacher_Refuse") {
        this.checkStatus = "老师审核拒绝";
      } else if (stu == "Director_Approved") {
        this.checkStatus = "系主任审核通过";
      } else if (stu == "Director_Refuse") {
        this.checkStatus = "系主任审核拒绝";
      }
      var _this = this;
      hm.request({
        command: 'dialog://singlebond',
        params: '{"cancel":true,"content":"' + _this.checkStatus + '","button_text":"确定"}',
        success: function(data) {
        },
        failure: function(error) {
          console.log(error);
        }
      });
    },
    // 点击Tab
    _clickTab(index) {
      this._initTabs();
      this.tabs[index].active = true;
      this.clickType = index;
      if (this.clickType === 0 && this.leftLength !== -1) {
        return;
      }
      if (this.clickType === 1 && this.rightLength !== -1) {
        return;
      }
      this._loadData();
    },

    // 加载数据
    _loadData() {
      var _this = this;
      // 设置page
      var page;
      if (this.clickType === 0) {
        page = this.takePartPage;
      } else {
        page = this.releasePage;
      }
      hm.request({
        command: 'request://hm',
        params: `{"api":"activity.list_user","params":{"page":${page},"size":${this.size},"type":${this.clickType}}}`,
        success: function(data) {
          // 根据左右类型加载数据
          if (_this.clickType === 0) {
            _this.leftLength = data.content.data.length;
            _this.takePart = _this.takePart.concat(data.content.data);
          } else {
            _this.rightLength = data.content.data.length;
            _this.release = _this.release.concat(data.content.data);
          }
        }
      })
    },
    _onPullingUp() {
      // 更新数据
      /* console.log('pulling up and load data')*/
      if (this.clickType === 0) {
        if (this.leftLength !== this.size) {
          this.$refs.takePartS.forceUpdate();
          return;
        }
        this.takePartPage++;
      } else {
        if (this.rightLength !== this.size) {
          this.$refs.releaseS.forceUpdate();
          return;
        }
        this.releasePage++;
      }
      this._loadData();
    },
    _rebuildScroll() {
      this.$nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    }
  },
  filters:{
    status: function (stu)
    {
      if (stu == "Pending")
      {
        return  "待审核";
      } else if (stu == "Teacher_Approved")
      {
        return "老师审核通过";
      } else if (stu == "Teacher_Refuse")
      {
        return "老师审核拒绝";
      } else if (stu == "Director_Approved")
      {
        return "系主任审核通过";
      } else if (stu == "Director_Refuse")
      {
        return "系主任审核拒绝";
      }else{
        return "待提交";
      }
    }
  },
  watch: {
    scrollbarObj() {
      this._rebuildScroll()
    },
    /* pullDownRefreshObj() {
       this._rebuildScroll()
     },*/
    pullUpLoadObj() {
      this._rebuildScroll()
    },
    startY() {
      this._rebuildScroll()
    }
  }

}
</script>
<style lang="scss" scoped>
.tab-title {
  background: #EFF0F4;
  display: flex;
  flex-direction: row;
  box-shadow: inset 0 -1px 0 0 #DDDDDD;
}

.tab-title a {
  text-decoration: none;
  color: #8E8E8E;
  width: 50%;
  padding: 0.4133rem 0;
  font-size: 0.347rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.tab-title a span {
  margin-left: 1.96667rem;
}

.unactive {
  color: #8E8E8E;
}

.active {
  color: #FF8556 !important;
  border-bottom: 0.01rem solid #FF8556;
  ;
}

.decorate {
  width: 2px;
  background: #dcdcdc;
}

.list-wrapper {
  background: #F9F9F9;
}

.scroll-top {
  top: 2.07rem;
}

.check-records {
  font-size: 0.32rem;
  color: #8E8E8E;
  background-color: #F9F9F9;
}

.date {
  line-height: 0.933333rem;
  padding-left: 0.48rem;
  border-bottom: 1px solid #EAEAEA;
}

.check-list {
  margin-bottom: 0.266667rem;
  background-color: #ffffff;
}

.tips {
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  color: #FFFFFF;
  height: 0.8rem;
  background: #B6B8B8;
  text-align: center;
  line-height: 0.8rem;
}

.operate,
.check,
a {
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  color: #B39D8A;
  letter-spacing: 0.29px;
  background: #fff;
  padding: 0.37333rem 0;
  margin-top: 0.06rem;
}

.check {
  text-align: center;
  height: 0.32rem;
  line-height: 0.16rem;
}

.operate b {
  display: inline-block;
  text-align: center;
  width: 2.3rem;
  height: 0.32rem;
  border-right: 1px solid #F3F3F3;
}

li {
  background: #fff;
  margin-bottom: 0.26667rem;
}
  .check-group li{
    position: relative;
  }
  .status-span{
    position: absolute;
    @include font-dpr(24px);
    color: #4A4A4A;
    left:5.28rem;
    /*top:2.133333rem;*/
    top:2.106667rem;
  }
</style>
