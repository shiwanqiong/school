<template>
  <div class="check-records">
    <scroll v-if="items.length!=0" ref="scroll"
            :data="items"
            :scrollbar="scrollbarObj"
            :pullUpLoad="pullUpLoadObj"
            :pullDownRefresh="pullDownRefreshObj"
            :startY="parseInt(startY)"
            @pullingDown="_onPullingDown"
            @pullingUp="_onPullingUp">
      <!--<ul class="check-group">-->
        <!--<li class="check-list" v-for="list in items">-->
          <!--<p class="date">8-10</p>-->
          <!--<ul>-->
            <!--<li v-for="item in list">-->
              <!--&lt;!&ndash;<router-view>&ndash;&gt;-->
                <!--<activity-item :actItem="item">-->
                <!--</activity-item>-->
              <!--&lt;!&ndash;</router-view>&ndash;&gt;-->
            <!--</li>-->
          <!--</ul>-->
        <!--</li>-->
      <!--</ul>-->
      <ul>
        <li v-for="item in items" class="item-list">
          <!--<router-link :to="{name:'Activities'}">-->
          <activity-item :actItem="item.activity">
          </activity-item>
          <div slot="statusIcon" class="statusIcon" :class="{pass:item.activity.state=='Teacher_Approved',reject:item.activity.state=='Teacher_Refuse'}">
          </div>
          <!--</router-link>-->
        </li>
      </ul>
    </scroll>
    <div v-else>
      <p class="none-msg">暂无活动</p>
    </div>
  </div>
</template>
<script>
  import activityItem from '../components/activityItem/activityItem.vue'
  import scroll from '../components/scroll/scroll.vue'
  export default{
      data(){
          return {
            items:[
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
            page:0,
            size:10,
            lastLength:0
          }
      },
      components:{
        activityItem:activityItem,
        scroll:scroll
      },
      mounted(){
        this.$nextTick(function(){
          this._loadData(this.page,this.size);
        })
      },
      computed:{
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
          return this.pullUpLoad ? {threshold: parseInt(this.pullUpLoadThreshold), txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}} : false
        }
      },
      methods:{
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
        _loadData(page,size){
          var _this=this;
          hm.request({
            command:'request://hm',
            params: `{"api":"activity.list_check_record","params":{"page":${page},"size":${size}}}`,
            success:function(data){
              if(data.code=='0'){
                  let resData=data.content.data;
//                alert(JSON.stringify(resData));
                  _this.dataLength=resData.length;
                  if(resData.length!=0){
                      if(page==0){
                          _this.items=[];
                      }
                      _this.items=_this.items.concat(resData);
                  }
                  else if(resData.length==0){
                      _this.items=_this.items.concat([]);
                  }
              }
            }
          })
        },
        _onPullingUp() {
          if(this.dataLength>=this.size){
            this.page++;
            this._loadData(this.page,this.size);
          }
          else{
              this.$refs.scroll.forceUpdate();
          }
        },
        _onPullingDown() {
          this.page=0;
          this._loadData(this.page,this.size);
        },
        _rebuildScroll() {
          this.$nextTick(() => {
            this.$refs.scroll.destroy()
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
      }

  }
</script>
<style lang="scss" scoped>
  .statusIcon{
    position: absolute;
    width:1.6rem;
    height:1.2rem;
    background-repeat: no-repeat;
    background-size: 100%;
    right:0.48rem;
    bottom:0;
  }
  .statusIcon.pass{
    background-image: url('../assets/img/pass_icon.png');
  }
  .statusIcon.reject{
    background-image: url('../assets/img/reject_icon.png');
  }
  .list-wrapper{
    background: #F9F9F9;
  }
  .check-records{
    font-size: 0.32rem;
    color: #8E8E8E;
    background-color: #F9F9F9;
  }
  .date{
    line-height:0.933333rem;
    padding-left:0.48rem;
    border-bottom: 1px solid #EAEAEA ;
  }
  .check-list{
    margin-bottom:0.266667rem;
    background-color: #ffffff;
  }
  .item-list{
    position: relative;
    background-color: #ffffff;
  }
</style>
