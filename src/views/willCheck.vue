<template>
  <div class="will-check">
    <!--<scroll ref="scroll"-->
            <!--:data="items"-->
            <!--:scrollbar="scrollbarObj"-->
            <!--:pullUpLoad="pullUpLoadObj"-->
            <!--:pullDownRefresh="pullDownRefreshObj"-->
            <!--:startY="parseInt(startY)"-->
            <!--@pullingDown="_onPullingDown"-->
            <!--@pullingUp="_onPullingUp">-->
    <div v-if="items.length!=0">
      <ul class="list">
        <li v-for="item in items" class="item-list">
          <div class="check-ctn">
            <input type="checkbox" :value="item.id" name="checks" v-model="checkItems" @click="_choose($event)">
          </div>
          <router-link :to="{name:'SingleCheck',params:{id:item.id}}" style="flex:1">
            <activity-item :actItem="item">
            </activity-item>
          </router-link>
        </li>
      </ul>
      <!--<ul class="check-group">-->
      <!--<li class="check-list" v-for="(list,key) in items">-->
      <!--<p class="date">{{key}}</p>-->
      <!--<ul>-->
      <!--<li v-for="item in list" class="item-list">-->
      <!--<activity-item :actItem="item">-->
      <!--<div class="check-ctn">-->
      <!--<input type="checkbox" :value="item.id" v-model="checkItems">-->
      <!--</div>-->
      <!--<div slot="statusIcon" class="statusIcon pass">-->
      <!--</div>-->
      <!--</activity-item>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</li>-->
      <!--</ul>-->
    <!--</scroll>-->
    <div class="check-footer" v-if="this.items.length!=0">
      <div class="check-all">
        <input type="checkbox" v-model="checkAll" @click="_checkAll">
        <label for="">全选</label>
      </div>
      <div class="btn-ctn">
        <input type="button" value="驳回" :class="{reject:this.checkItems.length!=0}" @click="_reject">
        <input type="button" value="通过" :class="{pass:this.checkItems.length!=0}" @click="_pass">
      </div>
    </div>
    </div>
    <div v-else>
      <p class="none-msg">暂无活动</p>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import activityItem from '../components/activityItem/activityItem.vue'
  import scroll from '../components/scroll/scroll.vue'
  import {default as hm} from '../assets/js/unit'
  export default{
    data(){
      return {
        items:[
//          {
//            "orderType": 0,
//            "period": 3,
//            "userName": "陈老师",
//            "userId": "cdf07581-bdcb-4ba6-be15-5003ea70a951",
//            "picture": "1505785762130.png",
//            "teacherId": "cdf07581-bdcb-4ba6-be15-5003ea70a951",
//            "createTime": 1505730816000,
//            "activitySortTwo": "PartyLeague",
//            "activityState": "已结束",
//            "schoolId": "2",
//            "activitySort": "Ideological",
//            "name": "二位我",
//            "addrId": "dede2ffc-9583-4ec9-bbbb-d1f4889887e5",
//            "details": "12314564564fdsafdasf",
//            "startTime": 1505730790000,
//            "endTime": 1505737990000,
//            "id": "a15679cd-5981-49b1-916a-5efe09febeef",
//            "state": "Pending",
//            "activityType": 0,
//            "addr": "我我1",
//            "activityLevel": "Department",
//            "addrType": "3"
//          },
//          {
//            "orderType": 0,
//            "period": 3,
//            "userName": "陈老师",
//            "userId": "cdf07581-bdcb-4ba6-be15-5003ea70a951",
//            "picture": "1505785762130.png",
//            "teacherId": "cdf07581-bdcb-4ba6-be15-5003ea70a951",
//            "createTime": 1505730816000,
//            "activitySortTwo": "PartyLeague",
//            "activityState": "已结束",
//            "schoolId": "2",
//            "activitySort": "Ideological",
//            "name": "二位我",
//            "addrId": "dede2ffc-9583-4ec9-bbbb-d1f4889887e5",
//            "details": "12314564564fdsafdasf",
//            "startTime": 1505730790000,
//            "endTime": 1505737990000,
//            "id": "a15679cd-5981-49b1-916a-5efe09febeef",
//            "state": "Pending",
//            "activityType": 0,
//            "addr": "我我1",
//            "activityLevel": "Department",
//            "addrType": "3"
//          },
        ],
        checkItems:[],
        checkAll:false,
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
        lastDataLength:0
      }
    },
    components:{
      activityItem:activityItem,
      scroll:scroll
    },
    created(){
      this._loadData(this.page,this.size);
    },
    mounted(){
      this.$nextTick(function(){
//        this._loadData(this.page,this.size);
//        var checks=document.getElementsByName('checks');
//        alert(checks.length);
//        checks.forEach(item=>item.addEventListener('tap',this._choose,false));
      })
    },
    computed:{
//      scrollbarObj: function () {
//        return this.scrollbar ? {fade: this.scrollbarFade} : false
//      },
//      pullDownRefreshObj: function () {
//        return this.pullDownRefresh ? {
//          threshold: parseInt(this.pullDownRefreshThreshold),
//          stop: parseInt(this.pullDownRefreshStop)
//        } : false
//      },
//      pullUpLoadObj: function () {
//        return this.pullUpLoad ? {threshold: parseInt(this.pullUpLoadThreshold), txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}} : false
//      }
    },
    methods:{
      _checkAll(){
        if(!this.checkAll){
          this.checkItems=[];
        }
        else{
          this.checkItems=[];
          this.items.forEach(item=>this.checkItems.push(item.id))
        }
      },
//      _choose(evt){
//        alert(1);
//        evt.target.checked=true;
//      },
      _pass(){
        var _this=this;
        if(this.checkItems.length==0){
          return;
        }
        else{
          let ids=JSON.stringify(this.checkItems);
          hm.request({
            command:'request://hm',
            params: `{"api":"activity.audit_approved","params":{"ids":${ids}}}`,
            success:function(data){
              _this.checkItems=[];
              _this.page=0;
              _this._loadData(_this.page,_this.size);
              hm.request({
                command: 'toast://default',
                params: '{"message":"活动审核通过"}',
                success: function (data) {
                },
                failure: function (error) {
                  console.log(error);
                }
              });

            },
            failure(error){
              _this.checkItems=[];
              _this.page=0;
              _this._loadData(_this.page,_this.size);
              hm.request({
                command: 'toast://default',
                params: '{"message":'+error+'}',
                success: function (data) {
                },
                failure: function (error){
                  console.log(error);
                }
              });
            }

          })
        }
      },
      _reject(){
        if(this.checkItems.length==0){
          return;
        }
        else{
          let ids=JSON.stringify(this.checkItems);
          this.$router.push({name:'Reject',params:{ids:ids}});
//          let ids=JSON.stringify(this.checkItems);
//          hm.request({
//            command:'request://hm',
//            params: `{"api":"activity.audit_refuse","params":{"ids":${ids},}}`,
//            success:function(data){
////                alert('reject:'+data);
//                if(data.code==0){
//                  this.$router.push({name:'Reject',params:{ids:''}})
//                }
//            }
//          })
        }
      },
      _loadData(page,size){
        let _this=this;
        hm.request({
          command:'request://hm',
          params: `{"api":"activity.list_audit","params":{"page":${page},"size":${size}}}`,
          success:function(data){
            if(data.code==0){
              let resData=data.content.data;
              _this.lastDataLengths=resData.length;
              if(resData.length!=0){
                if(page==0){
                  _this.items=[];
//                  hm.setTitle("待审核("+data.content.totalElements+")","记录", false);
                }
                _this.items=_this.items.concat(resData);
              }
              else{
                _this.items=_this.items.concat([]);
              }
            }
          }
        })
      },
      _computedItems:function(data){
        let newItems={};
        data.forEach(item=>{
          let createDate=moment(item.createTime).format('MM-DD');
          if(newItems.hasOwnProperty(createDate)){
            newItems[createDate].push(item);
          }
          else{
            newItems[createDate]=new Array();
            newItems[createDate].push(item);
          }
        })
        return newItems;
      },
//        _computedItems:function(data){
//          let newItems=[];
//          data.forEach(item=>{
//            let createDate=moment(item.createTime).format('MM-DD');
//            if(newItems.hasOwnProperty(createDate)){
//              newItems[createDate].push(item);
//              alert('newItems1:'+newItems[createDate]);
//            }
//            else{
//              newItems[createDate]=new Array();
//              newItems[createDate].push(item);
//              alert('newItems2:'+newItems);
//            }
//          })
//          return newItems;
//        },
      _onPullingUp() {
        if(this.lastDataLength>=this.size){
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
    watch:{
      'checkItems':{
        handler:function(val,oldVal){
          var count=this.items.length;
          if(this.checkItems.length==count){
            this.checkAll=true;
          }
          else{
            this.checkAll=false;
          }
        },
        deep:true
      },
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
  .list-wrapper{
    bottom:1.733333rem;
    background: #F9F9F9;
  }
  .will-check{
    /*font-size: 0.32rem;*/
    @include font-dpr(24px);
    color:#8E8E8E;
    /*background-color: #F9F9F9 ;*/
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
  .check-ctn{
    display: flex;
    align-items: center;
    margin-right:0.4rem;
  }
  .check-footer{
    width: 100%;
    display: flex;
    position: fixed;
    left:0;
    bottom:0;
    padding:0.4rem 0.48rem;
    background-color: #ffffff;
  }
  .btn-ctn{
    flex: 1;
    text-align: right;
  }
  input[type=button]{
    width:2.8rem;
    height:0.933333rem;
    border-radius:0.08rem;
    margin-left: 0.533333rem;
    text-align: center;
    /*font-size:0.4rem;*/
    @include font-dpr(30px);
    /*font-size: 30px;*/
    color:#C2C2C2;
    line-height: 0.93333rem;
    background-color: #ffffff;
    border:0.026667rem solid #C2C2C2;
  }
  input[type=button].pass{
    background-color: #FF8556;
    color:#ffffff;
    border:none;
  }
  input[type=button].reject{
    background-color: #C2C2C2 ;
    color:#ffffff;
    border:none;
  }
  input[type=button]:first-child{
    margin-left:0;
  }
  .check-all{
    display: flex;
    align-items: center;
  }
  .item-list{
    position: relative;
    display: flex;
    padding:0 0.48rem;
    background: #ffffff;
    border-bottom: 1px solid #EAEAEA;
  }
  .activityItem{
    padding: 0.51rem 0 0.48rem !important;
    border:none !important;
  }
  .list{
    padding-bottom:1.733333rem;
    background: #ffffff;
  }
</style>
