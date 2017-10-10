<template>
  <div class="activity-index">
    <div class="act-cards">
      <router-link :to="{name:'Activities'}" class="act-card">
        <span class="img-ctn">
        </span>
        <dl>
          <dt>活动</dt>
          <dd>查看兴趣活动</dd>
        </dl>
        <span class="arr-right"></span>
      </router-link>
      <router-link :to="{name:navText.pathName}" class="act-card">
          <span class="img-ctn img-ctn1">
          </span>
        <dl>
          <dt>{{navText.title}}</dt>
          <dd>{{navText.subTitle}}</dd>
        </dl>
        <span class="arr-right"></span>
      </router-link>
    </div>
    <div class="main-cont">
      <p class="today"><span class="point"></span> <span>今日活动</span> <span class="point"></span></p>
      <div class="active-list" v-if="items.length!=0">
        <scroll ref="scroll"
                :data="items"
                :scrollbar="scrollbarObj"
                :pullUpLoad="pullUpLoadObj"
                :pullDownRefresh="pullDownRefreshObj"
                :startY="parseInt(startY)"
                @pullingDown="_onPullingDown"
                @pullingUp="_onPullingUp">
          <ul class="content-list">
            <li v-for="item in items" @click="_onClickItem(item.id)">
              <!--<router-link :to="{name:'Activities'}">-->
              <activity-item :actItem="item"></activity-item>
              <!--</router-link>-->
            </li>
          </ul>
        </scroll>
      </div>
      <div v-else>
        <p class="none-msg">暂无活动</p>
      </div>
    </div>
  </div>
</template>
<script>
  import activityItem from '../components/activityItem/activityItem.vue'
  import scroll from '../components/scroll/scroll.vue'
  export default{
    data(){
      return {
        items: [
//          {
//            "orderType": 0,
//            "period": 212,
//            "userName": "陈老师",
//            "userId": "cdf07581-bdcb-4ba6-be15-5003ea70a951",
//            "picture": "",
//            "teacherId": "cdf07581-bdcb-4ba6-be15-5003ea70a951",
//            "createTime": 1505291687000,
//            "activitySortTwo": "PartyLeague",
//            "activityState": "已结束",
//            "schoolId": "2",
//            "activitySort": "Ideological",
//            "name": "能发货似懂非懂发发火当升科技阿道夫发发货速度尽快发送到哈佛",
//            "details": "131",
//            "startTime": 1505291678000,
//            "endTime": 1505291678000,
//            "id": "5fcf4b93-47bf-4585-a8a3-e67b9a386189",
//            "state": "Pending",
//            "activityType": 0,
//            "addr": "131",
//            "activityLevel": "Department",
//            "addrType": "校外"
//          },
//          {
//            "orderType": 0,
//            "period": 212,
//            "userName": "陈老师",
//            "userId": "cdf07581-bdcb-4ba6-be15-5003ea70a951",
//            "picture": "1505360072131.png",
//            "teacherId": "cdf07581-bdcb-4ba6-be15-5003ea70a951",
//            "createTime": 1505291687000,
//            "activitySortTwo": "PartyLeague",
//            "activityState": "已结束",
//            "schoolId": "2",
//            "activitySort": "Ideological",
//            "name": "412",
//            "details": "131",
//            "startTime": 1505291678000,
//            "endTime": 1505291678000,
//            "id": "5fcf4b93-47bf-4585-a8a3-e67b9a386189",
//            "state": "Pending",
//            "activityType": 0,
//            "addr": "131",
//            "activityLevel": "Department",
//            "addrType": "校外"
//          }
        ],
        scrollbar: true,
        scrollbarFade: true,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
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
        page: 0,
        size: 10,
        navText: {
          title: '',
          subTitle: '',
          pathName: ''
        },
        dataLength: 0
      }
    },
    components: {
      activityItem: activityItem,
      scroll: scroll
    },
    created(){
      this._loadNavText();
      if (this.items.length == 0) {
        this._loadData(this.page, this.size);
      }
    },
//    mounted(){
//      this.$nextTick(function () {
//        hm.request({
//          command:'hm_window://init',
//          params:'{"refresh_enabled":false}'
//        });
//      })
//
//    },
    computed: {
      scrollbarObj: function () {
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    methods: {
      _onClickItem(id){
        this.$router.push({name: 'ActivityDetail', params: {id: id}});
      },
      _loadNavText(){
        var _this = this;
        hm.request({
          command: 'data://user/getuserinfo',
          success: function (data) {
            let role = data.current_role;
            if (role === 'Student') {
              _this.navText.title = '我的活动';
              _this.navText.subTitle = '与我相关活动';
              _this.navText.pathName = 'MyActivities'
            }
            else {
              _this.navText.title = '活动审核';
              _this.navText.subTitle = '审核相关活动';
              _this.navText.pathName = 'WillCheck'
            }
          },
          failure: function (error) {
          }
        });
      },
      _loadData(page, size){
        var _this = this;
        hm.request({
          command: 'request://hm',
          params: `{"api":"activity.list_date","params":{"page":${page},"size":${size}},"showloading":true}`,
          success: function (data) {
            if (data.code == '0') {
              let resData = data.content.data;
//              alert('data'+_this.page+'--------'+JSON.stringify(resData));
              _this.dataLength = resData.length;
              if (resData.length != 0) {
                if (page == 0) {
                  _this.items = [];
                }
                _this.items = _this.items.concat(resData);//数据提取
              }
              else if (resData.length == 0) {
                _this.items = _this.items.concat([]);
              }
            }
          }
        })
      },
      _onPullingUp() {
        if (this.dataLength >= this.size) {
          this.page++;
          this._loadData(this.page, this.size);
        }
        else {
          this.$refs.scroll.forceUpdate();
        }
      },
      _onPullingDown() {
        this.page = 0;
        this._loadData(this.page, this.size);
      },
      _rebuildScroll() {
        this.$nextTick(() => {
          this.$refs.scroll.destroy();
          this.$refs.scroll.initScroll()
        })
      }
    },
    watch: {
      scrollbarObj() {
        this._rebuildScroll()
      },
      pullDownRefreshObj() {
        this._rebuildScroll()
      },
      pullUpLoadObj() {
        this._rebuildScroll()
      },
      startY() {
        this._rebuildScroll()
      }
    },
  }

</script>
<style lang="scss" scoped>
  .list-wrapper {
    top: 4.15333rem;
  }

  .activity-index {
    background-color: rgba(249, 249, 249, 0.90);
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .act-cards {
    display: flex;
    background-color: #ffffff;
    margin-bottom: 0.266667rem;
    border-bottom: 0.013333rem solid #E4E4E4;
  }

  .act-card {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0.866667rem 0.266667rem 0.866667rem 0.8rem
  }

  @media screen and (max-width: 320px) {
    .act-card {
      padding: 0.866667rem 0.266667rem 0.866667rem 0.533333rem
    }
  }

  .act-card:first-child {
    border-right: 1px solid #E3E3E3;
  }

  .img-ctn {
    display: inline-block;
    width: 0.933333rem;
    height: 0.933333rem;
    margin-right: 0.346667rem;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url("../assets/img/interest_act.png");
  }

  .img-ctn.img-ctn1 {
    background-image: url("../assets/img/my_act.png");
  }

  .arr-right {
    display: inline-block;
    width: 0.586667rem;
    height: 0.586667rem;
    background: url("../assets/img/arr_right.png") no-repeat;
    background-size: 100%;
    float: right;
  }

  dl {
    flex: 1;
  }

  dt {
    @include font-dpr(30px);
    color: #303030;
    letter-spacing: 0.026667rem;
    margin-bottom: 0.16rem;
  }

  dd {
    @include font-dpr(20px);
    color: #8E8E8E;
    letter-spacing: 0.01rem;
  }

  .today {
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    border-bottom: 0.013333rem solid #EAEAEA;
    @include font-dpr(30px);
    color: #2F2F2F;
    letter-spacing: 0.026667rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
  }

  .point {
    display: inline-block;
    width: 0.115rem;
    height: 0.12rem;
    background-color: #2F2F2F;
    border-radius: 0.06rem;
    margin: 0 0.16rem;
  }

  .active-list {
    background: #ffffff;
  }
  .main-cont {
    flex: 1;
  }
</style>
